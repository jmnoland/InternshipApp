import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';


@Injectable()
export class HttpProvider {

  constructor(private httpClient: HttpClient) {
  }
  getCool(){
    let header = new HttpHeaders({'Access-Control-Allow-Origin': '*',
                                  'Access-Control-Allow-Methods': 'POST, GET',
                                  'Accept':'text/html; charset=utf-8',
                                  'content-type':'text/html',
                                  'responseType': 'text/html'});
     this.httpClient.get('http://40.115.100.13:3000/Hi', {headers:header}).subscribe(
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
  // test(){
  //   let testerVar = this.httpClient.get('40.115.100.13:3500/gettot').map((res: Response)=>{
  //     console.log(res);
  //     console.log("getreq");
  //   });
  //   console.log(testerVar);
    
  //   let test2 = this.httpClient.post('40.115.100.13:3500',"/").map((res: Response)=>{
  //     console.log(res);
  //   });
  //   // console.log(test2);

  //   this.httpClient.post('40.115.100.13:3500', {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
  //   .map((response: Response) => {
  //     console.log('blank');
  //     console.log(response);
  //   });
  //   this.httpClient.post('40.115.100.13:3500/gettot', {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
  //   .map((response: Response) => {
  //     console.log('data?');
  //     console.log(response);
  //   });
  //   this.httpClient.post('40.115.100.13:3500/', {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
  //   .map((response: Response) => {
  //     console.log('just /');
  //     console.log(response);
  //   });
  // }
}
