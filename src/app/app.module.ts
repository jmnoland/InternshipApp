import { PostsComponent } from './../pages/components/post-component';
import { RequestComponent } from './../pages/components/request-component';
import { OfferComponent } from './../pages/components/offered-component';
import { AcceptedComponent } from './../pages/components/accepted-component';
import { AddJobComponent } from './../pages/components/addjob-component';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CreateAccountPage } from '../pages/create-account/create-account';
import { RequestsPage } from '../pages/requests/requests';
import { myAcc } from '../pages/myAccount/myAcc';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpProvider } from '../providers/http/http';

import { HttpClientModule } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CreateAccountPage,
    LoginPage,
    myAcc,
    RequestsPage,
    PostsComponent,
    RequestComponent,
    OfferComponent,
    AcceptedComponent,
    AddJobComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    myAcc,
    HomePage,
    CreateAccountPage,
    LoginPage,
    RequestsPage,
    PostsComponent,
    RequestComponent,
    OfferComponent,
    AcceptedComponent,
    AddJobComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpProvider
  ]
})
export class AppModule {}
