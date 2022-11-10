import { Employee } from './employee';

describe('Employee', () => {
  it('should create an instance', () => {
    // @ts-ignore
    expect(new Employee()).toBeTruthy();
  });
});
