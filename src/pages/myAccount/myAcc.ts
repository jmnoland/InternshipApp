import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { HttpErrorResponse } from '@angular/common/http';

import { AddJobComponent } from '../components/addjob-component';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-myAcc',
    templateUrl: 'myAcc.html'
  })
  export class myAcc {

  private request : FormGroup;
  funds;
  bal;
  name;
  surname;
  jobList = [];
  userKey;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private storage: Storage,
              private modalCtrl: ModalController,
              private http: HttpProvider) {
    this.request = this.formBuilder.group({
      title: ['', Validators.required],
      cost: ['', Validators.required],
      });
      this.storage.get('walletKey').then((key)=>{
        this.userKey = key;
        firebase.database().ref('users/' + key).child('balance').once('value',(data)=>{
            this.bal = data.val().balance
        }).then(()=>{
            firebase.database().ref('users/' + key).child('balance').on('child_changed',(data)=>{
                this.bal = data.val();
            });
        });
        firebase.database().ref('users/' + key).child('name').once('value', (userName)=>{
          this.name = userName.val();
        });
        firebase.database().ref('users/' + key).child('surname').once('value', (userSur)=>{
          this.surname = userSur.val();
        });
        firebase.database().ref('users/' + this.userKey + '/jobs/').on('child_added',(jobData)=>{
          let thisKey = jobData.key;
          this.jobList.push({'key': thisKey, 'title': jobData.val().title, 'cost': jobData.val().cost});
        });
    });
  }
  logform(){
    this.storage.get('walletKey').then((key)=>{
      firebase.database().ref('users/'+ key + '/posts').push({
        title: this.request.value.title,
        cost: parseInt(this.request.value.cost)
      });
      this.request.reset();
    });
  }

  addFunds(){
    this.storage.get('walletKey').then((key)=>{
      firebase.database().ref('users/' + key).child('address').once('value',(add)=>{
        this.http.addFunds({'from':'1ESVZYMLeCnYNqrBga7pVTy3zkosB8qcqESNsr','to': add.val(),'amount': parseFloat(this.funds)}).subscribe(
          data => {
            console.log(data);
            firebase.database().ref('users/' + key).child('balance').once('value',(bal)=>{
              firebase.database().ref('users/' + key + '/balance').update({
                balance: parseInt(bal.val().balance) + parseInt(this.funds)
              });
              this.funds = '';
            });
          },
          (err: HttpErrorResponse ) => {
            console.log(err);
            if (err.error instanceof Error) {
              console.log("Client-side error occured.");
            } else {
              console.log("Server-side error occured.");
              console.log(err.error.text);
            }
            this.funds = '';
          });
      });
      
    });
  }

  submitInfo(){
    this.storage.get('walletKey').then((key)=>{
        firebase.database().ref('users/' + key).update({
          name: this.name,
          surname: this.surname
        });
    });
  }

  addJob(){
    const modal = this.modalCtrl.create(AddJobComponent, {'key': this.userKey});
    modal.present();
  }

  deleteJob(jobKey){
    firebase.database().ref('jobs/' + this.userKey + '/' + jobKey).remove();
    firebase.database().ref('users/' + this.userKey + '/jobs/' + jobKey).remove();
    for(let item = 0; item >= this.jobList.length; item++){
      if (this.jobList[item].key == jobKey){
        this.jobList.splice(item, 1);
      }
    }
  }
}