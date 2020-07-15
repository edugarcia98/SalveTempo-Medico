import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesSaudeComponent } from './unidades-saude.component';

describe('UnidadesSaudeComponent', () => {
  let component: UnidadesSaudeComponent;
  let fixture: ComponentFixture<UnidadesSaudeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadesSaudeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadesSaudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
