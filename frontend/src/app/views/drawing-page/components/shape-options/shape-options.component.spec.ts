import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeOptionsComponent } from './shape-options.component';

describe('ShapeOptionsComponent', () => {
  let component: ShapeOptionsComponent;
  let fixture: ComponentFixture<ShapeOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShapeOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShapeOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
