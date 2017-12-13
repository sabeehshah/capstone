import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Team } from '../../models/Team';
import { Review } from '../../models/Review';
import { AuthService } from '../../services/auth.service';
import { ReviewService } from '../../services/review.service';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css','../../../../node_modules/animate.css/animate.css']
})
export class TeamDetailsComponent implements OnInit {
  id: string;
  team: Team;
  loggedInUser: string;
  recordOwner: boolean;

  review:Review = {
    createdBy: '',
    createdDate: '',
    comment: ''
  }

  myReviews: Review[];
  allReviews: Review[];

  

  constructor(
    public teamService: TeamService,
    public router: Router,
    public route: ActivatedRoute,
    public flashMessagesService: FlashMessagesService,
    public authService: AuthService,
    public reviewService: ReviewService
    
  ) { }



  ngOnInit() {




    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.loggedInUser = auth.email;





        this.reviewService.getReviews().subscribe(reviews => {
          this.allReviews = reviews;
          console.log(this.allReviews); 


          
         this.myReviews = this.allReviews.filter(review => review.teamId == this.id);
          
          console.log(this.myReviews);
      });
    

        //Get ID
        this.id = this.route.snapshot.params['id'];
        console.log(this.id);
        //Get Team
        this.teamService.getTeam(this.id).subscribe(team => {

          this.team = team;
          console.log(this.team);

          //Check for record owner 
          if (this.team.createdBy != this.loggedInUser) {
            this.recordOwner = false;
          } else {
            this.recordOwner = true;
          }

          console.log(this.team.createdBy);
          console.log(this.recordOwner);
          console.log(this.loggedInUser);


          

        });

        

      } else {

      }
    })

    













  }

 
  onDeleteClick() {
    if (confirm("Are you sure to delete?")) {
      this.teamService.deleteTeam(this.id);
      this.flashMessagesService.show('Team has been deleted.', { cssClass: 'alert-success', timeout: 4000 });
      this.router.navigate(['/teams']);
    }
  }


  onSubmit({ value, valid }: { value: Review, valid: boolean }) {
    value.createdDate = new Date().toString();
    value.createdBy = this.loggedInUser;
    value.teamId = this.id;
    
    if (!valid) {
      this.flashMessagesService.show('Please fill in the required fields.', { cssClass: 'alert-danger', timeout: 4000 })
      this.router.navigate(['team/'+this.id]);
    } else {
      //Add new review
      this.reviewService.newReview(value);
      console.log(value);
      this.router.navigate(['team/'+this.id]);
      this.flashMessagesService.show('Review added.', { cssClass: 'alert-success', timeout: 4000 })
      
    } 


  }

}
