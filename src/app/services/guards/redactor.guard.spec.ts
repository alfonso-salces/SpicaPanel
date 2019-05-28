import { TestBed, async, inject } from '@angular/core/testing';

import { RedactorGuard } from './redactor.guard';

describe('RedactorGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RedactorGuard]
    });
  });

  it('should ...', inject([RedactorGuard], (guard: RedactorGuard) => {
    expect(guard).toBeTruthy();
  }));
});
