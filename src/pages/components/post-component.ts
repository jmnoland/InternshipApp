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
            <button ion-button color="danger" item-right (click)="Confirm()" ion-button>Offer</button>
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
        this.offerReq();
    }

    offerReq(){
        this.storage.get('walletKey').then((key)=>{
            firebase.database().ref('users/' + key + '/offerReqs/' + this.userData + '/' + this.reqID).set({
                title: this.title,
                cost: this.cost
            });
            firebase.database().ref('users/' + this.userData + '/currentReqs/' + this.reqID + '/users/' + key).set({
                key: key
            });
        });
    }
    
}

@Component({
    template: `
        <ion-item *ngIf="bool">
            <ion-label>{{title}}</ion-label>
            <ion-label>
                {{cost}} <font style="color:red; font-size:16px">STC</font>
            </ion-label>
            <button ion-button color="danger" item-right (click)="Confirm()" ion-button>Request</button>
        </ion-item>
    `
  })
export class JobPostComponent{
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
        this.offerReq();
    }

    offerReq(){
        this.storage.get('walletKey').then((key)=>{
            firebase.database().ref('users/' + this.userData + '/jobs/' + this.reqID + '/requests/' + key).set({
                key: key
            });
        });
    }
    
}