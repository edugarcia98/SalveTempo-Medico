import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensagemEmailEnviadoComponent } from './mensagem-email-enviado.component';

describe('MensagemEmailEnviadoComponent', () => {
  let component: MensagemEmailEnviadoComponent;
  let fixture: ComponentFixture<MensagemEmailEnviadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensagemEmailEnviadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensagemEmailEnviadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
