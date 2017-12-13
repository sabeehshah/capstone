import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Review } from '../models/Review';

@Injectable()
export class ReviewService {

  reviews: FirebaseListObservable<any[]>;
  review: FirebaseObjectObservable<any>;

  constructor(
    public af:AngularFireDatabase
  ) { 
    this.reviews = this.af.list('/reviews') as FirebaseListObservable<Review[]>;
  }

  getReviews(){
    return this.reviews;
  }

  newReview(review:Review){
    this.reviews.push(review);
  }

  getReview(id:string){
    this.review = this.af.object('/reviews/'+id) as FirebaseObjectObservable<Review>;
    return this.review;
  }

 /* deleteScrim(id:string){
    return this.scrims.remove(id);
  }

  updateScrim(id:string, scrim:Scrim){
    return this.scrims.update(id,scrim);
  }
*/
}
