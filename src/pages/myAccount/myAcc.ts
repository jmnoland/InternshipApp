import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private storage: Storage) {
    this.request = this.formBuilder.group({
      title: ['', Validators.required],
      cost: ['', Validators.required],
      });
      this.storage.get('walletKey').then((key)=>{
        firebase.database().ref('users/' + key).child('balance').once('value',(data)=>{
            this.bal = data.val().balance
        }).then(()=>{
            firebase.database().ref('users/' + key).child('balance').on('child_changed',(data)=>{
                this.bal = data.val()
            });
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
      firebase.database().ref('users/' + key).child('balance').once('value',(bal)=>{
          
        console.log(bal.val().balance);
        console.log(this.funds);
        firebase.database().ref('users/' + key + '/balance').update({
          balance: parseInt(bal.val().balance) + parseInt(this.funds)
        });
        this.funds = '';
      });
    });

  }


}