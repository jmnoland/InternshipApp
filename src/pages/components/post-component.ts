import { Component } from '@angular/core';

import { HttpProvider } from '../../providers/http/http';
import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import firebase from 'firebase';

@Component({
    template: `
    <ion-list>
        <ion-item id={{userData}}>
            <ion-label>{{title}}</ion-label>
            <ion-label>R {{cost}}</ion-label>
        </ion-item>
        <ion-item>
            <button block color="danger" id={{reqID}} (click)="Confirm()" ion-button>Confirm</button>
        </ion-item>
    </ion-list>
    `
  })
export class PostsComponent{
    userData;
    title;
    cost;
    reqID;
    constructor(public navCtrl: NavController,
                private httpProvider: HttpProvider,
                private storage: Storage){

    }

    Confirm(){
        //Interaction with blockchain here
        console.log("Payment to: " + this.userData);
        console.log("for: " + this.title);
        console.log("cost of: " + this.cost);
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
                    if((userBal - this.cost) >= 0){
                        firebase.database().ref('users/' + this.userData + '/balance').update({
                            balance: posterBal + this.cost
                        });
                        firebase.database().ref('users/' + key + '/balance').update({
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

    
}