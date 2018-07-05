import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';


@Injectable()
export class HttpProvider {
  header = new HttpHeaders({'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'POST, GET',
                            'Accept':'application/json',
                            'content-type':'application/json',
                            'responseType': 'application/json'});

  constructor(private httpClient: HttpClient) {
  }

  getNewWallet(userInfo){
    return this.httpClient.post('http://40.115.100.13:3001/newwallet', userInfo, {headers: this.header});
  }

  getAccount(){
    return this.httpClient.get('http://40.115.100.13:3001/addressinfo', {headers: this.header});
  }

  getAccountBalance(acc){
    return this.httpClient.post('http://40.115.100.13:3001/balance', acc, {headers: this.header});
  }

  addFunds(allinfo){
    return this.httpClient.post('http://40.115.100.13:3001/addFunds', allinfo, {headers: this.header});
  }

  transaction(allinfo){
    return this.httpClient.post('http://40.115.100.13:3001/addFunds', allinfo, {headers: this.header});
  }

  getCool(){
     this.httpClient.get('http://40.115.100.13:3001/netinfo', {headers: this.header}).subscribe(
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
