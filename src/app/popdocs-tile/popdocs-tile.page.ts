import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { Collection } from '../_models/Collection';
import { Tile } from '../_models/Tile';
import { FileConvertService } from './fileConvertService';
import * as UserActions from '../popdocs-user-profile/store/user.actions';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-popdocs-tile',
  templateUrl: './popdocs-tile.page.html',
  styleUrls: ['./popdocs-tile.page.scss'],
})
export class PopdocsTilePage implements OnInit {
  selectedCollection: Collection;
  selectedTile: Tile;
  authorId;
  pdfFile;
  loading = false;
  url: string;
  segmentState = 'tile';
  public usersList = {};


  constructor(
    private store: Store<fromApp.AppState>,
    private fileConvertService: FileConvertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.store.select('collections').subscribe(
      collectionState => {
        if (collectionState.selectedCollection) {
          this.selectedCollection = collectionState.selectedCollection;
        }
      }
    );

    this.store.select('user').subscribe(userState => {
      if (userState.userData) {
        this.usersList = userState.userData;
      }
    });

    this.store.select('tile').subscribe(tileState => {
      if (tileState.selectedTile) {
        this.selectedTile = tileState.selectedTile;
        this.authorId = this.selectedTile.author ? this.selectedTile.author._id : this.selectedTile.user;
        if (!this.usersList[`${this.selectedTile.author ? this.selectedTile.author._id : this.selectedTile.user}`]) {
          this.store.dispatch(new UserActions.FetchUserData(this.selectedCollection.user._id));
        }

        if (this.selectedTile.type === 'specific-file') {
          this.getPdf(this.selectedTile.meta.secretName);
        }
      }
    });
  }

  getPdf(secretname: string) {
    this.loading = true;
    this.fileConvertService.downloadFile(secretname).subscribe(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = (e) => {
          this.pdfFile = reader.result;
          this.loading = false;
      };
    });
  }

  segmentChanged($event) {
    this.segmentState = $event.detail.value;
  }
}
