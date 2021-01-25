import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Collection } from 'src/app/_models/Collection';
import * as fromApp from '../../store/app.reducer';
import * as TileActions from '../../popdocs-tile/store/tile.actions';
import * as CollectionActions from '../../popdocs-collection/store/collection.actions';
import { Tile } from 'src/app/_models/Tile';
import { IonContent, IonRouterOutlet, ModalController, PopoverController } from '@ionic/angular';
import { CollectionSettingsComponent } from './collection-settings/collection-settings.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { SharingSettingsComponent } from './sharing-settings/sharing-settings.component';
import { CollectionCommentsComponent } from './collection-comments/collection-comments.component';
import { Router, RouterOutlet } from '@angular/router';
import { OptionsPopoverComponent } from './options-popover/options-popover.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  selectedCollection: Collection;
  tiles: Tile[];
  loading = true;
  editMode = false;
  segmentState = 'tiles';
  public newComment = '';
  @ViewChild(IonContent) content: IonContent;


  constructor(
    private store: Store<fromApp.AppState>,
    private modalController: ModalController,
    private router: Router,
    private routerOutlet: IonRouterOutlet,
    private popoverController: PopoverController,
  ) {
    this.routerOutlet.swipeGesture = false;

    this.store.select('auth').subscribe(authState => {
      if (!authState.authData){
        this.router.navigate(['popdocs/login']);
      }
    });
  }

  ngOnInit() {
    this.store.select('collections').subscribe(
      collectionState => {
        if (collectionState.selectedCollection) {
          this.tiles = null;
          this.selectedCollection = collectionState.selectedCollection;
          this.fetchTile(this.selectedCollection._id);
        }
      }
    );

    this.store.select('tile').subscribe(tileState => {
      this.loading = tileState.loading;
      if (tileState.collectionTiles) {
        this.tiles = tileState.collectionTiles;
      }
    });
  }

  fetchTile(id: string) {
    this.store.dispatch(new TileActions.FetchTiles(id));
  }

  selectTile(id: string) {
    this.store.dispatch(new TileActions.SelectTile(id));
  }

  selectCollection(id: string) {
    this.store.dispatch(new CollectionActions.SelectCollection(id));
  }


  async openNotifications() {
    const modal = await this.modalController.create({
      component: NotificationsComponent,
    });
    return await modal.present();
  }
  async openUserSettings() {
    const modal = await this.modalController.create({
      component: UserSettingsComponent,
    });
    return await modal.present();
  }

  async openOptionsPopover() {
    const popover = await this.popoverController.create(
      {
          component: OptionsPopoverComponent,
          componentProps: {collection: this.selectedCollection},
          event
      }
    );
    return await popover.present();
  }

  toggleEditMode(value){
    this.editMode = value;
  }

  onTileReorder($event: any) {
    this.store.dispatch(new TileActions.UpdateTilesOrder({from: $event.detail.from, to: $event.detail.to}));
    $event.detail.complete();
  }

  segmentChanged($event) {
    this.segmentState = $event.detail.value;
  }

  scrollToBottom(){
    this.content.scrollToBottom(100);
  }

  sendComment(){
    console.log(this.newComment);
  }
}
