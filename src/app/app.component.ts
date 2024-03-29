import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { myAcc } from './../pages/myAccount/myAcc';
import { DirectPayPage } from './../pages/direct-pay/direct-pay';

import firebase from 'firebase';
import { RequestsPage } from '../pages/requests/requests';

import { Storage } from '@ionic/storage'; 

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public storage: Storage) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Request', component: RequestsPage },
      { title: 'My Account', component: myAcc },
      { title: 'Direct Pay', component: DirectPayPage},
      { title: 'Logout', component: '' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    let config = {
      apiKey: "AIzaSyDRrUVNC1a0PZnh5EkltumvTQ1mps3ySXY",
      authDomain: "internshiptestproject-63bff.firebaseapp.com",
      databaseURL: "https://internshiptestproject-63bff.firebaseio.com",
      projectId: "internshiptestproject-63bff",
      storageBucket: "internshiptestproject-63bff.appspot.com",
      messagingSenderId: "570648793551"
    };
    firebase.initializeApp(config);
  }

  openPage(page) {
    if(page.title != 'Logout'){
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      this.nav.setRoot(page.component);
    } else {
      this.logout();
    }
  }

  logout(){
    firebase.auth().signOut().then(()=>{
      console.log('Signed Out');
      this.storage.clear();
      this.nav.setRoot(LoginPage);
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }

}
