import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavShapesComponent } from './sidenav-shapes.component';

describe('SidenavShapesComponent', () => {
  let component: SidenavShapesComponent;
  let fixture: ComponentFixture<SidenavShapesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavShapesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavShapesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
