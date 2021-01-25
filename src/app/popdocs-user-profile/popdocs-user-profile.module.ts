import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopdocsUserProfilePageRoutingModule } from './popdocs-user-profile-routing.module';

import { PopdocsUserProfilePage } from './popdocs-user-profile.page';
import {GravatarModule} from "ngx-gravatar";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PopdocsUserProfilePageRoutingModule,
        GravatarModule
    ],
  declarations: [PopdocsUserProfilePage]
})
export class PopdocsUserProfilePageModule {}
