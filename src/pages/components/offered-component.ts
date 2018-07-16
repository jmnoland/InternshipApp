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
                <ion-label>{{user.name}} {{user.surname}}</ion-label>
                <ion-label item-right>
                    {{user.cost}} <font style="color:red; font-size:16px">STC</font>
                </ion-label>
                <button ion-button item-right (click)="acceptUser(user.key, user.cost)">Accept</button>
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
    reqCat;

    constructor(public navCtrl: NavController,
                private viewCtrl: ViewController,
                public navParams: NavParams ){
        this.reqKey = this.navParams.get('key');
        this.userKey = this.navParams.get('userKey');
        this.reqCat = this.navParams.get('category');
        firebase.database().ref('users/' + this.userKey + '/currentReqs/' + this.reqKey).child('title').once('value',(title)=>{
            this.title = title.val();
        });
        firebase.database().ref('users/' + this.userKey + '/currentReqs/' + this.reqKey).child('cost').once('value',(cost)=>{
            this.cost = cost.val();
        });
        firebase.database().ref('users/' + this.userKey + '/currentReqs/' + this.reqKey + '/users/').on('child_added',(reqData)=>{
            if(reqData.val() != undefined){
                this.bool = true;
                let dict = {};
                dict['key'] = reqData.key;
                dict['cost'] = reqData.val().cost;
                firebase.database().ref('users/' + reqData.key).child('name').once('value',(name)=>{
                    dict['name'] = name.val();
                });
                firebase.database().ref('users/' + reqData.key).child('surname').once('value',(surname)=>{
                    dict['surname'] = surname.val();
                });
                this.userList.push(dict);
            }
        });
    }
    acceptUser(clickKey, price){
        firebase.database().ref('users/' + this.userKey + '/activeReqs/' + this.reqKey).set({
            user: clickKey,
            title: this.title,
            cost: price
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
                cost: price
            });
        });
        firebase.database().ref('requests/activeReqs/' + this.userKey + '/' + this.reqKey).set({
            title: this.title,
            category: this.reqCat,
            cost: price
        });
        firebase.database().ref('requests/currentReqs/' + this.reqCat + '/' + this.userKey + '/' + this.reqKey).remove();
        firebase.database().ref('requests/categories/' + this.reqKey).remove();
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