import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEdgeComponent } from './add-edge.component';

describe('AddEdgeComponent', () => {
  let component: AddEdgeComponent;
  let fixture: ComponentFixture<AddEdgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEdgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEdgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
