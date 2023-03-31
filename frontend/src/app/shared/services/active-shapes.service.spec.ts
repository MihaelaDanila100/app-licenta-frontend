import { TestBed } from '@angular/core/testing';

import { ActiveShapesService } from './active-shapes.service';

describe('ActiveShapesService', () => {
  let service: ActiveShapesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveShapesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
