import { PostsComponent } from './../components/post-component';
import { ComponentFactory,ComponentRef, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core'

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

import { RequestsPage } from '../requests/requests';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userList: Observable<any[]>;
  postList: Observable<any[]>;
  reqInfo = {};
  currentUser;
  loginUser;

  @ViewChild("viewPosts", { read: ViewContainerRef }) postCont;
  componentRef: ComponentRef<any>;
  userBal;

  constructor(public navCtrl: NavController,
              private resolver: ComponentFactoryResolver,
              private storage: Storage) {

    //fetches the balance to display on page
    storage.get('walletKey').then((key)=>{
      this.loginUser = key;
      firebase.database().ref('users/' + key).child('balance').once('value',(userData)=>{
        this.userBal = userData.val().balance;
      }).then(()=>{
        //when the balance gets changed the new value will be displayed
        firebase.database().ref('users/' + key).child('balance').on('child_changed',(userData)=>{
          this.userBal = userData.val();
        });
      });
    }).then(()=>{
      firebase.database().ref('requests').once('value',(data)=>{
        if(data.val() != null || data.val() != undefined){
          let sortList = data.val();
          for(let x in sortList){
            if(this.loginUser == x){
              continue;
            }
            let userPosts = [];
            userPosts.push(sortList[x]);
            this.reqInfo[x] = userPosts;
          }
          let keyList = Object.keys(this.reqInfo);
          this.userList = Observable.of(keyList);
        }
      });
    });
    
  }

  navReqPage(){
    this.navCtrl.push(RequestsPage);
  }

  giveInfo(){
    this.postCont.clear();
    for(let num in this.reqInfo[this.currentUser]){
      for(let post in this.reqInfo[this.currentUser][num]){
        const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(PostsComponent);
        this.componentRef = this.postCont.createComponent(factory);
        this.componentRef.instance.title = this.reqInfo[this.currentUser][num][post].title;
        this.componentRef.instance.cost = this.reqInfo[this.currentUser][num][post].cost;
        this.componentRef.instance.userData = this.currentUser;
        this.componentRef.instance.reqID = post;
      }
    }
  }

}
