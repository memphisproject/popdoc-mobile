import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopdocsLoginPage } from './popdocs-login.page';

const routes: Routes = [
  {
    path: '',
    component: PopdocsLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopdocsLoginPageRoutingModule {}
