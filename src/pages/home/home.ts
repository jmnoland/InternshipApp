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
  userInfo = {};
  currentUser;

  @ViewChild("viewPosts", { read: ViewContainerRef }) postCont;
  componentRef: ComponentRef<any>;
  userBal;

  constructor(public navCtrl: NavController,
              private resolver: ComponentFactoryResolver,
              private storage: Storage) {

    firebase.database().ref('users').once('value',(userData)=>{
      let temp = Object.keys(userData.val());
      this.userInfo = userData.val();
      let tempList = [];
      for(let x in temp){
        tempList.push(temp[x]);
      }
      this.userList = Observable.of(tempList);
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

    for(let posts in this.userInfo[this.currentUser]['posts']){
      const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(PostsComponent);
      this.componentRef = this.postCont.createComponent(factory);
      this.componentRef.instance.title = this.userInfo[this.currentUser]['posts'][posts].title;
      this.componentRef.instance.cost = this.userInfo[this.currentUser]['posts'][posts].cost;
      this.componentRef.instance.userData = this.currentUser;
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
