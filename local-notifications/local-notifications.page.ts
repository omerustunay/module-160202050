import { Component, OnInit } from '@angular/core';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-local-notifications',
  templateUrl: './local-notifications.page.html',
  styleUrls: ['./local-notifications.page.scss'],
})
export class LocalNotificationsPage implements OnInit {

  constructor(private localNotifications: LocalNotifications) { }

  ngOnInit() {
  }
  registerNotification(seconds: number) {
    this.localNotifications.schedule({
      title: `my ${seconds} notification`,
      text: `my detailed description`,
      trigger: {
        // at: new Date(new Date().getTime() + ms) DOESN'T WORK
        in: seconds,
        unit: ELocalNotificationTriggerUnit.SECOND,
      },
    });
  }
}
