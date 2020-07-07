import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMedicoUnidadeSaudeComponent } from './show-medico-unidade-saude.component';

describe('ShowMedicoUnidadeSaudeComponent', () => {
  let component: ShowMedicoUnidadeSaudeComponent;
  let fixture: ComponentFixture<ShowMedicoUnidadeSaudeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMedicoUnidadeSaudeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMedicoUnidadeSaudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
