import { Component, Input } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import firebase from 'firebase';

@Component({
    template: `
        <ion-item *ngIf="bool">
            <ion-label>{{title}}</ion-label>
            <ion-label>
                {{cost}} <font style="color:red; font-size:16px">STC</font>
            </ion-label>
            <button ion-button color="danger" item-right (click)="Confirm()" ion-button>Complete</button>
        </ion-item>
    `
  })
export class PostsComponent{
    bool = true;
    _userData;
    _reqID;
    title;
    cost;

    @Input()
    set userData(userData: String){
        this._userData = userData;
    }
    get userData() { return this._userData; }

    set reqID(reqID: String){
        this._reqID = reqID;
    }
    get reqID() { return this._reqID; }

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
            firebase.database().ref('transactions/' + this.userData + '/paid').push({
                user: key,
                title: this.title,
                amount: this.cost
            });
            firebase.database().ref('transactions/' + key + '/recieved').push({
                user: this.userData,
                title: this.title,
                amount: this.cost
            });
        });
    }

    
}