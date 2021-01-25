import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as UserActions from '../../../popdocs-user-profile/store/user.actions';
import { Notification } from 'src/app/_models/Notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  userNotifications: Notification[];
  public usersList = {};
  private fetchControl = []; 
  constructor(
    private modalController: ModalController,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.store.select('user').subscribe(userState => {
      if (userState.userData) {
        this.usersList = userState.userData;
      }

      if (userState.userNotifications) {
        this.userNotifications = userState.userNotifications;

        this.userNotifications.forEach(notification => {
          this.fetchNewUser(notification.from);
        });
      }
    });
  }

  close() {
    this.modalController.dismiss();
  }

  fetchNewUser(user) {
    if (!this.fetchControl.includes(user)) {
      this.fetchControl.push(user);
      if (!this.usersList[`${user}`]) {
        this.store.dispatch(new UserActions.FetchUserData(user));
      }
    }
  }
}
