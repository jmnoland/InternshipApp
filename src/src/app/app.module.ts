import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { PostsComponent } from './../pages/components/post-component';
import { LoginPage } from '../pages/login/login';
import { CreateAccountPage } from '../pages/create-account/create-account';
import { RequestsPage } from '../pages/requests/requests';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpReqsProvider } from '../providers/http-reqs/http-reqs';


import { LocalNotifications } from '@ionic-native/local-notifications';
//add this into the terminal if you get an error for this import
// npm install -g cordova
//ionic cordova plugin add cordova-plugin-local-notification
//npm install --save @ionic-native/local-notification

import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CreateAccountPage,
    RequestsPage,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CreateAccountPage,
    RequestsPage,
    PostsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalNotifications
  ]
})
export class AppModule {}
