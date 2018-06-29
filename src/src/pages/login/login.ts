import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import firebase from 'firebase';
import { CreateAccountPage } from '../create-account/create-account';
import { HomePage } from '../home/home';

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
                private storage: Storage) {
  }

  runAuthen(){
    try{
      firebase.auth().signInWithEmailAndPassword(this.userEmail,this.userPass).then((currentuser)=>{
        let userKey = currentuser.user.uid;
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
  navLoggedInPage(){
    this.navCtrl.push(HomePage);
  }
  navCreatePage(){
    this.navCtrl.push(CreateAccountPage);
  }
  loginFail(errorMessage){
    let toast = this.toastCtrl.create({
        message: errorMessage,
        duration: 3000,
        position: 'top'
    });
    toast.present();
  }
  CreateAccount(){
    this.navCtrl.push(CreateAccountPage);
  }
}
