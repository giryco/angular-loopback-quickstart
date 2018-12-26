import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * MOdules
 */
import { MainRoutingModule } from './main-routing.module';
import {NgxMaskModule} from 'ngx-mask';
import { SharedModule } from '../shared/shared.module';

/**
 * Components
 */
import { AccountComponent } from './components/account/account.component';
import { AccountDialogComponent } from './components/account/account-dialog/account-dialog.component';
import { AccountingSituationComponent } from './components/accounting-situation/accounting-situation.component';
import { AccountingSituationDialogComponent } from './components/accounting-situation/accounting-situation-dialog/accounting-situation-dialog.component';
import { ClientComponent } from './components/client/client.component';
import { ClientDialogComponent } from './components/client/client-dialog/client-dialog.component';
import { ContractComponent } from './components/contract/contract.component';
import { ContractDialogComponent } from './components/contract/contract-dialog/contract-dialog.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './main.component';
import { MaterialComponent } from './components/material/material.component';
import { MaterialDialogComponent } from './components/material/material-dialog/material-dialog.component';
import { ProviderComponent } from './components/provider/provider.component';
import { ProviderDialogComponent } from './components/provider/provider-dialog/provider-dialog.component';
import { WarehouseLocationComponent } from './components/warehouse-location/warehouse-location.component';
import { StockTypeComponent } from './components/stock-type/stock-type.component';
import { StockTypeDialogComponent } from './components/stock-type/stock-type-dialog/stock-type-dialog.component';
import { WarehouseLocationDialogComponent } from './components/warehouse-location/warehouse-location-dialog/warehouse-location-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    NgxMaskModule.forRoot(),
    SharedModule
  ],
  declarations: [
    AccountComponent,
    AccountDialogComponent,
    AccountingSituationDialogComponent,
    AccountingSituationComponent,
    ClientComponent,
    ClientDialogComponent,
    ContractComponent,
    ContractDialogComponent,
    DashboardComponent,
    MainComponent,
    MaterialComponent,
    MaterialDialogComponent,
    ProviderComponent,
    ProviderDialogComponent,
    WarehouseLocationComponent,
    StockTypeComponent,
    StockTypeDialogComponent,
    WarehouseLocationDialogComponent,
  ],
  entryComponents: [
    AccountDialogComponent,
    AccountingSituationDialogComponent,
    ClientDialogComponent,
    ContractDialogComponent,
    MaterialDialogComponent,
    ProviderDialogComponent,
    StockTypeDialogComponent,
    WarehouseLocationDialogComponent,
  ]
})
export class MainModule { }
