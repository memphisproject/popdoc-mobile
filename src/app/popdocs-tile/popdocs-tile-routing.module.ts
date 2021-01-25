import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopdocsTilePage } from './popdocs-tile.page';

const routes: Routes = [
  {
    path: '',
    component: PopdocsTilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopdocsTilePageRoutingModule {}
