import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Scrim } from '../../models/Scrim';
import { ScrimService } from '../../services/scrim.service';
import { Team } from '../../models/Team';
import { TeamService } from '../../services/team.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-add-scrim',
  templateUrl: './add-scrim.component.html',
  styleUrls: ['./add-scrim.component.css']
})
export class AddScrimComponent implements OnInit {
  loggedInUser: string;

  scrim: Scrim = {
    name: '',
    game: '',
    time: '',
    level: '',
    description: '',
    region: '',
    platform: '',
    acceptedBy: '',
    acceptedDate: '',
    acceptedStatus: '',
    createdBy: '',
    createdDate: '',
    team: '',
    acceptedByTeam: ''

  }

  teams: Team[];
  myTeams: Team[];
  currentDate: string;
  currentTime: string;


  constructor(
    public flashMessagesService: FlashMessagesService,
    public router: Router,
    public scrimService: ScrimService,
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

  onSubmit({ value, valid }: { value: Scrim, valid: boolean }) {
    value.createdDate = new Date().toLocaleDateString();
    value.createdBy = this.loggedInUser;
    value.acceptedBy = "";
    value.acceptedDate = "";
    value.acceptedStatus = "0";
    value.acceptedByTeam = "";
    if (!valid) {
      this.flashMessagesService.show('Please fill in the required fields.', { cssClass: 'alert-danger', timeout: 4000 })
      this.router.navigate(['add-scrim']);
    } else {
      //Add new team
      this.scrimService.newScrim(value);
      console.log(value);
      this.flashMessagesService.show('New Scrim added.', { cssClass: 'alert-success', timeout: 4000 })
      this.router.navigate(['/scrims']);
    }


  }

}
