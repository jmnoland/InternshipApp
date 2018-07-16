import { Component } from '@angular/core';

import { PopoverController, ViewController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import firebase from 'firebase';

@Component({
    template: `
        <ion-list>
            <ion-item>
                <ion-label>{{title}}</ion-label>
                <ion-label>{{cost}} <font style="color:red; font-size:16px">STC</font></ion-label>
            </ion-item>
            <ion-item>
                <ion-label floating>Offer Amount</ion-label>
                <ion-input type="number" [(ngModel)]="price"></ion-input>
            </ion-item>
            <ion-item text-center>
                <button ion-button (click)="offerReq()">Submit Offer</button>
            </ion-item>
        </ion-list>
    `
  })
export class OfferReqPopover{

    title;
    cost;
    price;

    constructor(public viewCtrl: ViewController,
                public navParams : NavParams,
                private storage: Storage,
                public popoverCtrl: PopoverController){
        this.title = this.navParams.get('title');
        this.cost = this.navParams.get('cost');
    }

    offerReq(){
        this.storage.get('walletKey').then((key)=>{
            firebase.database().ref('users/' + key + '/offerReqs/' + this.navParams.get('user') + '/' + this.navParams.get('reqID')).set({
                title: this.title,
                cost: parseInt(this.price)
            });
            firebase.database().ref('users/' + this.navParams.get('user') + '/currentReqs/' + this.navParams.get('reqID') + '/users/' + key).set({
                key: key,
                cost: parseInt(this.price)
            });
            this.viewCtrl.dismiss();
        });
    }
    
}