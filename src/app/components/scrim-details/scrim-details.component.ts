import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { ScrimService } from '../../services/scrim.service';
import { MessagesService } from '../../services/messages.service';
import { Message } from '../../models/Message';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Team } from '../../models/Team';
import { Scrim } from '../../models/Scrim';







import { AuthService } from '../../services/auth.service';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-scrim-details',
  templateUrl: './scrim-details.component.html',
  styleUrls: ['./scrim-details.component.css' ,'../../../../node_modules/animate.css/animate.css']
})
export class ScrimDetailsComponent implements OnInit {

  id: string;
  team: Team;
  scrim: Scrim;
  loggedInUser: string;
  recordOwner: boolean;
  teams: Team[];
  myTeams: Team[];

  Smessage:Message;


 

  constructor(
    public teamService: TeamService,
    public scrimService: ScrimService,
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
        //console.log(this.id);
        //Get Scrim
        this.scrimService.getScrim(this.id).subscribe(scrim => {
          this.scrim = scrim;
         // console.log(this.scrim);

          //Check for record owner 
          if (this.scrim.createdBy == this.loggedInUser) {
            this.recordOwner = true;
          } else {
            this.recordOwner = false;
          }

        //  console.log(this.scrim.createdBy);
         // console.log(this.recordOwner);
         // console.log(this.loggedInUser);

          this.teamService.getTeam(this.scrim.team).subscribe(team => {

            this.team = team;
           // console.log(this.team);
          });

        });

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


  /*sendEmail(){
    var email = require("../../../../node_modules/emailjs/email");
    var server = email.server.connect({
      user: "sabeeh.shah@hotmail.com",
      password:"sabeeh21,",
      host:"smtp-mail.outlook.com",
      ssl: true
    });

    server.send({
      text:    "i hope this works", 
      from:    "you <sabeeh.shah@hotmail.com>", 
      to:      "sabeeh<sabeeh.shah@hotmail.com",
      subject: "testing emailjs"
   }, function(err, message) { console.log(err || message); });


  }*/

  


  









  

  onAcceptClick() {

    

    if(this.scrim.acceptedByTeam != ""){

      if (confirm("Are you sure to accept?")) {
      this.scrim.acceptedBy = this.loggedInUser;
      this.scrim.acceptedDate = new Date().toLocaleDateString();
      this.scrim.acceptedStatus = "1";
      

      var AcceptMessage: Message = {
        createdDate: new Date().toLocaleDateString(),
        createdTime:new Date().toLocaleTimeString(),
        messageTo:this.scrim.createdBy,
        messageFrom:'admin@teamscrim.com',
        subject:'Accepted Scrim',
        message:'Your scrim has been accepted by a user. ',
        readStatus:'0',
        mDeleted:'0'
    }
 
      console.log(AcceptMessage)
      this.messagesService.newMessage(AcceptMessage)

      this.scrimService.updateScrim(this.id,this.scrim);
      




      this.flashMessagesService.show('Scrim has been accepted.', { cssClass: 'alert-success', timeout: 4000 });
      
      

      this.router.navigate(['/scrims']);
    }

    }else{
      this.flashMessagesService.show('Please choose a team when accepting a scrim.', { cssClass: 'alert-danger', timeout: 4000 });
      
    }

    
  }

   onRepostClick() {
    if (confirm("Are you sure to re-post??")) {
      this.scrim.acceptedBy = "";
      this.scrim.acceptedDate = "";
      this.scrim.acceptedStatus = "0";
      this.scrim.createdBy = this.loggedInUser;
      this.scrim.createdDate = new Date().toLocaleDateString();

      this.scrimService.updateScrim(this.id,this.scrim);
      this.flashMessagesService.show('Scrim has been updated.', { cssClass: 'alert-success', timeout: 4000 });
      this.router.navigate(['/scrims']);
    }
  }

  onDeleteClick() {
    if (confirm("Are you sure to delete?")) {
      this.scrimService.deleteScrim(this.id);
      this.flashMessagesService.show('Scrim has been deleted.', { cssClass: 'alert-success', timeout: 4000 });
      this.router.navigate(['/myscrims']);
    }
  }

  

}



