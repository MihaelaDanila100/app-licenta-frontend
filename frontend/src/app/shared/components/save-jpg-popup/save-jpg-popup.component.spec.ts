import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveJpgPopupComponent } from './save-jpg-popup.component';

describe('SaveJpgPopupComponent', () => {
  let component: SaveJpgPopupComponent;
  let fixture: ComponentFixture<SaveJpgPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveJpgPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveJpgPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
