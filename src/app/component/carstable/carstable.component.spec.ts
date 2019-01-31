import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarstableComponent } from './carstable.component';

describe('CarstableComponent', () => {
  let component: CarstableComponent;
  let fixture: ComponentFixture<CarstableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarstableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarstableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
