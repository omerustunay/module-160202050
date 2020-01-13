import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(private nacCtrl: NavController, public afAuth: AngularFireAuth) {
    afAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.nacCtrl.navigateRoot(['/home']);
      } else {
        this.nacCtrl.navigateRoot(['']);
      }
    });
  }

  async login(email: string, password: string) {
    await this.afAuth.auth.signInWithEmailAndPassword(email, password).then((success) => {
      console.log(success);
    }).catch((error) => {
      console.log(error);
    });
  }

  async signup(email: string, password: string) {
    await this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((success) => {
      console.log(success);
      // Here we need to get additional user details and save them in the DB under uid
      // from success.user.uid
    }).catch((error) => {
      console.log(error);
    })
  }

  async logout() {
    await this.afAuth.auth.signOut().then(() => {
      console.log("logged Out");
    }).catch((error) => {
      console.log(error);
    })
  }
}