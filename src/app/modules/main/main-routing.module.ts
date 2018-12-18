import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Components
 */
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './main.component';
import { MaterialComponent } from './components/material/material.component';
import { ContractComponent } from './components/contract/contract.component';
import { AccountComponent } from './components/account/account.component';

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
    path: 'contract',
    component: ContractComponent
  }, {
    path: 'material',
    component: MaterialComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class MainRoutingModule { }
