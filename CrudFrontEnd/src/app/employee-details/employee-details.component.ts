import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-employee-details',
    templateUrl: './employee-details.component.html',
    styleUrls: ['./employee-details.component.css'],
    standalone: false
})
export class EmployeeDetailsComponent implements OnInit, OnDestroy {

  employee: Employee = {
    id: undefined,
    firstname: '',
    lastname: '',
    emailID: ''
  };
  isLoading = true;
  private routeSub?: Subscription;
  private fetchSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      const id = idParam ? Number(idParam) : undefined;
      if (id !== undefined && !Number.isNaN(id)) {
        this.loadEmployee(id);
      } else {
        console.warn('Invalid employee id:', idParam);
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.fetchSub?.unsubscribe();
  }

  private loadEmployee(id: number): void {
    this.isLoading = true;
    this.fetchSub = this.employeeService.getEmployeebyID(id).subscribe({
      next: data => {
        console.log('Loaded employee details', data);
        this.employee = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: error => {
        console.error('Failed to load employee', error);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
