import { Component, OnInit } from '@angular/core';
import {FlashMessagesService } from 'angular2-flash-messages';
import { Team } from '../../models/Team';
import { TeamService} from '../../services/team.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {

  loggedInUser:string;

  team:Team = {
    name:'',
    createdBy:'',
    createdDate:'', 
    description:'',
    game:'',
   
    p1PSN:'',
    p1Xbox:'',
    p1Name:'',
    p1Twitter:'',
    
    p2PSN:'',
    p2Xbox:'',
    p2Name:'',
    p2Twitter:'',
   
    p3PSN:'',
    p3Xbox:'',
    p3Name:'',
    p3Twitter:'',
    
    p4PSN:'',
    p4Xbox:'',
    p4Name:'',
    p4Twitter:'',
    
    p5PSN:'',
    p5Xbox:'',
    p5Name:'',
    p5Twitter:'',
   
    p6PSN:'',
    p6Xbox:'',
    p6Name:'',
    p6Twitter:'',
    region:''
  }
  constructor(
    public flashMessagesService:FlashMessagesService,
    public router:Router,
    public teamService:TeamService,
    public authService:AuthService

  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth=>{
      if(auth){
        this.loggedInUser = auth.email;
      }else{

      }
    });
  }

  onSubmit({value,valid}:{value:Team,valid:boolean}){
    value.createdDate = new Date().toLocaleDateString();
    value.createdBy = this.loggedInUser;
    if(!valid){
      this.flashMessagesService.show('Please fill in the required fields.', {cssClass:'alert-danger',timeout:4000})
      this.router.navigate(['add-team']);
    }else{
      //Add new team
      this.teamService.newTeam(value);
      console.log(value); 
      this.flashMessagesService.show('New team added.', {cssClass:'alert-success',timeout:4000})
      this.router.navigate(['/teams']);
    }
    

  }

}
