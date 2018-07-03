import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';


@Injectable()
export class HttpProvider {

  constructor(private httpClient: HttpClient) {
  }

  getNewWallet(){
    let header = new HttpHeaders({'Access-Control-Allow-Origin': '*',
                                  'Access-Control-Allow-Methods': 'POST, GET',
                                  'Accept':'text/html; charset=utf-8',
                                  'content-type':'text/html',
                                  'responseType': 'text/html'});
    return this.httpClient.get('http://40.115.100.13:3001/newwallet', {headers: header});
  }


  getCool(){
    let header = new HttpHeaders({'Access-Control-Allow-Origin': '*',
                                  'Access-Control-Allow-Methods': 'POST, GET',
                                  'Accept':'text/html; charset=utf-8',
                                  'content-type':'text/html',
                                  'responseType': 'text/html'});
     this.httpClient.get('http://40.115.100.13:3001/', {headers:header}).subscribe(
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
