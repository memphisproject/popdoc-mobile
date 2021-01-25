import { Component, HostListener, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Tile } from 'src/app/_models/Tile';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit {
  tiles: Tile[] = [];
  public selectedTile: Tile;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) {}

  ngOnInit() {
    // @ts-ignore
    const tileArrayClone = this.navParams.data.tiles.map(el => JSON.parse(JSON.stringify(el)));
    const tilesWithNav = this.addNavigation(tileArrayClone);
    //this.selectedTile = this.tiles[0];

    this.tiles = tilesWithNav;
    console.log(this.tiles);
    this.selectedTile = this.tiles[0];
  }

  close() {
    this.modalController.dismiss();
  }

  swipeRightNav(){
    this.selectedTile =
      this.selectedTile.storyNav.left ||
      this.selectedTile.storyNav.left === 0 ? this.tiles[this.selectedTile.storyNav.left] : this.selectedTile;

  }
  swipeLeftNav(){
    console.log(    this.selectedTile)

    this.selectedTile =
      this.tiles[this.selectedTile.storyNav.right] ||
      this.selectedTile.storyNav.right === 0 ? this.tiles[this.selectedTile.storyNav.right] : this.selectedTile;
    console.log(    this.selectedTile)

  }
  swipeUpNav(){
    this.selectedTile =
      this.tiles[this.selectedTile.storyNav.down] ||
      this.selectedTile.storyNav.down === 0 ? this.tiles[this.selectedTile.storyNav.down] : this.selectedTile;
  }
  swipeDownNav(){
    this.selectedTile = this.tiles[this.selectedTile.storyNav.up] ||
     this.selectedTile.storyNav.up === 0 ? this.tiles[this.selectedTile.storyNav.up] : this.selectedTile;
  }


  addNavigation(tiles) {
    return tiles.map((el, index) => {
      if (el.level === 0) {
        el.storyNav = {
          right: this.nextRoot(index, tiles),
          left: this.previousRoot(index, tiles),
          up: null,
          down: this.nextChild(index, tiles)
        };
      } else {
        el.storyNav = {
          right: this.nextTile(index, tiles.length),
          left: this.previousTile(index),
          up: this.previousRoot(index, tiles),
          down: this.firstChild(index, tiles)
        };
      }
      return el;
    });
  }
  nextRoot(i, array){
    let indexOfNextRoot = null;
    for (let index = i + 1 ; index < array.length; index++) {
      const element = array[index];

      if (element.level === 0){
        indexOfNextRoot = index;
        break;
      }
    }

    return indexOfNextRoot ? indexOfNextRoot : null;
  }
  previousRoot(i, array){
    let indexOfpreviousRoot = null;
    for (let index = i - 1; index >= 0; index--) {
      const element = array[index];

      if (element.level === 0){
        indexOfpreviousRoot = index;
        break;
      }
    }

    return indexOfpreviousRoot || indexOfpreviousRoot === 0 ? indexOfpreviousRoot : null;
  }
  nextTile(i , arraySize) {
    return i + 1 < arraySize ? i + 1 : null;
  }
  previousTile(i){
    return i - 1 >= 0 ? i - 1 : null;
  }
  nextChild(i, array){
    const element = array[i];
    const nextElement = array[i + 1];
    return nextElement && nextElement.level > element.level ? i + 1 : null;
  }
  firstChild(i, array){
    const currnetTile = array[i];
    const nextTile = (i + 1) < array.length ? array[i + 1] : null;
    return nextTile && nextTile.level > currnetTile.level ? (i + 1) : null;
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.code === 'ArrowRight') {
      this.swipeLeftNav();
    }
    if (event.code === 'ArrowLeft') {
      this.swipeRightNav();
    }
    if (event.code === 'ArrowDown') {
      this.swipeDownNav();
    }
    if (event.code === 'ArrowUp') {
      this.swipeUpNav();
    }
  }
}
