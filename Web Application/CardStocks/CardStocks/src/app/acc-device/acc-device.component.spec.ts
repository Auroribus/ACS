import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccDeviceComponent } from './acc-device.component';

describe('AccDeviceComponent', () => {
  let component: AccDeviceComponent;
  let fixture: ComponentFixture<AccDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
