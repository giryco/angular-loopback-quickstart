import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingSituationDialogComponent } from './accounting-situation-dialog.component';

describe('AccountingSituationDialogComponent', () => {
  let component: AccountingSituationDialogComponent;
  let fixture: ComponentFixture<AccountingSituationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingSituationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingSituationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
