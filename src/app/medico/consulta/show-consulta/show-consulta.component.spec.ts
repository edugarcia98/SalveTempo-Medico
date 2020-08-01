import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowConsultaComponent } from './show-consulta.component';

describe('ShowConsultaComponent', () => {
  let component: ShowConsultaComponent;
  let fixture: ComponentFixture<ShowConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
