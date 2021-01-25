import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Collection } from 'src/app/_models/Collection';

@Component({
  selector: 'app-collection-settings',
  templateUrl: './collection-settings.component.html',
  styleUrls: ['./collection-settings.component.scss'],
})
export class CollectionSettingsComponent implements OnInit {
  public selectedCollection: Collection;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) {
    // @ts-ignore
    this.selectedCollection = navParams.data;
  }

  ngOnInit() {}

  close() {
    this.modalController.dismiss();
  }
}
