import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Collection } from 'src/app/_models/Collection';
import * as fromApp from '../../../store/app.reducer';
import * as CollectionActions from '../../store/collection.actions';

@Component({
  selector: 'app-pin-option-popover',
  templateUrl: './pin-option-popover.component.html',
  styleUrls: ['./pin-option-popover.component.scss'],
})
export class PinOptionPopoverComponent implements OnInit {
  public collectionToPin: Collection;

  constructor(
    private navParams: NavParams,
    private store: Store<fromApp.AppState>,
    private popoverController: PopoverController
  ) {
      this.collectionToPin = this.navParams.data.collection;
    }

  ngOnInit() {
  }

  pinCollection(){
    this.store.dispatch(new CollectionActions.PinCollection(this.collectionToPin._id));
    this.close();
  }

  close(){
    this.popoverController.dismiss();
  }
}
