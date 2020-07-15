import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMedicoComponent } from './show-medico.component';

describe('ShowMedicoComponent', () => {
  let component: ShowMedicoComponent;
  let fixture: ComponentFixture<ShowMedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMedicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
