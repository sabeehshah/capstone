import { Component, OnInit } from '@angular/core';
import { ScrimService } from '../../services/scrim.service';
import { Scrim } from '../../models/Scrim';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-scrims',
  templateUrl: './my-scrims.component.html',
  styleUrls: ['./my-scrims.component.css', '../../../../node_modules/animate.css/animate.css']
})
export class MyScrimsComponent implements OnInit {

  scrims: Scrim[];
  MyAcceptedScrims: Scrim[];
  MyPostedScrims: Scrim[];
  loggedInUser: string;

  constructor(
    public scrimService: ScrimService,
    public authService: AuthService
  ) { }

  ngOnInit() {



    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.loggedInUser = auth.email;

        this.scrimService.getScrims().subscribe(scrims => {
          this.scrims = scrims;
          console.log(this.scrims);



          this.MyPostedScrims = this.scrims.filter(scrim => scrim.createdBy == this.loggedInUser)
          console.log(this.MyPostedScrims);

          this.MyAcceptedScrims = this.scrims.filter(scrim => scrim.createdBy != this.loggedInUser && scrim.acceptedBy == this.loggedInUser)
          console.log(this.MyAcceptedScrims);


        });



      } else {

      }
    });


  }



}
