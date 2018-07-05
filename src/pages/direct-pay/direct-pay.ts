import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-direct-pay',
  templateUrl: 'direct-pay.html',
})
export class DirectPayPage {

  searchedUser;
  amount;
  bool = false;
  userData;
  userKey;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http: HttpProvider,
              private storage: Storage) {
    this.storage.get('walletKey').then((key)=>{
      this.userKey = key;
    });
  }

  Search(){
    firebase.database().ref('users/').once('value',(all)=>{
      let keys = Object.keys(all.val());
      let temp = all.val();
      for(let user in keys){
        if(temp[keys[user]].email == this.searchedUser){
          console.log("User Found");
          this.userData = keys[user];
          console.log(keys[user]);
          this.bool = true;
          break;
        }
      }
    });
  }

  Pay(){
    let from;
    let to;
    firebase.database().ref('users/' + this.userKey).child('address').once('value',(addFrom)=>{
        from = addFrom.val();
    }).then(()=>{
        firebase.database().ref('users/' + this.userData).child('address').once('value',(addTo)=>{
            to = addTo.val();
            let allinfo = {'from':from, 'to':to, 'amount':parseInt(this.amount)};
            this.http.transaction(allinfo).subscribe((data) => {
              console.log(data);
              this.completeT();
            });
        });
    });
  }

  completeT(){
    let posterBal;
    let userBal;
    //fetches balance of user whose post is clicked on
    firebase.database().ref('users/' + this.userData + '/balance').child('balance').once('value',(bal)=>{
        posterBal = bal.val();
    }).then(()=>{
        //fetches balance of current user
        firebase.database().ref('users/' + this.userKey + '/balance').child('balance').once('value',(bal)=>{
            userBal = bal.val();
            if((userBal - parseInt(this.amount)) >= 0){
                firebase.database().ref('users/' + this.userData + '/balance').update({
                    balance: posterBal + parseInt(this.amount)
                });
                firebase.database().ref('users/' + this.userKey + '/balance').update({
                    balance: userBal - parseInt(this.amount)
                });
            }
            else{
                console.log("not enough money");
            }
            this.searchedUser = '';
            this.amount = '';
            this.bool = false;
        });
    });
  }

}
