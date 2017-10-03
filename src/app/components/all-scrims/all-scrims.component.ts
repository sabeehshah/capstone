import { Component, OnInit } from '@angular/core';
import { ScrimService } from '../../services/scrim.service';
import { Scrim } from '../../models/Scrim';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-all-scrims',
  templateUrl: './all-scrims.component.html',
  styleUrls: ['./all-scrims.component.css','../../../../node_modules/animate.css/animate.css']
})
export class AllScrimsComponent implements OnInit {
  scrims: Scrim[];
  notMyScrims: Scrim[];
  loggedInUser: string;
  currentDate:Date = new Date();
  createdDateU:Date;

  

  

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



          this.notMyScrims = this.scrims.filter(scrim => scrim.createdBy != this.loggedInUser)
          console.log(this.notMyScrims);

          
        });



      } else {

      }
    });







  }

  public toInt(num: string) {
        return +num;
    }

    

}
