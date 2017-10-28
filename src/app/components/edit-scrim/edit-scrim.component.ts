import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { ScrimService } from '../../services/scrim.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Team } from '../../models/Team';
import { Scrim } from '../../models/Scrim';
import { AuthService } from '../../services/auth.service';
import 'rxjs/add/operator/map';



@Component({
  selector: 'app-edit-scrim',
  templateUrl: './edit-scrim.component.html',
  styleUrls: ['./edit-scrim.component.css']
})
export class EditScrimComponent implements OnInit {
  id: string;
  loggedInUser: string;
  counter: number = 0;

  sTime:string;
  time = {hour: 12, minute: 30};
  sDate = new Date();


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
    createdDate:'',
    team: ''

  }

  teams: Team[];
  myTeams: Team[];
  // myTeamsU: Team[] = [];
  currentDate: string;
  currentTime: string;


  constructor(
    public teamService: TeamService,
    public router: Router,
    public route: ActivatedRoute,
    public flashMessagesService: FlashMessagesService,
    public scrimService: ScrimService,
    public authService: AuthService

  ) {



    /*this.route.params.subscribe(params => {
     this.id = params['id'];
      console.log("check");
    this.myinit();
      

    });*/

  }

  ngOnInit() {
    console.log("check");
    this.myinit();



  }


  myinit() {



      this.authService.getAuth().subscribe(auth => {
        if (auth) {
          this.loggedInUser = auth.email;
         
         
          this.teamService.getTeams().subscribe(teams => {
        this.teams = teams;
        console.log(this.teams);
        
     //this.myTeams = this.teams.filter(function (team) { return team.createdBy == this.loggedInUser; });
      this.myTeams = this.teams.filter(team => team.createdBy == this.loggedInUser)
      console.log(this.myTeams);
      
        
      });
        } else {
  
        }
      });

    /*this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.loggedInUser = auth.email;
      }
    },
      error => { console.log(error) },
      () => {
        this.teamService.getTeams().subscribe(teams => {
          this.teams = teams;
          this.myTeams = this.teams.filter(team => team.createdBy == this.loggedInUser);
          console.log(this.teams);
          console.log(this.myTeams);
        });
      });*/











    this.id = this.route.snapshot.params['id'];

    //Get Team
    this.scrimService.getScrim(this.id).subscribe(scrim => {
      this.scrim = scrim;
    });



    


  }





  onSubmit({ value, valid }: { value: Scrim, valid: boolean }) {
    value.createdDate = new Date().toLocaleDateString();
    value.region = this.scrim.region;
    value.createdBy = this.loggedInUser;
    value.acceptedBy = this.scrim.acceptedBy;
    value.acceptedDate = this.scrim.acceptedDate;
    value.acceptedStatus = this.scrim.acceptedStatus;

    this.sDate.setHours(this.time.hour);
    this.sDate.setMinutes(this.time.minute);
    this.sDate.setSeconds(new Date().getSeconds())
    this.sTime = this.sDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    value.time = this.sTime;


    if (!valid) {
      console.log(value);
      console.log(valid);
      this.flashMessagesService.show('Please fill in the required fields.', { cssClass: 'alert-danger', timeout: 4000 })
      this.router.navigate(['edit-scrim/' + this.id]);
    } else {
      //Update scrim
      this.scrimService.updateScrim(this.id, value);
      console.log(value);
      this.flashMessagesService.show('Scrim Updated.', { cssClass: 'alert-success', timeout: 4000 })
      this.router.navigate(['/scrim/' + this.id]);

    }


  }

}
