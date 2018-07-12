import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
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
                private loadCtrl: LoadingController,
                private http: HttpProvider ) {
                this.http.getCool();
  }

  runAuthen(){
    const loader = this.loadCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    if (this.userEmail == 'account@accountant.com') {
      firebase.auth().signInWithEmailAndPassword(this.userEmail,this.userPass).then((currentUser)=>{
        loader.dismiss();
        this.navCtrl.push(AccountantPage);
      })
      .catch((error)=>{
        let errorMessage = error.message;
        loader.dismiss();
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
          loader.dismiss();
          this.navLoggedInPage();
        })
        .catch((error)=>{
          let errorMessage = error.message;
          loader.dismiss();
          this.loginFail(errorMessage);
        });
        this.userPass = '';
      }
      catch(err){
        loader.dismiss();
        this.loginFail(err);
      }
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
