import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopdocsMicrositePageRoutingModule } from './popdocs-microsite-routing.module';

import { PopdocsMicrositePage } from './popdocs-microsite.page';
import {FroalaViewModule} from "angular-froala-wysiwyg";
import { StoryComponent } from './story/story.component';
import { MicrositeSettingsComponent } from './microsite-settings/microsite-settings.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PopdocsMicrositePageRoutingModule,
        FroalaViewModule
    ],
    exports: [
      StoryComponent,
      MicrositeSettingsComponent
    ],
    declarations: [
      PopdocsMicrositePage,
      StoryComponent,
      MicrositeSettingsComponent
    ]
})
export class PopdocsMicrositePageModule {}
