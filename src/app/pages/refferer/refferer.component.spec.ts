/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReffererComponent } from './refferer.component';

describe('ReffererComponent', () => {
  let component: ReffererComponent;
  let fixture: ComponentFixture<ReffererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReffererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReffererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
