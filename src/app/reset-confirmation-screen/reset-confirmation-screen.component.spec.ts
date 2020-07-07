import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetConfirmationScreenComponent } from './reset-confirmation-screen.component';

describe('ResetConfirmationScreenComponent', () => {
  let component: ResetConfirmationScreenComponent;
  let fixture: ComponentFixture<ResetConfirmationScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetConfirmationScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetConfirmationScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
