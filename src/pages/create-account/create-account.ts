import { myAcc } from './../myAccount/myAcc';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import firebase from 'firebase';

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
              private storage: Storage) {
  }

  CreateAccount(){
    //checks if users password matches the retyped password
    if(this.userPass == this.confirmPass){
      firebase.auth().createUserWithEmailAndPassword(this.userEmail, this.userPass).catch(function(error) {
      }).then(()=>{
        let userKey = firebase.auth().currentUser.uid;

        //saves the users walletKey locally
        this.storage.set('walletKey', userKey);
        //saves users email under their profile then navigates to HomePage
        firebase.database().ref('users/' + userKey).set({
          email: this.userEmail,
          balance: {balance: 0}
        }).then(()=>this.navCtrl.push(myAcc));
      });
    } else {
      console.log("Password doesn't match");
    }
  }
  
}
