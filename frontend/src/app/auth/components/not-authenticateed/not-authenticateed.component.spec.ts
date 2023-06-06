import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAuthenticateedComponent } from './not-authenticateed.component';

describe('NotAuthenticateedComponent', () => {
  let component: NotAuthenticateedComponent;
  let fixture: ComponentFixture<NotAuthenticateedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotAuthenticateedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotAuthenticateedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
