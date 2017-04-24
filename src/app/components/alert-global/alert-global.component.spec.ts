import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertGlobalComponent } from './alert-global.component';

describe('AlertGlobalComponent', () => {
  let component: AlertGlobalComponent;
  let fixture: ComponentFixture<AlertGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertGlobalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
