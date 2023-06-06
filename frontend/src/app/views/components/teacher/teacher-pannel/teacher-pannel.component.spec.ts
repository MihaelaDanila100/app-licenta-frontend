import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherPannelComponent } from './teacher-pannel.component';

describe('TeacherPannelComponent', () => {
  let component: TeacherPannelComponent;
  let fixture: ComponentFixture<TeacherPannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherPannelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
