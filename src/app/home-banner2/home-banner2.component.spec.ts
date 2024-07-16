/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HomeBanner2Component } from './home-banner2.component';

describe('HomeBanner2Component', () => {
  let component: HomeBanner2Component;
  let fixture: ComponentFixture<HomeBanner2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeBanner2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBanner2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
