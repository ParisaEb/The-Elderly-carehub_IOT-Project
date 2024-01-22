import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoard2Component } from './dash-board2.component';
import { Elderly } from './interfaces'; 

describe('DashBoard2Component', () => {
  let component: DashBoard2Component;
  let fixture: ComponentFixture<DashBoard2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashBoard2Component],
    });
    fixture = TestBed.createComponent(DashBoard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
