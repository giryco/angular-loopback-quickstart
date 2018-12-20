import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingSituationComponent } from './accounting-situation.component';

describe('AccountingSituationComponent', () => {
  let component: AccountingSituationComponent;
  let fixture: ComponentFixture<AccountingSituationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingSituationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
