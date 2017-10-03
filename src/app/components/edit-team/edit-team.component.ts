import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Team } from '../../models/Team';
import { AuthService } from '../../services/auth.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-edit-team', 
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {
  id: string;
  loggedInUser:string;
  team: Team = {
    name: '',
    createdBy: '',
    createdDate: '',
    description: '',
    game: '',
    p1GamerTag: '',
    p1Name: '',
    p1Twitter: '',
    p2GamerTag: '',
    p2Name: '',
    p2Twitter: '',
    p3GamerTag: '',
    p3Name: '',
    p3Twitter: '',
    p4GamerTag: '',
    p4Name: '',
    p4Twitter: '',
    p5GamerTag: '',
    p5Name: '',
    p5Twitter: '',
    p6GamerTag: '',
    p6Name: '',
    p6Twitter: '',
    region: ''
  }


  constructor(
    public teamService: TeamService,
    public router: Router,
    public route: ActivatedRoute,
    public flashMessagesService: FlashMessagesService,
    public authService: AuthService
  ) { }

  ngOnInit() {

    this.authService.getAuth().subscribe(auth=>{
      if(auth){
        this.loggedInUser = auth.email;
      }else{

      }
    });

    this.id = this.route.snapshot.params['id'];

    //Get Team
    this.teamService.getTeam(this.id).subscribe(team => {
      this.team = team;
    });

  }

  
  onSubmit({value,valid}:{value:Team,valid:boolean}){
    value.createdDate = new Date().toLocaleDateString();
    value.region = "";
    value.createdBy =this.loggedInUser;
    if(!valid){
        console.log(value); 
        console.log(valid); 
      this.flashMessagesService.show('Please fill in the required fields.', {cssClass:'alert-danger',timeout:4000})
      this.router.navigate(['edit-team/'+this.id]);
    }else{
      //Update team
      this.teamService.updateTeam(this.id,value);
      console.log(value); 
      this.flashMessagesService.show('Team Updated.', {cssClass:'alert-success',timeout:4000})
      this.router.navigate(['/team/'+this.id]);
    }
    

  }

}
