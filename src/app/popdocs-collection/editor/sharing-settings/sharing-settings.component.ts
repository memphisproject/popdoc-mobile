import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import * as fromApp from '../../../store/app.reducer';
import * as UserActions from '../../../popdocs-user-profile/store/user.actions';
import { Store } from '@ngrx/store';
import { Collection } from 'src/app/_models/Collection';

@Component({
  selector: 'app-sharing-settings',
  templateUrl: './sharing-settings.component.html',
  styleUrls: ['./sharing-settings.component.scss'],
})
export class SharingSettingsComponent implements OnInit {
  public selectedCollection: Collection;
  public usersList = {};

  constructor(
    private modalController: ModalController,
    private store: Store<fromApp.AppState>,
    private navParams: NavParams
  ) {
      // @ts-ignore
      this.selectedCollection = this.navParams.data;
   }

  ngOnInit() {
    this.store.select('user').subscribe(userState => {
      if (userState.userData) {
        this.usersList = userState.userData;
      }
    });

    this.selectedCollection.shareList.forEach( collab => {
      // @ts-ignore
      if (!this.usersList[`${collab.meta}`]) {
        // @ts-ignore
        this.store.dispatch(new UserActions.FetchUserData(collab.meta));
      }
    });

    if (!this.usersList[`${this.selectedCollection.user._id}`]) {
      this.store.dispatch(new UserActions.FetchUserData(this.selectedCollection.user._id));
    }
  }

  close() {
    this.modalController.dismiss();
  }
}
