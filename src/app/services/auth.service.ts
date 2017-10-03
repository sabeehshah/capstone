import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';


@Injectable()
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth
  ) { }

  //Login User
  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
        err => reject(err));
    });
  }

  //Check user status
  getAuth() {
    return this.afAuth.authState.map(auth => auth);
  }

  //Logout
  logout() {
    this.afAuth.auth.signOut();
  }

  //Register
  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
        err => reject(err));
    });
  }

  //Password Reset
  passwordReset(email:string){
    return new Promise((resolve, reject) =>{
      this.afAuth.auth.sendPasswordResetEmail(email)
      .then(userData => resolve(userData),
      err => reject(err));
    });
  }
}
