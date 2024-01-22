import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElderlyCheckComponent } from './elderly-check.component';

describe('ElderlyCheckComponent', () => {
  let component: ElderlyCheckComponent;
  let fixture: ComponentFixture<ElderlyCheckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElderlyCheckComponent]
    });
    fixture = TestBed.createComponent(ElderlyCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
