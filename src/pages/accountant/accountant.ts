import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'page-accountant',
  templateUrl: 'accountant.html',
})
export class AccountantPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http: HttpProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountantPage');
  }

  allAccounts(){
    let accounts = [];
    this.http.getAccount().subscribe(
      data => {
        console.log(data);
        for (let acc in data){
          if(data[acc].account != ""){
            accounts.push({'account': data[acc].account});
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
  balances(accountInfo){
    for(let acc in accountInfo){
      console.log(accountInfo[acc]);
      this.http.getAccountBalance(accountInfo[acc]).subscribe(
        data => {
          console.log(data);
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

}
