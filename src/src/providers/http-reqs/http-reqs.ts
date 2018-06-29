import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HttpReqsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpReqsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HttpReqsProvider Provider');
  }
  
  test(){
    let testerVar = this.http.get('40.115.100.13:3500/gettot').map((res: Response)=>{
      console.log(res);
      console.log("getreq");
    });
    console.log(testerVar);
    
    let test2 = this.http.post('40.115.100.13:3500',"/").map((res: Response)=>{
      console.log(res);
    });
    // console.log(test2);

    this.http.post('40.115.100.13:3500', {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
    .map((response: Response) => {
      console.log('blank');
      console.log(response);
    });
    this.http.post('40.115.100.13:3500/gettot', {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
    .map((response: Response) => {
      console.log('data?');
      console.log(response);
    });
    this.http.post('40.115.100.13:3500/', {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
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
