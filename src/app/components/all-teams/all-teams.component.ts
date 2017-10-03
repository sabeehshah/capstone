import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { Team } from '../../models/Team';

@Component({
  selector: 'app-all-teams',
  templateUrl: './all-teams.component.html',
  styleUrls: ['./all-teams.component.css' ,'../../../../node_modules/animate.css/animate.css']
})
export class AllTeamsComponent implements OnInit {
teams:Team[];
  constructor(
    public teamService:TeamService
  ) { }

  ngOnInit() {
    this.teamService.getTeams().subscribe(teams => {
      this.teams = teams;
      console.log(this.teams);
      
    });
  }

}
