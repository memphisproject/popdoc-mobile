import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-microsite-settings',
  templateUrl: './microsite-settings.component.html',
  styleUrls: ['./microsite-settings.component.scss'],
})
export class MicrositeSettingsComponent implements OnInit {

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {}

  close() {
    this.modalController.dismiss();
  }

}
