import { Component, NgZone, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as fromApp from './store/app.reducer';
import { Store } from '@ngrx/store';
import * as  AuthActions from './popdocs-login/store/auth.actions';
import { PushNotificationService } from './pushNotificationService';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private store: Store<fromApp.AppState>,
    private pushNotificationService: PushNotificationService,
    private router: Router,
    private zone: NgZone
  ) {
    this.initializeApp();
    if (this.platform.is('ios')){
      this.pushNotificationService.initPush();
    }
    this.initializeApp();
  }
  ngOnInit() {
    this.store.dispatch(new AuthActions.AutoLogin());
  }

  initializeApp() {
    App.addListener('appUrlOpen', (data: any) => {
      this.zone.run(() => {
          // Example url: https://beerswift.app/tabs/tab2
          // slug = /tabs/tab2
          console.log(data);
      });
  });


    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
