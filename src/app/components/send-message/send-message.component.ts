import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Message } from '../../models/Message';
import { MessagesService } from '../../services/messages.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';


import 'rxjs/add/operator/map';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css','../../../../node_modules/animate.css/animate.css',
  '../../../../node_modules/ui-select/dist/select.min.css']
})
export class SendMessageComponent implements OnInit {

  loggedInUser:string;
  
  allUsers:User[];
  usersNotMe:User[];
  user:User[];

  users:string[];

  message: Message = {
    createdDate:'',
    createdTime:'',
    messageTo:'',
    messageFrom:'',
    subject:'',
    message:'',
    readStatus:'',
    mDeleted:''
}

  constructor(
    public flashMessagesService: FlashMessagesService,
    public router: Router,
    public messagesService: MessagesService,
    public authService: AuthService,
    public userService: UserService
  ) { }

  ngOnInit() {

   

    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.loggedInUser = auth.email;

        this.userService.getUsers().subscribe(allUsers => {
          this.allUsers = allUsers;
          console.log(this.allUsers);

          this.usersNotMe = this.allUsers.filter(user => user.username != this.loggedInUser)
          console.log(this.usersNotMe);

          

          
        });


      } else {

      }
    });

  }

  onSubmit({ value, valid }: { value: Message, valid: boolean }) {
    value.createdDate = new Date().toLocaleDateString();
    value.createdTime = new Date().toLocaleTimeString();
    value.mDeleted = "0";
    value.messageFrom = this.loggedInUser
    value.readStatus = "0"
    
    if (!valid) {
      this.flashMessagesService.show('Please fill in the required fields.', { cssClass: 'alert-danger', timeout: 4000 })
      this.router.navigate(['add-scrim']);
    } else {
      //Add new team
      this.messagesService.newMessage(value);
      console.log(value);
      this.flashMessagesService.show('Message sent.', { cssClass: 'alert-success', timeout: 4000 })
      this.router.navigate(['/messageBoard']);
    }


  }

}
