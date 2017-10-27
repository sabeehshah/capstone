import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
email:string;
password:string;

user: User = {
  createdDate:'',
  createdTime:'',
  username:''
}


  constructor(
    private authService:AuthService,
    private userService:UserService,
    private router:Router,
    private flashMessagesService: FlashMessagesService 
  ) { }

  ngOnInit() {
  }

  onSubmit(){

   

    this.authService.register(this.email,this.password)
    .then((res) => {
     
  
      this.flashMessagesService.show('New user registered.', { cssClass: 'alert-success', timeout:4000});
      this.user.createdDate = new Date().toLocaleDateString();
      this.user.createdTime = new Date().toLocaleTimeString();
      this.user.username = this.email;
      this.userService.newUser(this.user);
  
      this.router.navigate(['/scrims']);
    })
    .catch((err) =>{
       this.flashMessagesService.show('Please write valid email and password for registration.', { cssClass: 'alert-danger', timeout:4000});
      this.router.navigate(['/register']);
    })
  }
}
