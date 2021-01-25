import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PopdocsLoginPageRoutingModule } from './popdocs-login-routing.module';
import { PopdocsLoginPage } from './popdocs-login.page';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        IonicModule,
        PopdocsLoginPageRoutingModule
    ],
    declarations: [
      PopdocsLoginPage
    ]
})
export class PopdocsLoginPageModule {}
