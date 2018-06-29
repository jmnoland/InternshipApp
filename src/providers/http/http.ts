import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class HttpProvider {

  constructor(private httpClient: HttpClient) {
    // console.log('Hello HttpProvider Provider');
    // let testerVar = this.httpClient.get('40.115.100.13:3200/gettot');
    // console.log(testerVar);
    // .catch(function(err) {
    // // handle errors here console.error(error)
    // });
    // let testerVar = this.httpClient.get('localhost:5000/cool').map((res: Response)=>{
    //   console.log(res);
    //   console.log("getreq");
    // });
    // console.log(testerVar);
    // console.log("after const");
  }
  getCool(){
    //return this.httpClient.jsonp('localhost:5000/cool');
     this.httpClient.get('http://localhost:5000/cool').subscribe(
      data => {
        return data;
      },
      (err: HttpErrorResponse ) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      }
     );
    // this.httpClient.get('http://40.115.100.13:3500').subscribe(data => {
    //   return data;
    // });
    // this.httpClient.get('http://40.115.97.181:3500').subscribe(data => {
    //   return data;
    // });
    // this.httpClient.get('http://40.113.79.191:8080').subscribe(data => {
    //   return data;
    // });
  }
  // altTest(){
  //   // The Observable returned by get() is of type Observable<string>
  // // because a text response was specified.
  // // There's no need to pass a <string> type parameter to get().
  // return this.httpClient.get('40.115.100.13:3500', {responseType: 'text'})
  // .pipe(
  //   tap( // Log the result or error
  //     data => this.log(filename, data),
  //     error => this.logError(filename, error)
  //   )
  // );
  // }
  test(){
    let testerVar = this.httpClient.get('40.115.100.13:3500/gettot').map((res: Response)=>{
      console.log(res);
      console.log("getreq");
    });
    console.log(testerVar);
    
    let test2 = this.httpClient.post('40.115.100.13:3500',"/").map((res: Response)=>{
      console.log(res);
    });
    // console.log(test2);

    this.httpClient.post('40.115.100.13:3500', {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
    .map((response: Response) => {
      console.log('blank');
      console.log(response);
    });
    this.httpClient.post('40.115.100.13:3500/gettot', {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
    .map((response: Response) => {
      console.log('data?');
      console.log(response);
    });
    this.httpClient.post('40.115.100.13:3500/', {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
    .map((response: Response) => {
      console.log('just /');
      console.log(response);
    });
    // this.httpClient.post('https://some.domain', {headers: { 'Content-Type': 'application/json' }})
    //   .subscribe(res => {
    //     resolve(res);
    //   }, (err) => {
    //     reject(err);
    //   });
  }
}
