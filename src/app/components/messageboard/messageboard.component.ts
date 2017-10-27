import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../services/messages.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Message } from '../../models/Message';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-messageboard',
  templateUrl: './messageboard.component.html',
  styleUrls: ['./messageboard.component.css']
})
export class MessageboardComponent implements OnInit {

  

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
 
  id: string;
  allMessages: Message[];
  receivedMessages: Message[];
  sentMessages: Message[];

  inboxEmpty:string;
  outboxEmpty:string;


  loggedInUser: string;

  

  constructor(
    public messagesService: MessagesService,
    public router: Router,
    public route: ActivatedRoute,
    public flashMessagesService: FlashMessagesService,
    public authService: AuthService
  ) { }

  ngOnInit() {

    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.loggedInUser = auth.email;

        

          this.messagesService.getMessages().subscribe(allMessages => {
            this.allMessages = allMessages;
            console.log(this.allMessages);

            

            this.receivedMessages = this.allMessages.filter(message => message.messageTo == this.loggedInUser);
            console.log(this.receivedMessages);
            if(this.receivedMessages.length > 0){
              this.inboxEmpty = "0";
            }else{
              this.inboxEmpty = "1";
            }

            this.sentMessages = this.allMessages.filter(message => message.messageFrom == this.loggedInUser);
            console.log(this.sentMessages);
            if(this.sentMessages.length > 0){
              this.outboxEmpty = "0";
            }else{
              this.outboxEmpty = "1";
            }
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
