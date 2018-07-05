import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HttpProvider } from './../../providers/http/http';

import { Storage } from '@ionic/storage';
import firebase from 'firebase';

@Component({
    template: `
    <ion-item *ngIf="bool">
        <ion-label>{{title}}</ion-label>
        <ion-label>
            {{cost}} <font style="color:red; font-size:16px">STC</font>
        </ion-label>
        <button ion-button icon-only item-right color="secondary" (click)="confirmPay(key)">
            <ion-icon name="checkmark-circle"></ion-icon>
        </button>
    </ion-item>
    `
  })
export class AcceptedComponent{
    bool = true;
    _key: String;
    _userData: String;
    title;
    cost;
    userKey;

    @Input()
    set key(key: String){
        this._key = key;
    }
    get key() { return this._key; }

    set userData(userData: String){
        this._userData = userData;
    }
    get userData() { return this._userData }

    constructor(public navCtrl: NavController,
                private storage: Storage,
                private http: HttpProvider){

        this.storage.get('walletKey').then((current)=>{
            this.userKey = current;
        });
    }

    confirmPay(reqKey){
        let from;
        let to;
        firebase.database().ref('users/' + this.userKey).child('address').once('value',(addFrom)=>{
            from = addFrom.val();
        }).then(()=>{
            firebase.database().ref('users/' + this.userData).child('address').once('value',(addTo)=>{
                to = addTo.val();
                let allinfo = {'from':from, 'to':to, 'amount':this.cost};
                this.http.transaction(allinfo).subscribe((data) => {
                    console.log(data);
                    this.completeT(reqKey);
                });
            });
        });
    }

    completeT(reqKey){
        let posterBal;
        let userBal;
        //fetches balance of user whose post is clicked on
        firebase.database().ref('users/' + this.userData + '/balance').child('balance').once('value',(bal)=>{
            posterBal = bal.val();
        }).then(()=>{
            //fetches balance of current user
            firebase.database().ref('users/' + this.userKey + '/balance').child('balance').once('value',(bal)=>{
                userBal = bal.val();
                if((userBal - this.cost) >= 0){
                    firebase.database().ref('users/' + this.userData + '/balance').update({
                        balance: posterBal + this.cost
                    });
                    firebase.database().ref('users/' + this.userKey + '/balance').update({
                        balance: userBal - this.cost
                    });
                    firebase.database().ref('requests/activeReqs/' + this.userKey + '/' + reqKey).remove();
                    firebase.database().ref('users/' + this.userData + '/acceptedReqs/' + this.userKey + '/' + reqKey).remove();
                    firebase.database().ref('users/' + this.userKey + '/activeReqs/' + reqKey).remove();
                    this.bool = false;
                }
                else{
                    console.log("not enough money");
                }
            });
            firebase.database().ref('transactions/' + this.userKey + '/paid').push({
                user: this.userData,
                title: this.title,
                amount: this.cost
            });
            firebase.database().ref('transactions/' + this.userData + '/recieved').push({
                user: this.userKey,
                title: this.title,
                amount: this.cost
            });
        });
    }

}