import { PostsComponent, JobPostComponent } from './../components/post-component';
import { ComponentFactory,ComponentRef, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core'

import { Component } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

@Component({
    template: `
    <ion-list>
        <ion-item text-center>
            <ion-label>Requests</ion-label>
        </ion-item>
        <ion-item>
            <ion-label>
                <font style="font-size:20px">Wallet </font>
            </ion-label>
            <ion-label text-right>
                {{userBal}} <font style="color: primary; font-size:16px">STC</font>
            </ion-label>
        </ion-item>
        <ion-item>
            <ion-label style="text-align: center;">Categories</ion-label>
            <ion-select [(ngModel)]="currentCate" interface="popover" (ionChange)="searchCat()">
                <ion-option *ngFor="let cate of categoryList | async">{{cate}}</ion-option>
            </ion-select>
        </ion-item>
        <ion-item>
            <ion-label style="text-align: center;">Users</ion-label>
            <ion-select [(ngModel)]="currentUser" interface="popover" (ionChange)="giveInfo()">
                <ion-option *ngFor="let user of userList | async">{{user}}</ion-option>
            </ion-select>
        </ion-item>
        <template #viewPosts></template>
    </ion-list>
    `
  })
export class MarketRequestComponent{
    userList: Observable<any[]>;
    categoryList: Observable<any[]>;
    reqInfo = {};
    currentUser;
    currentCate;
    loginUser;
    nameKey = {};

    @ViewChild(Nav) nav: Nav;
    @ViewChild("viewPosts", { read: ViewContainerRef }) postCont;
    componentRef: ComponentRef<any>;
    userBal;

    constructor(public navCtrl: NavController,
                private resolver: ComponentFactoryResolver,
                private storage: Storage) {

        let catList = [];
        firebase.database().ref('requests/categories/').on('child_added',(catData)=>{
        if(catData.val() != null || catData.val() != undefined){
            let bool = false;
            for(let c in catList){
            if(catList[c] == catData.val().category){
                bool = true;
                break;
            }
            }
            if(!bool){
            catList.push(catData.val().category);
            }
        }
        this.categoryList = Observable.of(catList);
        });
        //fetches the balance to display on page
        this.storage.get('walletKey').then((key)=>{
        this.loginUser = key;
        firebase.database().ref('users/' + key).child('balance').once('value',(userData)=>{
            this.userBal = userData.val().balance;
        }).then(()=>{
            //when the balance gets changed the new value will be displayed
            firebase.database().ref('users/' + key).child('balance').on('child_changed',(userData)=>{
            this.userBal = userData.val();
            });
        });
        });

    }

    searchCat(){
        firebase.database().ref('requests/currentReqs/' + this.currentCate).once('value',(data)=>{
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
            let NameList = [];
            for(let user in keyList){
            firebase.database().ref('users/' + keyList[user]).once('value',(getNames)=>{
                NameList.push(getNames.val().name + " " + getNames.val().surname);
                this.nameKey[getNames.val().name + " " + getNames.val().surname] = keyList[user];
            });
            }
            this.userList = Observable.of(NameList);
        }
        });
    }

    giveInfo(){
        this.postCont.clear();
        for(let num in this.reqInfo[this.nameKey[this.currentUser]]){
            for(let post in this.reqInfo[this.nameKey[this.currentUser]][num]){
                const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(PostsComponent);
                this.componentRef = this.postCont.createComponent(factory);
                this.componentRef.instance.title = this.reqInfo[this.nameKey[this.currentUser]][num][post].title;
                this.componentRef.instance.cost = this.reqInfo[this.nameKey[this.currentUser]][num][post].cost;
                this.componentRef.instance.userData = this.nameKey[this.currentUser];
                this.componentRef.instance.reqID = post;
            }
        }
    }
    
}

@Component({
    template: `
    <ion-list>
        <ion-item text-center>
            <ion-label>Jobs</ion-label>
        </ion-item>
        <ion-item>
            <ion-label>
                <font style="font-size:20px">Wallet </font>
            </ion-label>
            <ion-label text-right>
                {{userBal}} <font style="color: primary; font-size:16px">STC</font>
            </ion-label>
        </ion-item>
        <ion-item>
            <ion-label style="text-align: center;">Categories</ion-label>
            <ion-select [(ngModel)]="currentCate" interface="popover" (ionChange)="searchCat()">
                <ion-option *ngFor="let cate of categoryList | async">{{cate}}</ion-option>
            </ion-select>
        </ion-item>
        <ion-item>
            <ion-label style="text-align: center;">Users</ion-label>
            <ion-select [(ngModel)]="currentUser" interface="popover" (ionChange)="giveInfo()">
                <ion-option *ngFor="let user of userList | async">{{user}}</ion-option>
            </ion-select>
        </ion-item>
        <template #viewJobs></template>
    </ion-list>
    `
  })
export class MarketJobsComponent{
    userList: Observable<any[]>;
    categoryList: Observable<any[]>;
    reqInfo = {};
    currentUser;
    currentCate;
    loginUser;
    nameKey = {};

    @ViewChild(Nav) nav: Nav;
    @ViewChild("viewJobs", { read: ViewContainerRef }) jobsCont;
    componentRef: ComponentRef<any>;
    userBal;

    constructor(public navCtrl: NavController,
                private resolver: ComponentFactoryResolver,
                private storage: Storage) {
        let catList = [];
        firebase.database().ref('jobs/categories/').on('child_added',(catData)=>{
            if(catData.val() != null || catData.val() != undefined){
                let bool = false;
                for(let c in catList){
                    if(catList[c] == catData.val().category){
                        bool = true;
                        break;
                    }
                }
                if(!bool){
                    catList.push(catData.val().category);
                }
            }
            this.categoryList = Observable.of(catList);
        });
        //fetches the balance to display on page
        this.storage.get('walletKey').then((key)=>{
            this.loginUser = key;
            firebase.database().ref('users/' + key).child('balance').once('value',(userData)=>{
                this.userBal = userData.val().balance;
            }).then(()=>{
                //when the balance gets changed the new value will be displayed
                firebase.database().ref('users/' + key).child('balance').on('child_changed',(userData)=>{
                    this.userBal = userData.val();
                });
            });
        });
    }
    searchCat(){
        firebase.database().ref('jobs/allJobs/' + this.currentCate).once('value',(data)=>{
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
                let NameList = [];
                for(let user in keyList){
                    firebase.database().ref('users/' + keyList[user]).once('value',(getNames)=>{
                        NameList.push(getNames.val().name + " " + getNames.val().surname);
                        this.nameKey[getNames.val().name + " " + getNames.val().surname] = keyList[user];
                    });
                }
                this.userList = Observable.of(NameList);
            }
        });
    }

    giveInfo(){
        this.jobsCont.clear();
        for(let num in this.reqInfo[this.nameKey[this.currentUser]]){
            for(let post in this.reqInfo[this.nameKey[this.currentUser]][num]){
                const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(JobPostComponent);
                this.componentRef = this.jobsCont.createComponent(factory);
                this.componentRef.instance.title = this.reqInfo[this.nameKey[this.currentUser]][num][post].title;
                this.componentRef.instance.cost = this.reqInfo[this.nameKey[this.currentUser]][num][post].cost;
                this.componentRef.instance.userData = this.nameKey[this.currentUser];
                this.componentRef.instance.reqID = post;
            }
        }
    }
}

