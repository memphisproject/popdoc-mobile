import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { Collection } from 'src/app/_models/Collection';
import { CollectionCommentsComponent } from '../collection-comments/collection-comments.component';
import { CollectionSettingsComponent } from '../collection-settings/collection-settings.component';
import { SharingSettingsComponent } from '../sharing-settings/sharing-settings.component';
import { UserSettingsComponent } from '../user-settings/user-settings.component';

@Component({
  selector: 'app-options-popover',
  templateUrl: './options-popover.component.html',
  styleUrls: ['./options-popover.component.scss'],
})
export class OptionsPopoverComponent implements OnInit {
  public selectedCollection: Collection;

  constructor(
    private navParams: NavParams,
    private router: Router,
    private modalController: ModalController,
    private popoverController: PopoverController
  ) {
      // @ts-ignore
      this.selectedCollection = this.navParams.data.collection;
  }

  ngOnInit() {}

  async openCollectionSettings() {
    this.close();

    const modal = await this.modalController.create({
      component: CollectionSettingsComponent,
      componentProps: this.selectedCollection
    });
    return await modal.present();
  }

  async openCollectionShare() {
    this.close();

    const modal = await this.modalController.create({
      component: SharingSettingsComponent,
      componentProps: this.selectedCollection
    });
    return await modal.present();
  }

  async openCollectionComments() {
    this.close();

    const modal = await this.modalController.create({
      component: CollectionCommentsComponent,
      componentProps: this.selectedCollection,
      cssClass: 'my-custom-modal-css'
    });
    return await modal.present();
  }

  openMicrosite() {
    this.router.navigate(['/popdocs/microsite']);
    this.close();
  }

  close() {
    this.popoverController.dismiss();
  }
}
