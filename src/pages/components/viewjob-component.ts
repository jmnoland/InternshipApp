import { Component } from '@angular/core';

import { NavController, ViewController, NavParams, LoadingController } from 'ionic-angular';

import firebase from 'firebase';
import { Storage } from '@ionic/storage';

import { HttpProvider } from './../../providers/http/http';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    template: `
    <ion-header>
        <ion-toolbar>
            <ion-title>
            Job Requests
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
            <ion-item *ngIf="reqBool">
                <ion-label text-center>Requests</ion-label>
            </ion-item>
            <ion-item *ngFor="let user of userList">
                <ion-label>{{user.fName}}</ion-label>
                <button ion-button item-right (click)="acceptUser(user.uKey, user.fName)">Accept</button>
                <button ion-button item-right (click)="declineUser(user.uKey)">Decline</button>
            </ion-item>
            <ion-item *ngIf="accBool">
                <ion-label text-center>Accpeted</ion-label>
            </ion-item>
            <ion-item *ngFor="let user of acceptedList">
                <ion-label>{{user.fName}}</ion-label>
                <button ion-button item-right color="secondary" (click)="completeJob(user.uKey, user.fName, user.path)">Complete</button>
            </ion-item>
        </ion-list>
    </ion-content>
    `
  })
export class ViewJobComponent{
    _userData;
    title;
    cost;
    userList = [];
    acceptedList = [];
    curUser;
    reqBool = false;
    accBool = false;

    constructor(public navCtrl: NavController,
                private navParams: NavParams,
                private viewCtrl: ViewController,
                private storage: Storage,
                private loadCtrl: LoadingController,
                private http: HttpProvider){
        this.storage.get('walletKey').then((user)=>{
            this.curUser = user;
            firebase.database().ref('users/' + user + '/jobs/myJobs/' + this.navParams.get('key') + '/requests/').on('child_added',(jobReqs)=>{
                firebase.database().ref('users/' + jobReqs.key).child('name').once('value',(name)=>{
                    firebase.database().ref('users/' + jobReqs.key).child('surname').once('value',(surname)=>{
                        this.reqBool = true;
                        let fullName = name.val() + " " + surname.val();
                        this.userList.push({'fName': fullName, 'uKey': jobReqs.key});
                    });
                });
            });
            firebase.database().ref('users/' + user + '/jobs/myJobs/' + this.navParams.get('key') + '/accepted/').on('child_added',(accJobs)=>{
                this.accBool = true;
                this.acceptedList.push({'fName': accJobs.val().name, 'uKey': accJobs.val().user, 'path': accJobs.val().path});
            });
        });
        this.title = this.navParams.get('title');
        this.cost = this.navParams.get('cost');
    }
    dismiss(){
        this.viewCtrl.dismiss();
    }
    acceptUser(uKey, fullName){
        let pathKey =  firebase.database().ref('users/' + this.curUser + '/jobs/' + this.navParams.get('key') + '/accepted').push().key;
        firebase.database().ref('users/' + this.curUser + '/jobs/myJobs/' + this.navParams.get('key') + '/accepted/' + pathKey).set({
            name: fullName,
            path: pathKey,
            user: uKey
        });
        firebase.database().ref('users/' + uKey + '/jobs/accepted/' + this.navParams.get('key')).set({
            title: this.title,
            cost: this.cost,
            user: this.curUser
        });
        firebase.database().ref('users/' + uKey + '/jobs/requests/' + this.navParams.get('key')).remove();
        firebase.database().ref('users/' + this.curUser + '/jobs/myJobs/' + this.navParams.get('key') + '/requests/' + uKey).remove();
        this.viewCtrl.dismiss();
    }
    declineUser(uKey){
        firebase.database().ref('users/' + this.curUser + '/jobs/myJobs/' + this.navParams.get('key') + '/requests/' + uKey).remove();
        firebase.database().ref('users/' + uKey + '/jobs/requests/' + this.navParams.get('key')).remove();
    }
    completeJob(key, name, path){
        let from;
        let to;
        const loader = this.loadCtrl.create({
            content: "Please wait...",
        });
        loader.present();
        firebase.database().ref('users/' + this.curUser).child('address').once('value',(addFrom)=>{
            to = addFrom.val();
        }).then(()=>{
            firebase.database().ref('users/' + key).child('address').once('value',(addTo)=>{
                from = addTo.val();
                let allinfo = {'from':from, 'to':to, 'amount': parseInt(this.cost)};
                this.http.transaction(allinfo).subscribe((data) => {
                    loader.dismiss();
                    firebase.database().ref('users/' + this.curUser + '/jobs/myJobs/' + this.navParams.get('key') + '/accepted/' + path).remove();
                    firebase.database().ref('users/' + key + '/jobs/accepted/' + this.navParams.get('key')).remove();
                    this.updateBalance(key);
                    this.viewCtrl.dismiss();
                },
                (err: HttpErrorResponse ) => {
                  loader.dismiss();
                  console.log(err);
                  if (err.error instanceof Error) {
                    console.log("Client-side error occured.");
                  } else {
                    console.log("Server-side error occured.");
                  }
                });
            });
        });
    }

    updateBalance(userKey){
        let posterBal;
        let userBal;
        firebase.database().ref('users/' + this.curUser + '/balance').child('balance').once('value',(bal)=>{
            posterBal = bal.val();
        }).then(()=>{
            firebase.database().ref('users/' + userKey + '/balance').child('balance').once('value',(bal)=>{
                userBal = bal.val();
                if((userBal - parseInt(this.cost)) >= 0){
                    firebase.database().ref('users/' + this.curUser + '/balance').update({
                        balance: posterBal + parseInt(this.cost)
                    });
                    firebase.database().ref('users/' + userKey + '/balance').update({
                        balance: userBal - parseInt(this.cost)
                    });
                }
                else{
                    console.log("not enough money");
                }
            });
            firebase.database().ref('transactions/' + userKey + '/paid').push({
                user: this.curUser,
                title: this.title,
                amount: this.cost
            });
            firebase.database().ref('transactions/' + this.curUser + '/recieved').push({
                user: userKey,
                title: this.title,
                amount: this.cost
            });
        });
    }

}