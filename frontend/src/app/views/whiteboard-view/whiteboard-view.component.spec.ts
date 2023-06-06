import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteboardViewComponent } from './whiteboard-view.component';

describe('WhiteboardViewComponent', () => {
  let component: WhiteboardViewComponent;
  let fixture: ComponentFixture<WhiteboardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhiteboardViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhiteboardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
