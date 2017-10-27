import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Message } from '../../models/Message';
import { MessagesService } from '../../services/messages.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {

  loggedInUser:string;

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
    public authService: AuthService
  ) { }

  ngOnInit() {


    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.loggedInUser = auth.email;


      } else {

      }
    });

  }

}
