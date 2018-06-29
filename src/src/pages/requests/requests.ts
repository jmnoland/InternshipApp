import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-requests',
  templateUrl: 'requests.html',
})
export class RequestsPage {
  private request : FormGroup;
  funds;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private storage: Storage) {
    this.request = this.formBuilder.group({
      title: ['', Validators.required],
      cost: ['', Validators.required],
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
      firebase.database().ref('users/' + key).child('balance').once('value',(bal)=>{
        console.log(bal.val());
        console.log(this.funds);
        firebase.database().ref('users/' + key).update({
          balance: parseInt(bal.val()) + parseInt(this.funds)
        });
        this.funds = '';
      });
    });
  }

}
