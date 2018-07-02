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
        <button ion-button icon-only item-right color="danger" (click)="deleteReq(key)">
            <ion-icon name="close-circle"></ion-icon>
        </button>
    </ion-item>
    `
  })
export class RequestComponent{
    bool = true;
    _key: String;
    title;
    cost;
    userKey;

    @Input()
    set key(key: String){
        this._key = key;
    }
    get key() { return this._key; }

    constructor(public navCtrl: NavController,
                private storage: Storage){

        this.storage.get('walletKey').then((current)=>{
            this.userKey = current;
        });
    }

    deleteReq(reqKey){
        firebase.database().ref('requests/' + this.userKey + '/' + reqKey).remove();
        this.bool = false;
    }
}