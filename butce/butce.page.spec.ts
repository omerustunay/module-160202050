import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButcePage } from './butce.page';

describe('ButcePage', () => {
  let component: ButcePage;
  let fixture: ComponentFixture<ButcePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButcePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButcePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
