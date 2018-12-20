import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseLocationDialogComponent } from './warehouse-location-dialog.component';

describe('WarehouseLocationDialogComponent', () => {
  let component: WarehouseLocationDialogComponent;
  let fixture: ComponentFixture<WarehouseLocationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseLocationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseLocationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
