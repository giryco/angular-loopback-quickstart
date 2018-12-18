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
import { ContractComponent } from './components/contract/contract.component';
import { ContractDialogComponent } from './components/contract/contract-dialog/contract-dialog.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './main.component';
import { MaterialComponent } from './components/material/material.component';
import { MaterialDialogComponent } from './components/material/material-dialog/material-dialog.component';

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
    ContractComponent,
    ContractDialogComponent,
    DashboardComponent,
    MainComponent,
    MaterialComponent,
    MaterialDialogComponent
  ],
  entryComponents: [
    AccountDialogComponent,
    ContractDialogComponent,
    MaterialDialogComponent
  ]
})
export class MainModule { }
