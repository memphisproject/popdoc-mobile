import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as CollectionActions from './store/collection.actions';
import * as UserActions from '../popdocs-user-profile/store/user.actions'

@Component({
  selector: 'app-popdocs-collection',
  templateUrl: './popdocs-collection.page.html',
  styleUrls: ['./popdocs-collection.page.scss'],
})
export class PopdocsCollectionPage implements OnInit {
  private url: string;

  constructor(
    private router: Router,
    private menu: MenuController,
    private store: Store<fromApp.AppState>
  ) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.url = val.url.split('/')[3];
      }
    });
  }

  ngOnInit() {
    this.store.dispatch(new CollectionActions.FetchCollections());
    this.store.dispatch(new UserActions.FetchUserNotifications());
  }

  toggleMenu() {
    this.menu.toggle();
  }
}
