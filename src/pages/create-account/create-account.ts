import { myAcc } from './../myAccount/myAcc';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HttpErrorResponse } from '@angular/common/http';

import { Storage } from '@ionic/storage';
import firebase from 'firebase';

import { HttpProvider } from '../../providers/http/http';

@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})
export class CreateAccountPage {
  userEmail;
  userPass;
  confirmPass;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private http: HttpProvider) {
  }

  CreateAccount(){
    //checks if users password matches the retyped password
    if(this.userPass == this.confirmPass){
      firebase.auth().createUserWithEmailAndPassword(this.userEmail, this.userPass).catch(function(error) {
      }).then(()=>{
        let userKey;
        let wallet = this.http.getNewWallet();
        wallet.subscribe((walletKey)=>{
        },
        (err: HttpErrorResponse ) => {
          if (err.error instanceof Error) {
          } else {
            userKey = err.error.text;
            console.log(userKey);
          }
          //saves the users walletKey locally
          this.storage.set('walletKey', userKey);
          //saves users email under their profile then navigates to HomePage
          firebase.database().ref('users/' + userKey).set({
            email: this.userEmail,
            balance: {balance: 0}
          }).then(()=>this.navCtrl.push(myAcc));
          
        });
      });
    } else {
      console.log("Password doesn't match");
    }
  }
  
}
