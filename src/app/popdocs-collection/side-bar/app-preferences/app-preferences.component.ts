import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-app-preferences',
  templateUrl: './app-preferences.component.html',
  styleUrls: ['./app-preferences.component.scss'],
})
export class AppPreferencesComponent implements OnInit {

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {}

  close() {
    this.modalController.dismiss();
  }
}
