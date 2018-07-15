import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HttpErrorResponse } from '@angular/common/http';
import firebase from 'firebase';

@Component({
  selector: 'page-accountant',
  templateUrl: 'accountant.html',
})
export class AccountantPage {

  allAcc = [];
  allBal = [];
  allReqs = [];
  accBool = false;
  balBool = false;
  fundBool = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http: HttpProvider) {
  }

  allAccounts(){
    this.http.getAccount().subscribe(
      data => {
        let fetchAcc = [];
        for (let acc in data){
          if(data[acc].account != "" && data[acc].account != 'n8uSiKTcvRh7Cswv7IzvlG055uv2'){
            if(data[acc].address != '18D3UdWy2frsTnGuRMAzBmDJASuA3psvwVUTC3'){
              fetchAcc.push(data[acc].account);
            }
          }
        }
        this.getAccNames(fetchAcc);
      },
      (err: HttpErrorResponse ) => {
        console.log(err);
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
          console.log(err.error.text);
        }
      });
  }

  allBalances(){
    let accounts = [];
    this.http.getAccount().subscribe(
      data => {
        for (let acc in data){
          if(data[acc].account != ""){
            if(data[acc].address != '18D3UdWy2frsTnGuRMAzBmDJASuA3psvwVUTC3'){
              accounts.push({'address': data[acc].address, 'account':data[acc].account});
            }
          }
        }
        this.balances(accounts);
      },
      (err: HttpErrorResponse ) => {
        console.log(err);
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
          console.log(err.error.text);
        }
      });
  }

  allFundReqs(){
    this.allReqs = [];
    this.fundBool = true;
    this.accBool = false;
    this.balBool = false;
    let reqList = [];
    firebase.database().ref('fundRequests').on('child_added',(reqData)=>{
      firebase.database().ref('users/' + reqData.key).child('email').once('value',(name)=>{
        firebase.database().ref('users/' + reqData.key).child('address').once('value',(addre)=>{
          reqList.push({'key': reqData.key, 'user': name.val(), 'amount': reqData.val().amount, 'address':addre.val()});
          this.allReqs.push(reqList);
          console.log(this.allReqs);
        });
      });
    });
  }


  getAccNames(theAccounts){
    this.allAcc = [];
    this.accBool = true;
    this.fundBool = false;
    this.balBool = false;
    for(let acc in theAccounts){
      if(theAccounts[acc] != 'dexter' && theAccounts[acc] != 'Z1jyZQheaWd8FpeIlfDAf92ttFn2'){
        let fireRef = firebase.database().ref('users/' + theAccounts[acc]).child('email');
        fireRef.once('value',(emails)=>{
          this.allAcc.push(emails.val());
          console.log(this.allAcc);
        });
      } else {

      }
    }
  }

  balances(accountInfo){
    this.allBal = [];
    this.fundBool = false;
    this.accBool = false;
    this.balBool = true;
    for(let acc in accountInfo){
      this.http.getAccountBalance(accountInfo[acc]).subscribe(
        data => {
          if(data['bal'].length > 0){
            this.finishBal(accountInfo[acc].account, data['bal'][0]['qty']);
          }
        },
        (err: HttpErrorResponse ) => {
          console.log(err);
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
            console.log(err.error.text);
          }
      });
    }
  }

  finishBal(key,qty){
    if(key != 'dexter'){
      firebase.database().ref('users/' + key).child('email').once('value',(id)=>{
        this.allBal.push({'email':id.val(),'val':qty});
      });
    } else {
      this.allBal.push({'email':'Distributor', 'val':qty});
    }
  }

  addFunds(key, funds, address){
    this.http.addFunds({'from':'1ESVZYMLeCnYNqrBga7pVTy3zkosB8qcqESNsr','to': address,'amount': parseFloat(funds)}).subscribe(
      data => {
        console.log(data);
        firebase.database().ref('fundRequests/' + key).remove();
        this.allFundReqs();
        firebase.database().ref('users/' + key).child('balance').once('value',(bal)=>{
          firebase.database().ref('users/' + key + '/balance').update({
            balance: parseInt(bal.val().balance) + parseInt(funds)
          });
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
      });
  }
  declineUser(key){
    firebase.database().ref('fundRequests/' + key).remove();
    this.allFundReqs();
  }

}
