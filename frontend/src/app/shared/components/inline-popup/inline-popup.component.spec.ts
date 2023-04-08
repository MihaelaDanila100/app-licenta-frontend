import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlinePopupComponent } from './inline-popup.component';

describe('InlinePopupComponent', () => {
  let component: InlinePopupComponent;
  let fixture: ComponentFixture<InlinePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlinePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InlinePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
