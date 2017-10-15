import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Notification } from '../models/Notification';

@Injectable()
export class NotificationService {
  notifications: FirebaseListObservable<any[]>;
  notification: FirebaseObjectObservable<any>;

  constructor(
    public af:AngularFireDatabase
  ) { 
    this.notifications = this.af.list('/notifications') as FirebaseListObservable<Notification[]>;
  }

  getNotifications(){
    return this.notifications
  }

  newNotification(notification:Notification){
    this.notifications.push(notification);
  }

  getNotification(id:string){
    this.notification = this.af.object('/notifications/'+id) as FirebaseObjectObservable<Notification>;
    return this.notification;
    
  }

  deleteNotification(id:string){
    return this.notifications.remove(id);
  }

  updateNotification(id:string, notification:Notification){
    return this.notifications.update(id,notification);
  }
}
