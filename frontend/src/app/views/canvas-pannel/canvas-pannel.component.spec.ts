import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasPannelComponent } from './canvas-pannel.component';

describe('CanvasPannelComponent', () => {
  let component: CanvasPannelComponent;
  let fixture: ComponentFixture<CanvasPannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasPannelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanvasPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
