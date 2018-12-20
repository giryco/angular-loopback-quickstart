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
import { ContractComponent } from './components/contract/contract.component';
import { ContractDialogComponent } from './components/contract/contract-dialog/contract-dialog.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './main.component';
import { MaterialComponent } from './components/material/material.component';
import { MaterialDialogComponent } from './components/material/material-dialog/material-dialog.component';
import { ProviderComponent } from './components/provider/provider.component';
import { ProviderDialogComponent } from './components/provider/provider-dialog/provider-dialog.component';
import { WarehouseLocationComponent } from './components/warehouse-location/warehouse-location.component';
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
    ContractComponent,
    ContractDialogComponent,
    DashboardComponent,
    MainComponent,
    MaterialComponent,
    MaterialDialogComponent,
    ProviderComponent,
    ProviderDialogComponent,
    WarehouseLocationComponent,
    WarehouseLocationDialogComponent,
  ],
  entryComponents: [
    AccountDialogComponent,
    AccountingSituationDialogComponent,
    ContractDialogComponent,
    MaterialDialogComponent,
    ProviderDialogComponent,
    WarehouseLocationDialogComponent,
  ]
})
export class MainModule { }
