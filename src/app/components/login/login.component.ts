import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login(this.email, this.password)
      .then((res) => {
        this.flashMessagesService.show('You are logged in', { cssClass: 'alert-success', timeout: 4000 });
        this.router.navigate(['/scrims']);
      })
      .catch((err) => {
        this.flashMessagesService.show(err.message, { cssClass: 'alert-danger', timeout: 4000 });
        this.router.navigate(['/login']);
      })


  }

  onResetClick() {
    
      this.authService.passwordReset(this.email)
        .then((res) => {
          this.flashMessagesService.show('Password reset email has been sent to your email at {{this.email}}', { cssClass: 'alert-success', timeout: 4000 });
          this.router.navigate(['/login']);
        })
        .catch((err) =>{
          this.flashMessagesService.show("Please provide a valid email address in the email field.", { cssClass: 'alert-danger', timeout: 4000 });
        this.router.navigate(['/login']);
        })
    
      
    }
  }



