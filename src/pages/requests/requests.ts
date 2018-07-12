import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ComponentFactory, ComponentRef, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core'

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { RequestComponent } from './../components/request-component';
import { AcceptedComponent } from './../components/accepted-component';

@Component({
  selector: 'page-requests',
  templateUrl: 'requests.html',
})
export class RequestsPage {
  public request : FormGroup;
  allReqs = {};
  accReqs = {};
  private userKey;

  @ViewChild("viewRequests", { read: ViewContainerRef }) reqContainer;
  @ViewChild("accRequests", { read: ViewContainerRef }) accContainer;
  componentRef: ComponentRef<any>;
  componentRefAcc: ComponentRef<any>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private storage: Storage,
              private resolver: ComponentFactoryResolver) {

    this.request = this.formBuilder.group({
      title: ['', Validators.required],
      cost: ['', Validators.required],
      cat: ['', Validators.required],
    });

    this.storage.get('walletKey').then((key)=>{
      this.userKey = key;
      let currList = [];
      let accList = [];
      firebase.database().ref('users/' + this.userKey + '/currentReqs/').on('child_added',(reqData)=>{
        currList.push([{'key': reqData.key, 'title': reqData.val().title, 
                        'cost': reqData.val().cost, 'cat': reqData.val().category}]);
        this.allReqs = currList;
        this.createComponents();
      });
      firebase.database().ref('requests/activeReqs/'+ this.userKey).on('child_added',(reqData)=>{
        firebase.database().ref('users/' + this.userKey + '/activeReqs/' + reqData.key).child('user').once('value',(name)=>{
          accList.push([{'key':reqData.key, 'title': reqData.val().title, 'cost': reqData.val().cost, 'user': name.val()}]);
          this.accReqs = accList;
          this.createAcceptedComponents();
        });
      });
    });
  }
  
  logform(){
      let pathKey = firebase.database().ref('requests/'+ this.userKey).push().key;
      firebase.database().ref('requests/currentReqs/' + this.request.value.cat + '/' + this.userKey + '/' + pathKey).set({
        title: this.request.value.title,
        cost: parseInt(this.request.value.cost)
      });
      firebase.database().ref('users/' + this.userKey + '/currentReqs/' + pathKey).set({
        title: this.request.value.title,
        category: this.request.value.cat,
        cost: parseInt(this.request.value.cost)
      });
      firebase.database().ref('requests/categories/' + pathKey).set({
        category: this.request.value.cat
      });
      this.request.reset();
  }

  createComponents(){
    this.reqContainer.clear();
    console.log(this.allReqs);
    for(let x in this.allReqs){
      const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(RequestComponent);
      this.componentRef = this.reqContainer.createComponent(factory);
      this.componentRef.instance.title = this.allReqs[x][0].title;
      this.componentRef.instance.cost = this.allReqs[x][0].cost;
      this.componentRef.instance.key = this.allReqs[x][0].key;
      this.componentRef.instance.cat = this.allReqs[x][0].cat;
    }
  }
  createAcceptedComponents(){
    this.accContainer.clear();
    for(let x in this.accReqs){
      const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(AcceptedComponent);
      this.componentRefAcc = this.accContainer.createComponent(factory);
      this.componentRefAcc.instance.title = this.accReqs[x][0].title;
      this.componentRefAcc.instance.cost = this.accReqs[x][0].cost;
      this.componentRefAcc.instance.key = this.accReqs[x][0].key;
      this.componentRefAcc.instance.userData = this.accReqs[x][0].user;
    }
  }

}
