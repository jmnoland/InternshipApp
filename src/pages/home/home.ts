import { PostsComponent } from './../components/post-component';
import { ComponentFactory,ComponentRef, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core'

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

import { LoginPage } from '../login/login';
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

  @ViewChild("viewPosts", { read: ViewContainerRef }) postCont;
  componentRef: ComponentRef<any>;
  userBal;

  constructor(public navCtrl: NavController,
              private resolver: ComponentFactoryResolver,
              private storage: Storage) {

    // firebase.database().ref('requests').once('value',(reqData)=>{
    //   if(reqData.val() != null || reqData.val() != undefined){
    //     let temp = Object.keys(reqData.val());
    //     this.reqInfo = reqData.val();
    //     let tempList = [];
    //     let tempPost = [];
    //     for(let x in temp){
    //       tempList.push(temp[x]);
    //       for (let y in this.reqInfo[temp[x]]){
    //         tempPost.push(this.reqInfo[temp[x]][y]);
    //       }
    //     }
    //     this.postList = Observable.of(tempPost);
    //     this.userList = Observable.of(tempList);
    //   }
    // });

    firebase.database().ref('requests').once('value',(data)=>{
      if(data.val() != null || data.val() != undefined){
        let sortList = data.val();
        for(let x in sortList){
          let userPosts = [];
          userPosts.push(sortList[x]);
          this.reqInfo[x] = userPosts;
        }
        let keyList = Object.keys(this.reqInfo);
        this.userList = Observable.of(keyList);
      }
    });
    //fetches the balance to display on page
    storage.get('walletKey').then((key)=>{
      firebase.database().ref('users/' + key).child('balance').once('value',(userData)=>{
        this.userBal = userData.val().balance;
      }).then(()=>{
        //when the balance gets changed the new value will be displayed
        firebase.database().ref('users/' + key).child('balance').on('child_changed',(userData)=>{
          console.log(userData.val());
          this.userBal = userData.val();
        });
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

  Logout(){
    firebase.auth().signOut().then(()=>{
      console.log('Signed Out');
      this.storage.clear();
      this.navCtrl.push(LoginPage);
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }

}
