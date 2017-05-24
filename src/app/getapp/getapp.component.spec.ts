/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GetappComponent } from './getapp.component';

describe('GetappComponent', () => {
  let component: GetappComponent;
  let fixture: ComponentFixture<GetappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
