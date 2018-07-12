import { myAcc } from './../myAccount/myAcc';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

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
              private loadCtrl: LoadingController,
              private http: HttpProvider) {
  }

  CreateAccount(){
    const loader = this.loadCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    //checks if users password matches the retyped password
    if(this.userPass == this.confirmPass){
      firebase.auth().createUserWithEmailAndPassword(this.userEmail, this.userPass).catch(function(error) {
      }).then(()=>{
        let userKey = firebase.auth().currentUser.uid;
        let wallet = this.http.getNewWallet({'id': userKey});
        wallet.subscribe((walletKey)=>{
          console.log(walletKey);
        },
        (err: HttpErrorResponse ) => {
          let add;
          if (err.error instanceof Error) {
            console.log(err.error);
          } else {
            console.log(err);
            add = err.error.text;
            //saves the users walletKey locally
            this.storage.set('walletKey', userKey);
            //saves users email under their profile then navigates to HomePage
            firebase.database().ref('users/' + userKey).set({
              address: add,
              email: this.userEmail,
              balance: {balance: 0}
            }).then(()=>{
              this.http.grantPer({'add':add}).subscribe(
                data => {
                  console.log(data);
                  loader.dismiss();
                  this.navCtrl.push(myAcc);
                },
                (err: HttpErrorResponse ) => {
                  console.log(err);
                  if (err.error instanceof Error) {
                    console.log("Client-side error occured.");
                  } else {
                    console.log("Server-side error occured.");
                    console.log(err.error.text);
                    loader.dismiss();
                    this.navCtrl.push(myAcc);
                  }
                });
              
            });
          }
          
        });
      });
    } else {
      loader.dismiss();
      console.log("Password doesn't match");
    }
  }
  
}
