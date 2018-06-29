import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
import { LocalNotifications } from '@ionic-native/local-notifications';
//add this into the terminal if you get an error for this import
// npm install -g cordova
//ionic cordova plugin add cordova-plugin-local-notification
//npm install --save @ionic-native/local-notifications

@Component({
    template: `
    <ion-list no-lines>
        <ion-item id={{userData}}>
            <h1>Description: {{title}}</h1>
        </ion-item>
        <ion-item>
            <h1>R {{cost}}</h1>
        </ion-item>
        <ion-item>
            <button block color="danger" (click)="Confirm()" ion-button>Confirm</button>
        </ion-item>
    </ion-list>
    `
  })
export class PostsComponent{
    userData;
    title;
    cost;
    constructor(private storage: Storage){
    }

    Confirm(){
        //Interaction with blockchain here
        //for prototype, just interaction with firebaseere (fake news)
        console.log("Payment to: " + this.userData);
        console.log("for: " + this.title);
        console.log("cost of: " + this.cost);
    }
    
    /* 
    transaction(){
    //fake blockchain
    //check firebase for wallet1 balance and wallet 2 balance
    
    wallet2 = wallet2 + payment;
    wallet1 = wallet1 - payment;
    
    notify wallet 2 of payment
    }
    
    */
    transaction(){
        this.storage.get('walletKey').then((key)=>{
            let posterBal;
            let userBal;
            //fetches balance of user whose post is clicked on
            firebase.database().ref('users/' + this.userData).child('balance').once('value',function(bal){
                posterBal = bal.val();
            }).then(()=>{
                //fetches balance of current user
                firebase.database().ref('users/' + key).child('balance').once('value',function(bal){
                    userBal = bal.val();
                }).then(()=>{
                    if((userBal - this.cost) > 0){
                        firebase.database().ref('users/' + this.userData).update({
                            balance: posterBal + this.cost
                        });
                        firebase.database().ref('users/' + key).update({
                            balance: userBal - this.cost
                        });
                    }
                    else{
                        console.log("not enough money");
                    }
                });
            });
        });
    }
    
    //creating a notification of service request

    //still working on this

   


  }