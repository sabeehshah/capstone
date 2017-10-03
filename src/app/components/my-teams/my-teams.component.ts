import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { Team } from '../../models/Team';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-my-teams',
  templateUrl: './my-teams.component.html',
  styleUrls: ['./my-teams.component.css' ,'../../../../node_modules/animate.css/animate.css']
})
export class MyTeamsComponent implements OnInit {
   teams: Team[];
  myTeams: Team[];
  loggedInUser: string;

  constructor(
     public teamService: TeamService,
    public authService: AuthService
  ) { }

  ngOnInit() {

        this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.loggedInUser = auth.email;

        this.teamService.getTeams().subscribe(teams => {
          this.teams = teams;
          console.log(this.teams);



          this.myTeams = this.teams.filter(team => team.createdBy == this.loggedInUser)
          console.log(this.myTeams);


        });



      } else {

      }
    });
  }

}
