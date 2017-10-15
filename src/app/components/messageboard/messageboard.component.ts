import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../models/Notification';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-messageboard',
  templateUrl: './messageboard.component.html',
  styleUrls: ['./messageboard.component.css']
})
export class MessageboardComponent implements OnInit {

  notifications: Notification[];
  myNotifications: Notification[];
  loggedInUser: string;

  constructor(
    public notificationService: NotificationService,
    public authService: AuthService
  ) { }

  ngOnInit() {

    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.loggedInUser = auth.email;

        this.notificationService.getNotifications().subscribe(notifications => {
          this.notifications = notifications;
          console.log(this.notifications);



          this.myNotifications = this.notifications.filter(notification => notification.createdForUser == this.loggedInUser);

          console.log(this.myNotifications);






        });



      } else {

      }
    });

  }

}
