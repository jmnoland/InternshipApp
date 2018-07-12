import { Component, Input } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { OfferComponent } from './../components/offered-component';

import { Storage } from '@ionic/storage';
import firebase from 'firebase';

@Component({
    template: `
    <ion-item *ngIf="bool" (click)="reqClick()">
        <ion-label>{{title}}</ion-label>
        <ion-label>
            {{cost}} <font style="color:red; font-size:16px">STC</font>
        </ion-label>
        <button ion-button icon-only item-right color="danger" (click)="deleteReq(key)">
            <ion-icon name="close-circle"></ion-icon>
        </button>
    </ion-item>
    `
  })
export class RequestComponent{
    bool = true;
    _key: String;
    _cat: String;
    title;
    cost;
    userKey;

    @Input()
    set key(key: String){
        this._key = key;
    }
    get key() { return this._key; }

    set cat(cat: String){
        this._cat = cat;
    }
    get cat() { return this._cat }

    constructor(public navCtrl: NavController,
                private modalCtrl: ModalController,
                private storage: Storage){

        this.storage.get('walletKey').then((current)=>{
            this.userKey = current;
        });
    }

    reqClick(){
        let data = {key: this.key,
                    userKey: this.userKey};
        const modal = this.modalCtrl.create(OfferComponent, data);
        modal.present();
    }

    deleteReq(reqKey){
        firebase.database().ref('requests/currentReqs/' + this.userKey + '/' + reqKey).remove();
        firebase.database().ref('users/' + this.userKey + '/currentReqs/' + reqKey).child('users').once('value',(allUsers)=>{
            if(allUsers.val() != undefined){
                let temp = Object.keys(allUsers.val());
                for(let user in temp){
                    firebase.database().ref('users/' + temp[user] + '/offerReqs/' + this.userKey + '/' + reqKey).remove();
                }
            }
        });
        firebase.database().ref('users/' + this.userKey + '/currentReqs/' + reqKey).remove();
        firebase.database().ref('requests/currentReqs/' + this.cat + '/' + this.userKey + '/' + reqKey).remove();
        this.bool = false;
    }
}