import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor/editor.component';

import { PopdocsCollectionPage } from './popdocs-collection.page';

const routes: Routes = [
  {
    path: 'editor',
    component: PopdocsCollectionPage,
    children: [{
      path: '',
      component: EditorComponent
    }, {
      path: ':id',
      component: EditorComponent
    }]
  },
  {
    path: '',
    redirectTo: 'editor',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopdocsCollectionPageRoutingModule {}
