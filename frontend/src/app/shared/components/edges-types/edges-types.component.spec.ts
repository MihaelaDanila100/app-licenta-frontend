import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgesTypesComponent } from './edges-types.component';

describe('EdgesTypesComponent', () => {
  let component: EdgesTypesComponent;
  let fixture: ComponentFixture<EdgesTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdgesTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdgesTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
