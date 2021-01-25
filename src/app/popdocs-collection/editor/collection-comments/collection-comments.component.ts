import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonContent, ModalController, NavParams } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Collection } from 'src/app/_models/Collection';
import { User } from 'src/app/_models/User';
import { CommentsSocket } from 'src/app/_sockets/commentsSocket';
import * as fromApp from '../../../store/app.reducer';
import * as UserActions from '../../../popdocs-user-profile/store/user.actions';


@Component({
  selector: 'app-collection-comments',
  templateUrl: './collection-comments.component.html',
  styleUrls: ['./collection-comments.component.scss'],
})
export class CollectionCommentsComponent implements OnInit {
  public selectedCollection: Collection;
  public collectionComemnts = [];
  public userData: User;
  public usersList = {};
  public newComment;
  @Output() commentsLoaded = new EventEmitter();
  @ViewChild('scroll') scroll: ElementRef;


  constructor(
    private commentsSocket: CommentsSocket,
    private store: Store<fromApp.AppState>,
  ) {
    this.store.select('collections').subscribe(
      collectionState => {
        if (collectionState.selectedCollection) {
          this.selectedCollection = collectionState.selectedCollection;
          this.getComments();
        }
      }
    );
    this.store.select('user').subscribe(userState => {this.userData = userState.currentUser; });
    this.store.select('user').subscribe(userState => {
      if (userState.userData) {
        this.usersList = userState.userData;
      }
    });
  }

  ngOnInit() {}

  getComments(){
    this.commentsSocket.currentComments.subscribe(comments => {
      // @ts-ignore
      this.collectionComemnts = comments.filter(comment => {
        if (!comment.eventName) {
          // @ts-ignore
          if (!this.usersList[`${comment.user}`]) {
            // @ts-ignore
            this.store.dispatch(new UserActions.FetchUserData(comment.user));
          }
          return comment;
        }
      });

      setTimeout(() => {
        this.scrollToBottom();
        this.newComment = '';
      }, 100);
  });
    this.commentsSocket.getCollectionComments(this.selectedCollection._id);
  }
  sendComment(){
    console.log(this.newComment);
    this.collectionComemnts.push({user: this.userData._id, meta: { content: this.newComment}, created: Date.now() });
    setTimeout(() => {
      this.scrollToBottom();
      this.newComment = '';
    }, 100);
  }

  scrollToBottom() {
    if (this.scroll) {
      // @ts-ignore
      this.scroll.el.scrollTop = this.scroll.el.scrollHeight;
    }
  }
}
