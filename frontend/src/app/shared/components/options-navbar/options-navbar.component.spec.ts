import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsNavbarComponent } from './options-navbar.component';

describe('OptionsNavbarComponent', () => {
  let component: OptionsNavbarComponent;
  let fixture: ComponentFixture<OptionsNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionsNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
