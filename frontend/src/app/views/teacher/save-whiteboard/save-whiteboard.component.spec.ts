import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveWhiteboardComponent } from './save-whiteboard.component';

describe('SaveWhiteboardComponent', () => {
  let component: SaveWhiteboardComponent;
  let fixture: ComponentFixture<SaveWhiteboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveWhiteboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveWhiteboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
