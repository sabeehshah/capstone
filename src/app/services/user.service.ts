import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable()
export class UserService {
  users: FirebaseListObservable<any[]>;
  user: FirebaseObjectObservable<any>;

  constructor
  (
    public af:AngularFireDatabase
  ) { 
    this.users = this.af.list('/users') as FirebaseListObservable<Notification[]>;
  }

  getUsers(){
    return this.users
  }

  newUser(user:User){
    this.users.push(user);
  }

  getUser(id:string){
    this.user = this.af.object('/user/'+id) as FirebaseObjectObservable<Notification>;
    return this.user;
    
  }

  deleteUser(id:string){
    return this.users.remove(id);
  }

 
  updateUser(id:string, user:User){
    return this.users.update(id,user);
  }

}
