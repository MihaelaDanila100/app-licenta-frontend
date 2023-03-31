import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasWhiteboardComponent } from './canvas-whiteboard.component';

describe('CanvasWhiteboardComponent', () => {
  let component: CanvasWhiteboardComponent;
  let fixture: ComponentFixture<CanvasWhiteboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasWhiteboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanvasWhiteboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
