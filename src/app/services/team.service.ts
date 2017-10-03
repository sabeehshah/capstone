import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Team } from '../models/Team';

@Injectable()
export class TeamService {
teams: FirebaseListObservable<any[]>;
team: FirebaseObjectObservable<any>;
  constructor(
    public af:AngularFireDatabase
  ) {
     this.teams = this.af.list('/teams') as FirebaseListObservable<Team[]>;
   }

    getTeams(){
    return this.teams;
  }

  newTeam(team:Team){
    this.teams.push(team);
  }

  getTeam(id:string){
    this.team = this.af.object('/teams/'+id) as FirebaseObjectObservable<Team>;
    return this.team;
    
  }

  deleteTeam(id:string){
    return this.teams.remove(id);
  }

  updateTeam(id:string, team:Team){
    return this.teams.update(id,team);
  }

}
