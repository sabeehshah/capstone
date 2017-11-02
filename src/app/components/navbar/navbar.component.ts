import { Component, OnInit } from '@angular/core';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessagesService } from '../../services/messages.service';
import { Message } from '../../models/Message';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
isLoggedIn:boolean;
loggedInUser:string;
messagesCount:string;
messages:Message[];
myMessages:Message[];

  constructor(
    private authService:AuthService,
    public messegesService: MessagesService,
    private router:Router,
    private flashMessagesService:FlashMessagesService

  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if(auth){
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;

        this.messegesService.getMessages().subscribe(messages => {
          this.messages = messages;
          console.log(this.messages);



          this.myMessages = this.messages.filter(message => message.messageTo == this.loggedInUser
             && message.readStatus == "0");

          console.log(this.myMessages);

          if(this.myMessages.length > 0){
            this.messagesCount = this.myMessages.length.toString();
            
          }else{
            this.messagesCount = "0";
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
