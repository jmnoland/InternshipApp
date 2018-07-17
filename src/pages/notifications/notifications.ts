import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ComponentFactory, ComponentRef, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core'

import firebase from 'firebase';

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  @ViewChild('notifi',{read:  ViewContainerRef }) notifContainer;
  componentRef: ComponentRef<any>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private resolver: ComponentFactoryResolver) {
  }
  ionViewDidLoad() {
    this.storage.get('walletKey').then((key)=>{
      firebase.database().ref('users/' + key + '/notifications/').on('child_added',(notifData)=>{
        console.log(notifData.val());
      });
    });
  }
  displayNotif(){
    
  }

}
