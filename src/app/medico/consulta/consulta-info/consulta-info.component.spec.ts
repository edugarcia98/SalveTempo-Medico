import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaInfoComponent } from './consulta-info.component';

describe('ConsultaInfoComponent', () => {
  let component: ConsultaInfoComponent;
  let fixture: ComponentFixture<ConsultaInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
