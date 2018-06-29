import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
// import { HttpClient } from '@angular/common/http';
import { HttpProvider } from '../../providers/http/http';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  cool: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpProv: HttpProvider) {
    // this.cool = this.httpProv.getCool();
    // console.log(this.cool);
  }

}
