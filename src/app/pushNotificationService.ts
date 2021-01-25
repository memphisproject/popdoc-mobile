import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import {
    Plugins,
    PushNotification,
    PushNotificationToken,
    PushNotificationActionPerformed } from '@capacitor/core';
import { Router } from '@angular/router';
const { PushNotifications } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
    public deviceToken: string;

    constructor(
      private router: Router
    ) { }

    initPush() {
        PushNotifications.requestPermission().then((permission) => {
            if (permission.granted) {
              PushNotifications.register();
            } else {
              // No permission for push granted
            }
          });

        PushNotifications.addListener(
            'registration',
            (token: PushNotificationToken) => {
                this.deviceToken = token.value;
                console.log('My token: ' + JSON.stringify(token));
            }
          );

        PushNotifications.addListener('registrationError', (error: any) => {
            console.log('Error: ' + JSON.stringify(error));
          });

        PushNotifications.addListener(
            'pushNotificationReceived',
            async (notification: PushNotification) => {
              console.log('Push received: ' + JSON.stringify(notification));
            }
          );

        PushNotifications.addListener(
            'pushNotificationActionPerformed',
            async (notification: PushNotificationActionPerformed) => {
              const data = notification.notification.data;
              console.log('Action performed: ' + JSON.stringify(notification.notification));
              if (data.mosaicId) {
                this.router.navigateByUrl(`/popdocs/collection/editor/${data.mosaicId}`);
              }
            }
          );
    }
}
