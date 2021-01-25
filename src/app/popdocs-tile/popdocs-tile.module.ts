import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopdocsTilePageRoutingModule } from './popdocs-tile-routing.module';

import { PopdocsTilePage } from './popdocs-tile.page';
import {FroalaEditorModule, FroalaViewModule} from "angular-froala-wysiwyg";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {GravatarModule} from "ngx-gravatar";
import { AutosizeModule } from 'ngx-autosize';
import { TileCommentsComponent } from './tile-comments/tile-comments.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PopdocsTilePageRoutingModule,
        FroalaViewModule,
        FroalaEditorModule,
        PdfViewerModule,
        GravatarModule,
        AutosizeModule
      ],
  declarations: [PopdocsTilePage, TileCommentsComponent],

})
export class PopdocsTilePageModule {}
