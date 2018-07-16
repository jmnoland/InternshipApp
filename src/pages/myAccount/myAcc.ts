import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { HttpErrorResponse } from '@angular/common/http';

import { AddJobComponent } from '../components/addjob-component';
import { ViewJobComponent } from '../components/viewjob-component';

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
  myListReq = [];
  myListAcc = [];
  userKey;
  ReqBool = false;
  jobBool = false;

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
        //lists Jobs the user has created
        firebase.database().ref('users/' + this.userKey + '/jobs/myJobs/').on('child_added',(jobData)=>{
          this.jobBool = true;
          this.jobList.push({'key': jobData.key, 'title': jobData.val().title, 'cost': jobData.val().cost, 'cat': jobData.val().category});
        });
        //lists the jobs the user has made requests to
        firebase.database().ref('users/' + this.userKey + '/jobs/requests/').on('child_added',(data)=>{
          this.ReqBool = true;
          this.myListReq.push({'title': data.val().title, 'cost': data.val().cost, 'key': data.key, 'user': data.val().user});
        });
        //lists the jobs that have been accepted
        firebase.database().ref('users/' + this.userKey + '/jobs/accepted/').on('child_added',(aData)=>{
          this.ReqBool = true;
          this.myListAcc.push({'title': aData.val().title, 'cost': aData.val().cost, 'key': aData.key});
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
      firebase.database().ref('fundRequests/' + key).set({
        amount: parseInt(this.funds)
      });
      this.funds = '';
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

  viewJobReqs(jobKey, jobTitle, jobCost){
    const modal = this.modalCtrl.create(ViewJobComponent, {'key': jobKey, 'title': jobTitle, 'cost': jobCost});
    modal.present();
  }

  deleteJob(jobKey, cat){
    firebase.database().ref('jobs/allJobs/' + cat + '/' + this.userKey + '/' + jobKey).remove();
    firebase.database().ref('users/' + this.userKey + '/jobs/myJobs/' + jobKey).remove();
    for(let item = 0; item < this.jobList.length; item++){
      if (this.jobList[item].key == jobKey){
        this.jobList.splice(item, 1);
      }
    }
  }
  delJobReq(jobKey, user){
    firebase.database().ref('users/' + this.userKey + '/jobs/requests/' + jobKey).remove();
    firebase.database().ref('users/' + user + '/jobs/myJobs/' + jobKey + '/requests/' + this.userKey).remove();
  }

}