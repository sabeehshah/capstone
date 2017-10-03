import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Scrim } from '../models/Scrim';

@Injectable()
export class ScrimService {
  scrims: FirebaseListObservable<any[]>;
  scrim: FirebaseObjectObservable<any>;

  constructor(
    public af:AngularFireDatabase
  ) { 
    this.scrims = this.af.list('/scrims') as FirebaseListObservable<Scrim[]>;
  }

  getScrims(){
    return this.scrims;
  }

  newScrim(scrim:Scrim){
    this.scrims.push(scrim);
  }

  getScrim(id:string){
    this.scrim = this.af.object('/scrims/'+id) as FirebaseObjectObservable<Scrim>;
    return this.scrim;
  }

  deleteScrim(id:string){
    return this.scrims.remove(id);
  }

  updateScrim(id:string, scrim:Scrim){
    return this.scrims.update(id,scrim);
  }

}


