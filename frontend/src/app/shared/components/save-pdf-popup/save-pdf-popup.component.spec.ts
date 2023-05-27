import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePdfPopupComponent } from './save-pdf-popup.component';

describe('SavePdfPopupComponent', () => {
  let component: SavePdfPopupComponent;
  let fixture: ComponentFixture<SavePdfPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavePdfPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavePdfPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
