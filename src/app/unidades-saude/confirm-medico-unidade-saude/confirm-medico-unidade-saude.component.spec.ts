import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmMedicoUnidadeSaudeComponent } from './confirm-medico-unidade-saude.component';

describe('ConfirmMedicoUnidadeSaudeComponent', () => {
  let component: ConfirmMedicoUnidadeSaudeComponent;
  let fixture: ComponentFixture<ConfirmMedicoUnidadeSaudeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmMedicoUnidadeSaudeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmMedicoUnidadeSaudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
