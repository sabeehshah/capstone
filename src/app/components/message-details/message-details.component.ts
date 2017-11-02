import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../services/messages.service';
import { Message } from '../../models/Message';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.css','../../../../node_modules/animate.css/animate.css']
})
export class MessageDetailsComponent implements OnInit {

  id:string;
  loggedInUser:string;
  recordOwner: boolean;
 

  message:Message;

  


  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public messagesService: MessagesService,
    public flashMessagesService: FlashMessagesService,
    public authService: AuthService
  ) { }

  ngOnInit() {


    
   

    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.loggedInUser = auth.email;

        //Get ID
        this.id = this.route.snapshot.params['id'];
        
        console.log(this.id);
        
        this.messagesService.getMessage(this.id).subscribe(message => {
          this.message = message;
          console.log(this.message);

          


        });

        

      } else {

      }


      
    });

   

  }


  onDeleteClick() {
    if (confirm("Are you sure to delete?")) {
      this.messagesService.deleteMessage(this.id);
      this.flashMessagesService.show('Message has been deleted.', { cssClass: 'alert-success', timeout: 4000 });
      this.router.navigate(['/messageBoard']);
    }
  }

  MarkasRead(value) {
    var messageId = value

    this.messagesService.getMessage(messageId).subscribe(message => {
      this.message = message;
      console.log(this.message);

      this.message.readStatus = "1";

      this.messagesService.updateMessage(this.message.$key,this.message);

      
    
  });

  this.flashMessagesService.show('Messaged marked as read.', {cssClass:'alert-success',timeout:2000})
  
}

}
