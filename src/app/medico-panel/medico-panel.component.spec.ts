import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoPanelComponent } from './medico-panel.component';

describe('MedicoPanelComponent', () => {
  let component: MedicoPanelComponent;
  let fixture: ComponentFixture<MedicoPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicoPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
