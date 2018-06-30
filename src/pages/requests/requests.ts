import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ComponentFactory,ComponentRef, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core'

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { RequestComponent } from './../components/request-component';

@Component({
  selector: 'page-requests',
  templateUrl: 'requests.html',
})
export class RequestsPage {
  public request : FormGroup;
  allReqs = {};
  private userKey;

  @ViewChild("viewRequests", { read: ViewContainerRef }) reqContainer;
  componentRef: ComponentRef<any>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private storage: Storage,
              private resolver: ComponentFactoryResolver) {
    this.request = this.formBuilder.group({
      title: ['', Validators.required],
      cost: ['', Validators.required],
    });

    this.storage.get('walletKey').then((key)=>{
      this.userKey = key;
      let tempList = [];
      firebase.database().ref('requests/'+ this.userKey).on('child_added',(reqData)=>{
        tempList.push([{'key':reqData.key, 'title': reqData.val().title, 'cost': reqData.val().cost}]);
        this.allReqs = tempList;
        this.createComponents();
      });
    });
  }
  
  logform(){
      firebase.database().ref('requests/'+ this.userKey).push({
        title: this.request.value.title,
        cost: parseInt(this.request.value.cost)
      });
      this.request.reset();
  }

  createComponents(){
    this.reqContainer.clear();
    for(let x in this.allReqs){
      const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(RequestComponent);
      this.componentRef = this.reqContainer.createComponent(factory);
      this.componentRef.instance.title = this.allReqs[x][0].title;
      this.componentRef.instance.cost = this.allReqs[x][0].cost;
      this.componentRef.instance.key = this.allReqs[x][0].key;
    }
  }

}
