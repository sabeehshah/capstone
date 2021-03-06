import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Message } from '../models/Message';

@Injectable()
export class MessagesService {
  messages: FirebaseListObservable<any[]>;
  message: FirebaseObjectObservable<any>;
  constructor(
    public af:AngularFireDatabase
  ) {
    this.messages = this.af.list('/messages') as FirebaseListObservable<Message[]>;
   }

   getMessages(){
    return this.messages
  }

  newMessage(message:Message){
    this.messages.push(message);
  }

  getMessage(id:string){
    this.message = this.af.object('/messages/'+id) as FirebaseObjectObservable<Message>;
    return this.message;
    
  }

  deleteMessage(id:string){
    return this.messages.remove(id);
  }

  updateMessage(id:string, message:Message){
    return this.messages.update(id,message);
  }
 

}
