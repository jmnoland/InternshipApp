import { ComponentFactory,ComponentRef, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core'

import { Component } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';

import { myAcc } from '../myAccount/myAcc';
import { MarketRequestComponent, MarketJobsComponent } from '../components/market-components';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Nav) nav: Nav;
  @ViewChild("createRequests", { read: ViewContainerRef }) reqContainer;
  @ViewChild("createJobs", { read: ViewContainerRef }) jobContainer;
  Viewer: string = 'requests';
  componentRef: ComponentRef<any>;
  userBal;

  constructor(public navCtrl: NavController,
              private resolver: ComponentFactoryResolver) {
  }

  ngAfterViewInit() {
    let reqBtn = document.getElementById("reqBtn");
    reqBtn.addEventListener('click', ()=>{
      this.reqContainer.clear();
      this.showRequests();
    });
    let jobBtn = document.getElementById("jobBtn");
    jobBtn.addEventListener('click', ()=>{
      this.jobContainer.clear();
      this.showJobs();
    });
  }
  ionViewDidLoad(){
    this.showRequests();
  }

  navMyAccount(){
    this.navCtrl.push(myAcc);
  }

  showRequests(){
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(MarketRequestComponent);
    this.componentRef = this.reqContainer.createComponent(factory);
  }
  showJobs(){
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(MarketJobsComponent);
    this.componentRef = this.jobContainer.createComponent(factory);
  }

}
