import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicoUnidadeSaudeComponent } from './add-medico-unidade-saude.component';

describe('AddMedicoUnidadeSaudeComponent', () => {
  let component: AddMedicoUnidadeSaudeComponent;
  let fixture: ComponentFixture<AddMedicoUnidadeSaudeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMedicoUnidadeSaudeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMedicoUnidadeSaudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
