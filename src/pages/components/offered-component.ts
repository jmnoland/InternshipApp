import { Component } from '@angular/core';

import { NavController, ViewController, NavParams } from 'ionic-angular';

import firebase from 'firebase';

@Component({
    template: `
    <ion-header>
        <ion-toolbar>
            <ion-title>
            Description
            </ion-title>
            <ion-buttons start>
            <button ion-button (click)="dismiss()">
                <span ion-text color="primary" showWhen="ios">Cancel</span>
                <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
            </button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <ion-list>
            <ion-item>
                <ion-label>{{title}}</ion-label>
                <ion-label>
                    {{cost}} <font style="color:red; font-size:16px">STC</font>
                </ion-label>
            </ion-item>
            <ion-item *ngIf="bool">
                <ion-label text-center>User's</ion-label>
            </ion-item>
            <ion-item *ngFor="let user of userList">
                {{user.name}} {{user.surname}}
                <button ion-button item-right (click)="acceptUser(user.key)">Accept</button>
                <button ion-button item-right (click)="declineUser(user.key)">Decline</button>
            </ion-item>
        </ion-list>
    </ion-content>
    `
  })
export class OfferComponent{
    title;
    cost;
    userList = [];
    bool = false;

    reqKey;
    userKey;

    constructor(public navCtrl: NavController,
                private viewCtrl: ViewController,
                public navParams: NavParams ){
        this.reqKey = this.navParams.get('key');
        this.userKey = this.navParams.get('userKey');
        firebase.database().ref('users/' + this.userKey + '/currentReqs/' + this.reqKey).child('title').once('value',(title)=>{
            this.title = title.val();
        });
        firebase.database().ref('users/' + this.userKey + '/currentReqs/' + this.reqKey).child('cost').once('value',(cost)=>{
            this.cost = cost.val();
        });
        firebase.database().ref('users/' + this.userKey + '/currentReqs/' + this.reqKey + '/users/').once('value',(reqData)=>{
            if(reqData.val() != undefined){
                this.bool = true;
                let offerKeys = Object.keys(reqData.val());
                for(let x in offerKeys){
                    let dict = {};
                    dict['key'] = offerKeys[x];
                    firebase.database().ref('users/' + offerKeys[x]).child('name').once('value',(name)=>{
                        dict['name'] = name.val();
                    });
                    firebase.database().ref('users/' + offerKeys[x]).child('surname').once('value',(surname)=>{
                        dict['surname'] = surname.val();
                    });
                    this.userList.push(dict);
                }
            }
        });
    }
    acceptUser(clickKey){
        firebase.database().ref('users/' + this.userKey + '/activeReqs/' + this.reqKey).set({
            user: clickKey,
            title: this.title,
            cost: this.cost
        });
        firebase.database().ref('users/' + clickKey + '/offerReqs/' + this.userKey + '/' + this.reqKey).remove();
        firebase.database().ref('users/' + this.userKey + '/currentReqs/' + this.reqKey).child('users').once('value',(allUsers)=>{
            if(allUsers.val() != undefined){
                let temp = Object.keys(allUsers.val());
                for(let user in temp){
                    firebase.database().ref('users/' + temp[user] + '/offerReqs/' + this.userKey + '/' + this.reqKey).remove();
                }
                firebase.database().ref('users/' + this.userKey + '/currentReqs/' + this.reqKey).remove();
            }
        }).then(()=>{
            firebase.database().ref('users/' + clickKey + '/acceptedReqs/' + this.userKey + '/' + this.reqKey).set({
                title: this.title,
                cost: this.cost
            });
        });
        firebase.database().ref('requests/activeReqs/' + this.userKey + '/' + this.reqKey).set({
            title: this.title,
            cost: this.cost
        });
        firebase.database().ref('requests/currentReqs/' + this.userKey + '/' + this.reqKey).remove();
        this.dismiss();
    }
    declineUser(clickKey){
        firebase.database().ref('users/' + clickKey + '/offerReqs/' + this.userKey + '/' + this.reqKey).remove();
        firebase.database().ref('users/' + this.userKey + '/currentReqs/' + this.reqKey + '/users/' + clickKey).remove();
    }
    dismiss(){
        this.viewCtrl.dismiss();
    }
}