import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Collection } from '../_models/Collection';
import { Tile } from '../_models/Tile';
import * as fromApp from '../store/app.reducer';
import * as TileActions from '../popdocs-tile/store/tile.actions';
import { ModalController } from '@ionic/angular';
import { StoryComponent } from './story/story.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { MicrositeSettingsComponent } from './microsite-settings/microsite-settings.component';

@Component({
  selector: 'app-popdocs-microsite',
  templateUrl: './popdocs-microsite.page.html',
  styleUrls: ['./popdocs-microsite.page.scss'],
})
export class PopdocsMicrositePage implements OnInit {
  selectedCollection: Collection;
  tiles: Tile[];

  constructor(
    private store: Store<fromApp.AppState>,
    private modalController: ModalController,
    private socialSharing: SocialSharing
  ) { }

  ngOnInit() {
    this.store.select('collections').subscribe(
      collectionState => {
        if (collectionState.selectedCollection) {
          this.selectedCollection = collectionState.selectedCollection;
        }
      }
    );

    this.store.select('tile').subscribe(tileState => {
      if (tileState.collectionTiles) {
        this.tiles = tileState.collectionTiles;
      }
    });
  }

  selectTile(id: string) {
    this.store.dispatch(new TileActions.SelectTile(id));
  }

  async openStory() {
    const modal = await this.modalController.create({
      component: StoryComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: {tiles: this.tiles}
    });
    return await modal.present();
  }

  async openMicrositeSettings() {
    const modal = await this.modalController.create({
      component: MicrositeSettingsComponent,
      componentProps: this.selectedCollection
    });
    return await modal.present();
  }

  onShare() {
    const options = {
      message: `${this.selectedCollection.title}`,
      url: `https://dev.memphis.io/${this.selectedCollection.user.name}/${this.selectedCollection.title}/${this.selectedCollection._id}`
    };

    this.socialSharing.shareWithOptions(options);
  }
}
