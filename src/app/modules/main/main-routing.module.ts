import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Components
 */
import { AccountComponent } from './components/account/account.component';
import { AccountingSituationComponent } from './components/accounting-situation/accounting-situation.component';
import { ClientComponent } from './components/client/client.component';
import { ContractComponent } from './components/contract/contract.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './main.component';
import { MaterialComponent } from './components/material/material.component';
import { ProviderComponent } from './components/provider/provider.component';
import { StockTypeComponent } from './components/stock-type/stock-type.component';
import { WarehouseLocationComponent } from './components/warehouse-location/warehouse-location.component';

const routes: Routes = [{
  path: '', component: MainComponent, children: [{
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }, {
    path: 'dashboard',
    component: DashboardComponent
  }, {
    path: 'account',
    component: AccountComponent
  }, {
    path: 'accounting-situation',
    component: AccountingSituationComponent
  }, {
    path: 'contract',
    component: ContractComponent
  }, {
    path: 'material',
    component: MaterialComponent
  }, {
    path: 'provider',
    component: ProviderComponent
  }, {
    path: 'warehouse-location',
    component: WarehouseLocationComponent
  }, {
    path: 'stock-type',
    component: StockTypeComponent
  }, {
    path: 'client',
    component: ClientComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class MainRoutingModule { }
