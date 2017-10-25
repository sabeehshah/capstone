import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Notification } from '../../models/Notification';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-messageboard',
  templateUrl: './messageboard.component.html',
  styleUrls: ['./messageboard.component.css']
})
export class MessageboardComponent implements OnInit {

  notification: Notification = {
    createdDate:'',
    createdTime:'',
    message:'',
    readStatus:'',
    createdForUser:''
  }
 
  id: string;
  notifications: Notification[];
  myNotifications: Notification[];
  loggedInUser: string;

  

  constructor(
    public notificationService: NotificationService,
    public router: Router,
    public route: ActivatedRoute,
    public flashMessagesService: FlashMessagesService,
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

  onSubmit(){
          
    /*if(!valid){
        console.log(value); 
        console.log(valid); 
      this.flashMessagesService.show('Please fill in the required fields.', {cssClass:'alert-danger',timeout:4000})
      this.router.navigate(['messageBoard']);
    }else{
      //Update team
      this.notificationService.updateNotification(this.id,value);
      console.log(value); 
      this.flashMessagesService.show('Team Updated.', {cssClass:'alert-success',timeout:4000})
      this.router.navigate(['/team/'+this.id]);
    }*/

    alert(this.id);
    

  }

}
