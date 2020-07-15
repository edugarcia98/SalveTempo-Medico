import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUnidadeSaudeComponent } from './admin-unidade-saude.component';

describe('AdminUnidadeSaudeComponent', () => {
  let component: AdminUnidadeSaudeComponent;
  let fixture: ComponentFixture<AdminUnidadeSaudeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUnidadeSaudeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUnidadeSaudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
