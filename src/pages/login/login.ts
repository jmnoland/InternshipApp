import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import firebase from 'firebase';
import { CreateAccountPage } from '../create-account/create-account';
import { HomePage } from '../home/home';

import { AccountantPage } from './../accountant/accountant';

import { HttpProvider } from '../../providers/http/http';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
    userEmail;
    userPass;

    constructor(public navCtrl: NavController,
                public toastCtrl: ToastController,
                private storage: Storage,
                private http: HttpProvider ) {
                this.http.getCool();
  }

  runAuthen(){
    if (this.userEmail == 'account@accountant.com') {
      firebase.auth().signInWithEmailAndPassword(this.userEmail,this.userPass).then((currentUser)=>{
        this.navCtrl.setRoot(AccountantPage);
      })
      .catch((error)=>{
        let errorMessage = error.message;
        this.loginFail(errorMessage);
      });
      this.userPass = '';
    } else {
      try{
        firebase.auth().signInWithEmailAndPassword(this.userEmail,this.userPass).then((currentUser)=>{
          let userKey = currentUser.user.uid;
          if (userKey) {
            this.storage.set('walletKey',userKey);
          } else {
            // No user is signed in.
          }
          this.navLoggedInPage();
        })
        .catch((error)=>{
          let errorMessage = error.message;
          this.loginFail(errorMessage);
        });
        this.userPass = '';
      }
      catch(err){
        this.loginFail(err);
      }
    }
  }
  navLoggedInPage(){
    this.navCtrl.setRoot(HomePage);
  }
  navCreatePage(){
    this.navCtrl.setRoot(CreateAccountPage);
  }
  loginFail(errorMessage){
    let toast = this.toastCtrl.create({
        message: errorMessage,
        duration: 3000,
        position: 'top'
    });
    toast.present();
  }
}
