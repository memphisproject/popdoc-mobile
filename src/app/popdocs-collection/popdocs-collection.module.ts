import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PopdocsCollectionPageRoutingModule } from './popdocs-collection-routing.module';
import { PopdocsCollectionPage } from './popdocs-collection.page';
import {PopdocsLoginPageModule} from '../popdocs-login/popdocs-login.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { EditorComponent } from './editor/editor.component';
import {FroalaViewModule} from "angular-froala-wysiwyg";
import {ShowdownModule} from "ngx-showdown";
import { SearchPipe } from './side-bar/search.pipe';
import { CollectionSettingsComponent } from './editor/collection-settings/collection-settings.component';
import { NotificationsComponent } from './editor/notifications/notifications.component';
import { UserSettingsComponent } from './editor/user-settings/user-settings.component';
import { SharingSettingsComponent } from './editor/sharing-settings/sharing-settings.component';
import { AppPreferencesComponent } from './side-bar/app-preferences/app-preferences.component';
import { CollectionCommentsComponent } from './editor/collection-comments/collection-comments.component';
import {GravatarModule} from 'ngx-gravatar';
import { OptionsPopoverComponent } from './editor/options-popover/options-popover.component';
import { AutosizeModule } from 'ngx-autosize';
import { MentionModule } from 'angular-mentions';
import { PinOptionPopoverComponent } from './side-bar/pin-option-popover/pin-option-popover.component';
import { LongPressDirective } from './side-bar/long-press.directive';
import { MessageTimePipe } from './editor/notifications/message-time.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PopdocsCollectionPageRoutingModule,
        PopdocsLoginPageModule,
        FroalaViewModule,
        ShowdownModule,
        GravatarModule,
        AutosizeModule,
        MentionModule
    ],
    exports: [
      SideBarComponent,
      EditorComponent,
      CollectionSettingsComponent,
      NotificationsComponent,
      UserSettingsComponent,
      SharingSettingsComponent,
      AppPreferencesComponent,
      CollectionCommentsComponent,
      OptionsPopoverComponent,
      PinOptionPopoverComponent
    ],
    declarations: [
      PopdocsCollectionPage,
      SideBarComponent,
      EditorComponent,
      CollectionSettingsComponent,
      UserSettingsComponent,
      SearchPipe,
      NotificationsComponent,
      SharingSettingsComponent,
      AppPreferencesComponent,
      CollectionCommentsComponent,
      OptionsPopoverComponent,
      PinOptionPopoverComponent,
      LongPressDirective,
      MessageTimePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PopdocsCollectionPageModule {}
