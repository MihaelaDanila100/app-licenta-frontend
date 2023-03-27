import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinePannelComponent } from './line-pannel.component';

describe('LinePannelComponent', () => {
  let component: LinePannelComponent;
  let fixture: ComponentFixture<LinePannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinePannelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinePannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
