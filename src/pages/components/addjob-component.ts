import { Component } from '@angular/core';

import { NavController, ViewController, NavParams } from 'ionic-angular';

import firebase from 'firebase';

@Component({
    template: `
    <ion-header>
        <ion-toolbar>
            <ion-title>
            Add Job
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
                <ion-label floating>Title</ion-label>
                <ion-input type="text" [(ngModel)]="title"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label floating>Cost</ion-label>
                <ion-input type="number" [(ngModel)]="cost"></ion-input>
            </ion-item>
            <ion-item>
                <button ion-button (click)="Submit()">Submit</button>
            </ion-item>
        </ion-list>
    </ion-content>
    `
  })
export class AddJobComponent{
    _userData;
    title;
    cost;

    constructor(public navCtrl: NavController,
                private navParams: NavParams,
                private viewCtrl: ViewController){

    }
    dismiss(){
        this.viewCtrl.dismiss();
    }
    Submit(){
        let pathKey = firebase.database().ref('jobs/' + this.navParams.get('key')).push().key;
        firebase.database().ref('jobs/' + this.navParams.get('key') + '/' + pathKey).set({
            title: this.title,
            cost: this.cost
        });
        firebase.database().ref('users/' + this.navParams.get('key') + '/jobs/' + pathKey).set({
            title: this.title,
            cost: this.cost
        });
        this.viewCtrl.dismiss();
    }
}