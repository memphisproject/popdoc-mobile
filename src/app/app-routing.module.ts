import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'popdocs/login',
    loadChildren: () => import('./popdocs-login/popdocs-login.module').then( m => m.PopdocsLoginPageModule)
  },
  {
    path: 'popdocs/collection',
    loadChildren: () => import('./popdocs-collection/popdocs-collection.module').then( m => m.PopdocsCollectionPageModule)
  },
  {
    path: 'popdocs/tile',
    loadChildren: () => import('./popdocs-tile/popdocs-tile.module').then( m => m.PopdocsTilePageModule)
  },
  {
    path: 'popdocs/tile/:id',
    loadChildren: () => import('./popdocs-tile/popdocs-tile.module').then( m => m.PopdocsTilePageModule)
  },
  {
    path: '',
    redirectTo: 'popdocs/collection/editor',
    pathMatch: 'full'
  },
  {
    path: 'popdocs/microsite',
    loadChildren: () => import('./popdocs-microsite/popdocs-microsite.module').then( m => m.PopdocsMicrositePageModule)
  },
  {
    path: 'popdocs/profile/:username',
    loadChildren: () => import('./popdocs-user-profile/popdocs-user-profile.module').then( m => m.PopdocsUserProfilePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
