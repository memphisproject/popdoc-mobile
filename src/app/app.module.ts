import { Injectable, NgModule } from '@angular/core';
import { BrowserModule, HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as fromApp from './store/app.reducer';
import { environment } from 'src/environments/environment';
import { AuthEffects } from './popdocs-login/store/auth.effects';
import { TokenInterceptor } from './popdocs-login/token.interceptor';
import { CollectionEffects } from './popdocs-collection/store/collection.effects';
import { TileEffects } from './popdocs-tile/store/tile.effects';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import { ShowdownModule } from 'ngx-showdown';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { UserEffects } from './popdocs-user-profile/store/user.effects';
import { GravatarModule } from 'ngx-gravatar';
import * as Hammer from 'hammerjs';
import { AutosizeModule } from 'ngx-autosize';
import { MentionModule } from 'angular-mentions';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

const config: SocketIoConfig = { url: environment.socketUrl, options: {transports: [ 'websocket', 'polling' ]} };

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any> {
    'swipe': {
      enable: true,
      direction: Hammer.DIRECTION_HORIZONTAL,
    }
  };
}


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    GravatarModule,
    FormsModule,
    HammerModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([
      AuthEffects,
      CollectionEffects,
      TileEffects,
      UserEffects
    ]),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    ShowdownModule.forRoot({emoji: true, noHeaderId: true, flavor: 'github'}),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    PdfViewerModule,
    AutosizeModule,
    MentionModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
