import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMedicoUnidadeSaudeComponent } from './delete-medico-unidade-saude.component';

describe('DeleteMedicoUnidadeSaudeComponent', () => {
  let component: DeleteMedicoUnidadeSaudeComponent;
  let fixture: ComponentFixture<DeleteMedicoUnidadeSaudeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteMedicoUnidadeSaudeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMedicoUnidadeSaudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
