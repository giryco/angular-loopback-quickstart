import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTypeDialogComponent } from './stock-type-dialog.component';

describe('StockTypeDialogComponent', () => {
  let component: StockTypeDialogComponent;
  let fixture: ComponentFixture<StockTypeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockTypeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
