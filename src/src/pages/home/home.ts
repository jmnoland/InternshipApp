import { PostsComponent } from './../components/post-component';
import { ComponentFactory,ComponentRef, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core'
import { Component } from '@angular/core';
import { NavController, Platform, AlertController} from 'ionic-angular';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { HttpReqsProvider } from '../../providers/http-reqs/http-reqs';
import { LocalNotifications } from '@ionic-native/local-notifications';


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
  data = { title:'', description:'', date:'', time:'' };
  constructor(public navCtrl: NavController,
              private resolver: ComponentFactoryResolver,
              public localNotifications: LocalNotifications,
              public platform: Platform,
              public alertCtrl: AlertController) {
                

    firebase.database().ref('users').once('value',(userData)=>{
      let temp = Object.keys(userData.val());
      this.userInfo = userData.val();
      let tempList = [];
      for(let x in temp){
        tempList.push(temp[x]);
      }
      this.userList = Observable.of(tempList);
    });
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

  submit() {
    console.log(this.data);
    var date = new Date(this.data.date+" "+this.data.time);
    console.log(date);
    this.localNotifications.schedule({
       text: 'Delayed ILocalNotification',
       //at: date,
       led: 'FF0000',
       //sound: this.setSound(),
    });
    let alert = this.alertCtrl.create({
      title: 'Congratulation!',
      subTitle: 'Notification setup successfully at '+date,
      buttons: ['OK']
    });
    alert.present();
    this.data = { title:'', description:'', date:'', time:'' };
  }

  /*setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/sounds/Rooster.mp3' 
    } else {
      return 'file://assets/sounds/Rooster.caf'
    }
  }'*/
}
