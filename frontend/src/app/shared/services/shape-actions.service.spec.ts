import { TestBed } from '@angular/core/testing';

import { ShapeActionsService } from './shape-actions.service';

describe('ShapeActionsService', () => {
  let service: ShapeActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShapeActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
