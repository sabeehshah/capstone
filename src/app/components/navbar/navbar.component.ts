import { Component, OnInit } from '@angular/core';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../models/Notification' 
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
isLoggedIn:boolean;
loggedInUser:string;
notificationCount:string;
notifications:Notification[];
myNotifications:Notification[];

  constructor(
    private authService:AuthService,
    public notificationService: NotificationService,
    private router:Router,
    private flashMessagesService:FlashMessagesService

  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if(auth){
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;

        this.notificationService.getNotifications().subscribe(notifications => {
          this.notifications = notifications;
          console.log(this.notifications);



          this.myNotifications = this.notifications.filter(notification => notification.createdForUser == this.loggedInUser
             && notification.readStatus == "0");

          console.log(this.myNotifications);

          if(this.myNotifications.length > 0){
            this.notificationCount = this.myNotifications.length.toString();
            
          }else{
            this.notificationCount = "0";
          }
          




        });
        

      } else{
        this.isLoggedIn = false;
      }
    })
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessagesService.show('You are logged out' , {cssClass: 'alert-success', timeout:4000});
    this.router.navigate(['/login']);
  }

}
