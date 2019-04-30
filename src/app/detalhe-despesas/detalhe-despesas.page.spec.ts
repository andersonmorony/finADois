import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheDespesasPage } from './detalhe-despesas.page';

describe('DetalheDespesasPage', () => {
  let component: DetalheDespesasPage;
  let fixture: ComponentFixture<DetalheDespesasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheDespesasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheDespesasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
