import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import firebase from 'firebase';

@Component({
    template: `
        <ion-item id={{userData}} *ngIf="bool">
            <ion-label>{{title}}</ion-label>
            <ion-label>R {{cost}}</ion-label>
            <button ion-button color="danger" item-right id={{reqID}} (click)="Confirm()" ion-button>Offer</button>
        </ion-item>
    `
  })
export class PostsComponent{
    bool = true;
    userData;
    title;
    cost;
    reqID;
    constructor(public navCtrl: NavController,
                private storage: Storage){

    }

    Confirm(){
        //Interaction with blockchain here
        this.transaction();
    }

    transaction(){
        this.storage.get('walletKey').then((key)=>{
            let posterBal;
            let userBal;
            //fetches balance of user whose post is clicked on
            firebase.database().ref('users/' + this.userData + '/balance').child('balance').once('value',(bal)=>{
                posterBal = bal.val();
            }).then(()=>{
                //fetches balance of current user
                firebase.database().ref('users/' + key + '/balance').child('balance').once('value',(bal)=>{
                    userBal = bal.val();
                }).then(()=>{
                    if((posterBal - this.cost) >= 0){
                        firebase.database().ref('users/' + this.userData + '/balance').update({
                            balance: posterBal - this.cost
                        });
                        firebase.database().ref('users/' + key + '/balance').update({
                            balance: userBal + this.cost
                        });
                        firebase.database().ref('requests/' + this.userData + '/' + this.reqID).remove();
                        this.bool = false;
                    }
                    else{
                        console.log("not enough money");
                    }
                });
            });
        });
    }

    
}