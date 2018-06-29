import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';

import { LoginPage } from '../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
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
}

