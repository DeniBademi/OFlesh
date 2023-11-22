/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FindUsComponent } from './find-us.component';

describe('FindUsComponent', () => {
  let component: FindUsComponent;
  let fixture: ComponentFixture<FindUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
