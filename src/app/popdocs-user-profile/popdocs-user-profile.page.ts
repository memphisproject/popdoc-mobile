import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { User } from '../_models/User';
import * as UserActions from './store/user.actions';

@Component({
  selector: 'app-popdocs-user-profile',
  templateUrl: './popdocs-user-profile.page.html',
  styleUrls: ['./popdocs-user-profile.page.scss'],
})
export class PopdocsUserProfilePage implements OnInit {
  selectedUserId: string;
  public usersList = {};

  constructor(
    private socialSharing: SocialSharing,
    private store: Store<fromApp.AppState>,
    private router: Router
  ) {
    this.store.select('user').subscribe(userState => {
      if (userState.userData) {
        this.usersList = userState.userData;
      }
    });

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.selectedUserId = val.url.split('/')[3];
        if (this.selectedUserId !== 'editor') {
          if (!this.usersList || !this.usersList[`${this.selectedUserId}`]) {
            this.store.dispatch(new UserActions.FetchUserData(this.selectedUserId));
          }
        }
      }
    });
  }

  ngOnInit() {
    this.store.dispatch(new UserActions.FetchUserProfileCollections(this.selectedUserId));
  }

  onShare() {
    const options = {
      message: `${this.usersList[this.selectedUserId].name}`,
      url: `https://dev.memphis.io/microsites/${this.usersList[this.selectedUserId].name}`
    };

    this.socialSharing.shareWithOptions(options);
  }
}
