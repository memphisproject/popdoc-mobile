import { AfterViewChecked, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Collection } from 'src/app/_models/Collection';
import * as fromApp from '../../store/app.reducer';
import * as CollectionActions from '../store/collection.actions';
import { AppPreferencesComponent } from './app-preferences/app-preferences.component';
import * as  AuthActions from '../../popdocs-login/store/auth.actions';
import * as UserActions from '../../popdocs-user-profile/store/user.actions';
import { User } from 'src/app/_models/User';
import { PinOptionPopoverComponent } from './pin-option-popover/pin-option-popover.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  activeCollections: Collection[];
  discoveredCollections: Collection[];
  selectedCollectionId: string;
  pinnedCollections: Collection[];
  loading = true;
  public searchInput =  '';
  private lastScrollX;
  public editMode = false;
  @ViewChild('active')
  public activeList: ElementRef;
  public activeListState = true;
  @ViewChild('discovered')
  public discoveredList: ElementRef;
  public discoveredListState = true;
  @ViewChild('header')
  public header: ElementRef;
  headerState = true;
  userData: User;
  scrolling = false;

  constructor(
    private store: Store<fromApp.AppState>,
    private renderer: Renderer2,
    private modalController: ModalController,
    private popoverController: PopoverController
  ) {
    this.store.dispatch(new UserActions.FetchUserData(null));
  }

  ngOnInit() {
    this.store.select('collections').subscribe(
      collectionState => {
        this.loading = collectionState.loading;
        if (collectionState.pinnedCollections) {
          this.pinnedCollections = collectionState.pinnedCollections;
        }

        if (collectionState.activeCollections) {
          this.activeCollections = collectionState.activeCollections;
        }
        if (collectionState.discoveredCollections) {
          this.discoveredCollections = collectionState.discoveredCollections;
        }
        if (collectionState.selectedCollection) {
          this.selectedCollectionId = collectionState.selectedCollection._id;
        }
      }
    );

    this.store.select('user').subscribe(userState => {this.userData = userState.currentUser; });
  }

  toggleList(list) {
    switch (list){
      case 'active':
        if (this.activeListState) {
          // @ts-ignore
          this.renderer.setStyle(this.activeList.el, 'display', 'none');
          this.activeListState = false;
        } else {
          // @ts-ignore
          this.renderer.setStyle(this.activeList.el, 'display', 'block');
          this.activeListState = true;
        }
        break;
      case 'discovered':
        if (this.discoveredListState) {
          // @ts-ignore
          this.renderer.setStyle(this.discoveredList.el, 'display', 'none');
          this.discoveredListState = false;
        } else {
          // @ts-ignore
          this.renderer.setStyle(this.discoveredList.el, 'display', 'block');
          this.discoveredListState = true;
        }
        break;
    }
  }

  toggleEditMode(value) {
    this.editMode = value;
  }

  onCollectionReorder($event: any) {
    this.store.dispatch(new CollectionActions.UpdateCollectionOrder({from: $event.detail.from, to: $event.detail.to}));
    $event.detail.complete();
  }

  hideHeader() {
    // @ts-ignore
    this.renderer.setStyle(this.header.el, 'margin-top', `-${this.header.el.clientHeight}px`);
    // @ts-ignore
    this.renderer.setStyle(this.header.el, 'transition', 'margin-top 400ms');
  }

  showHeader() {
    // @ts-ignore
    this.renderer.setStyle(this.header.el, 'margin-top', 'unset');
    // @ts-ignore
    this.renderer.setStyle(this.header.el, 'transition', 'margin-top 400ms');
  }

  selectCollection(id: string) {
    this.store.dispatch(new CollectionActions.SelectCollection(id));
  }

  @HostListener('window:scroll', ['$event'])
  onScrollEvent($event) {
    if (($event.srcElement.scrollTop > Math.max(0, this.lastScrollX)) ) {
      if (this.headerState) {
        this.headerState = false;
        this.hideHeader();
      }
    } else {
      if (!this.headerState) {
        this.headerState = true;
        this.showHeader();
      }
    }
    this.lastScrollX = $event.srcElement.scrollTop;
  }

  async openAppPreferences() {
    const modal = await this.modalController.create({
      component: AppPreferencesComponent,
    });
    return await modal.present();
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  async showOptionsPopover(ev: any, collection) {
    if (!this.scrolling && this.selectedCollectionId === collection._id) {
      const popover = await this.popoverController.create({
        component: PinOptionPopoverComponent,
        event: ev,
        componentProps: {collection},
      });
      return await popover.present();
    }
  }
}
