import { TestBed } from '@angular/core/testing';

import { EmployedService } from './employed.service';

describe('EmployedService', () => {
  let service: EmployedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
