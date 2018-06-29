webpackJsonp([0],{

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__create_account_create_account__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, toastCtrl, storage) {
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
    }
    LoginPage.prototype.runAuthen = function () {
        var _this = this;
        try {
            __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().signInWithEmailAndPassword(this.userEmail, this.userPass).then(function (currentUser) {
                var userKey = currentUser.user.uid;
                if (userKey) {
                    _this.storage.set('walletKey', userKey);
                }
                else {
                    // No user is signed in.
                }
                _this.navLoggedInPage();
            })
                .catch(function (error) {
                var errorMessage = error.message;
                _this.loginFail(errorMessage);
            });
            this.userPass = '';
        }
        catch (err) {
            this.loginFail(err);
        }
    };
    LoginPage.prototype.navLoggedInPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
    };
    LoginPage.prototype.navCreatePage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__create_account_create_account__["a" /* CreateAccountPage */]);
    };
    LoginPage.prototype.loginFail = function (errorMessage) {
        var toast = this.toastCtrl.create({
            message: errorMessage,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    LoginPage.prototype.CreateAccount = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__create_account_create_account__["a" /* CreateAccountPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"c:\Users\ENVY\Documents\GitHub\InternshipApp\src\pages\login\login.html"*/'<ion-header>\n\n\n\n<ion-navbar>\n\n<ion-title style="text-align: center;">\n\n                <font face="Futura">\n\n                        Stelcoin\n\n                </font>\n\n        </ion-title>\n\n</ion-navbar>\n\n        \n\n\n\n  </ion-header>\n\n  \n\n  <ion-content padding>\n\n\n\n        <img src="assets/imgs/stelcoin.png"/>  \n\n    <ion-list>\n\n            <div text-center class="row" >\n\n                    <div class="col" >\n\n        <ion-item>\n\n            <ion-label fixed>Email</ion-label>\n\n            <ion-input type="email" [(ngModel)]="userEmail"></ion-input>\n\n        </ion-item>\n\n        </div>\n\n        </div>\n\n\n\n        <div  class="row" >\n\n                <div  class="col" >\n\n        <ion-item>\n\n            <ion-label fixed>Password</ion-label>\n\n            <ion-input type="password" [(ngModel)]="userPass"></ion-input>\n\n        </ion-item>\n\n        </div>\n\n    </div>\n\n        \n\n    </ion-list>\n\n\n\n    <div centre class="row" >\n\n            <div class="col" >\n\n                    <button ion-button (click)="runAuthen()" round outline>Login</button>\n\n            </div>\n\n            \n\n        </div>\n\n    <div class="row">\n\n     \n\n            <div class="col">\n\n                    <button ion-button (click)="navCreatePage()" round outline color="stelcoinred">Create Account</button>\n\n            </div>\n\n    </div>\n\n    \n\n  </ion-content>\n\n  <ion-footer text-center>\n\n                Stelcoin*\n\n            </ion-footer>\n\n  \n\n'/*ion-inline-end:"c:\Users\ENVY\Documents\GitHub\InternshipApp\src\pages\login\login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 167:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 167;

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_http_http__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PostsComponent = /** @class */ (function () {
    function PostsComponent(navCtrl, httpProvider, storage) {
        this.navCtrl = navCtrl;
        this.httpProvider = httpProvider;
        this.storage = storage;
    }
    PostsComponent.prototype.Confirm = function () {
        //Interaction with blockchain here
        console.log("Payment to: " + this.userData);
        console.log("for: " + this.title);
        console.log("cost of: " + this.cost);
        this.transaction();
    };
    PostsComponent.prototype.transaction = function () {
        var _this = this;
        this.storage.get('walletKey').then(function (key) {
            var posterBal;
            var userBal;
            //fetches balance of user whose post is clicked on
            __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('users/' + _this.userData + '/balance').child('balance').once('value', function (bal) {
                posterBal = bal.val();
            }).then(function () {
                //fetches balance of current user
                __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('users/' + key + '/balance').child('balance').once('value', function (bal) {
                    userBal = bal.val();
                    console.log(bal.val());
                }).then(function () {
                    if ((userBal - _this.cost) >= 0) {
                        __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('users/' + _this.userData + '/balance').update({
                            balance: posterBal + _this.cost
                        });
                        __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('users/' + key + '/balance').update({
                            balance: userBal - _this.cost
                        });
                    }
                    else {
                        console.log("not enough money");
                    }
                });
            });
        });
    };
    PostsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            template: "\n    <ion-list no-lines>\n        <ion-item id={{userData}}>\n            <h1>Description: {{title}}</h1>\n        </ion-item>\n        <ion-item>\n            <h1>R {{cost}}</h1>\n        </ion-item>\n        <ion-item>\n            <button block color=\"danger\" (click)=\"Confirm()\" ion-button>Confirm</button>\n        </ion-item>\n    </ion-list>\n    "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1__providers_http_http__["a" /* HttpProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], PostsComponent);
    return PostsComponent;
}());

//# sourceMappingURL=post-component.js.map

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(170);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { Http, Response } from '@angular/http';

var HttpProvider = /** @class */ (function () {
    function HttpProvider(httpClient) {
        this.httpClient = httpClient;
        // console.log('Hello HttpProvider Provider');
        // let testerVar = this.httpClient.get('40.115.100.13:3200/gettot');
        // console.log(testerVar);
        // .catch(function(err) {
        // // handle errors here console.error(error)
        // });
        // let testerVar = this.httpClient.get('localhost:5000/cool').map((res: Response)=>{
        //   console.log(res);
        //   console.log("getreq");
        // });
        // console.log(testerVar);
        // console.log("after const");
    }
    HttpProvider.prototype.getCool = function () {
        //return this.httpClient.jsonp('localhost:5000/cool');
        this.httpClient.get('http://localhost:5000/cool').subscribe(function (data) {
            return data;
        }, function (err) {
            if (err.error instanceof Error) {
                console.log("Client-side error occured.");
            }
            else {
                console.log("Server-side error occured.");
            }
        });
        // this.httpClient.get('http://40.115.100.13:3500').subscribe(data => {
        //   return data;
        // });
        // this.httpClient.get('http://40.115.97.181:3500').subscribe(data => {
        //   return data;
        // });
        // this.httpClient.get('http://40.113.79.191:8080').subscribe(data => {
        //   return data;
        // });
    };
    // altTest(){
    //   // The Observable returned by get() is of type Observable<string>
    // // because a text response was specified.
    // // There's no need to pass a <string> type parameter to get().
    // return this.httpClient.get('40.115.100.13:3500', {responseType: 'text'})
    // .pipe(
    //   tap( // Log the result or error
    //     data => this.log(filename, data),
    //     error => this.logError(filename, error)
    //   )
    // );
    // }
    HttpProvider.prototype.test = function () {
        var testerVar = this.httpClient.get('40.115.100.13:3500/gettot').map(function (res) {
            console.log(res);
            console.log("getreq");
        });
        console.log(testerVar);
        var test2 = this.httpClient.post('40.115.100.13:3500', "/").map(function (res) {
            console.log(res);
        });
        // console.log(test2);
        this.httpClient.post('40.115.100.13:3500', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .map(function (response) {
            console.log('blank');
            console.log(response);
        });
        this.httpClient.post('40.115.100.13:3500/gettot', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .map(function (response) {
            console.log('data?');
            console.log(response);
        });
        this.httpClient.post('40.115.100.13:3500/', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .map(function (response) {
            console.log('just /');
            console.log(response);
        });
        // this.httpClient.post('https://some.domain', {headers: { 'Content-Type': 'application/json' }})
        //   .subscribe(res => {
        //     resolve(res);
        //   }, (err) => {
        //     reject(err);
        //   });
    };
    HttpProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], HttpProvider);
    return HttpProvider;
}());

//# sourceMappingURL=http.js.map

/***/ }),

/***/ 216:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 216;

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateAccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CreateAccountPage = /** @class */ (function () {
    function CreateAccountPage(navCtrl, navParams, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
    }
    CreateAccountPage.prototype.CreateAccount = function () {
        var _this = this;
        //checks if users password matches the retyped password
        if (this.userPass == this.confirmPass) {
            __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.auth().createUserWithEmailAndPassword(this.userEmail, this.userPass).catch(function (error) {
            }).then(function () {
                var userKey = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.auth().currentUser.uid;
                //saves the users walletKey locally
                _this.storage.set('walletKey', userKey);
                //saves users email under their profile then navigates to HomePage
                __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('users/' + userKey).set({
                    email: _this.userEmail,
                    balance: { balance: 0 }
                }).then(function () { return _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]); });
            });
        }
        else {
            console.log("Password doesn't match");
        }
    };
    CreateAccountPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-create-account',template:/*ion-inline-start:"c:\Users\ENVY\Documents\GitHub\InternshipApp\src\pages\create-account\create-account.html"*/'<ion-header>\n\n<<<<<<< HEAD\n\n\n\n  <ion-navbar>\n\n    <ion-title> Create Account</ion-title>\n\n  </ion-navbar>\n\n\n\n=======\n\n    <ion-title text-center>Register</ion-title>\n\n>>>>>>> d369c46ba06d86676e26895c6bf96ddfc4d09f59\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n    <ion-list>\n\n        <ion-item>\n\n            <ion-label text-center fixed>Email</ion-label>\n\n            <ion-input type="email" [(ngModel)]="userEmail"></ion-input>\n\n        </ion-item>\n\n        <ion-item>\n\n            <ion-label text-center fixed>Password</ion-label>\n\n            <ion-input type="password" [(ngModel)]="userPass"></ion-input>\n\n        </ion-item>\n\n        <ion-item>\n\n            <ion-label text-center fixed>Retype Password</ion-label>\n\n            <ion-input type="password" [(ngModel)]="confirmPass"></ion-input>\n\n        </ion-item>\n\n<<<<<<< HEAD\n\n\n\n        <button ion-button (click)="CreateAccount()" round outline>Submit</button>\n\n        <!-- <ion-item button (click)="CreateAccount()">Submit</ion-item> -->\n\n=======\n\n        <div class="row">\n\n            <div text-center class="col">\n\n                <button text-center ion-button  (click)="CreateAccount()" round>\n\n                    Submit\n\n                </button>\n\n            </div>\n\n        </div>\n\n        \n\n>>>>>>> d369c46ba06d86676e26895c6bf96ddfc4d09f59\n\n    </ion-list>\n\n</ion-content>\n\n<ion-footer text-center>\n\n    Stelcoin*\n\n</ion-footer>\n\n'/*ion-inline-end:"c:\Users\ENVY\Documents\GitHub\InternshipApp\src\pages\create-account\create-account.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], CreateAccountPage);
    return CreateAccountPage;
}());

//# sourceMappingURL=create-account.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RequestsPage = /** @class */ (function () {
    function RequestsPage(navCtrl, navParams, formBuilder, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.storage = storage;
        this.request = this.formBuilder.group({
            title: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            cost: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
        });
    }
    RequestsPage.prototype.logform = function () {
        var _this = this;
        this.storage.get('walletKey').then(function (key) {
            __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('users/' + key + '/posts').push({
                title: _this.request.value.title,
                cost: parseInt(_this.request.value.cost)
            });
            _this.request.reset();
        });
    };
    RequestsPage.prototype.addFunds = function () {
        var _this = this;
        this.storage.get('walletKey').then(function (key) {
            __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('users/' + key).child('balance').once('value', function (bal) {
                console.log(bal.val().balance);
                console.log(_this.funds);
                __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('users/' + key + '/balance').update({
                    balance: parseInt(bal.val().balance) + parseInt(_this.funds)
                });
                _this.funds = '';
            });
        });
    };
    RequestsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-requests',template:/*ion-inline-start:"c:\Users\ENVY\Documents\GitHub\InternshipApp\src\pages\requests\requests.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>requests</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n    <form [formGroup]="request">\n\n      <ion-item>\n\n          <ion-label>Title</ion-label>\n\n          <ion-input type="text" formControlName="title"></ion-input>\n\n      </ion-item>\n\n      <ion-item>\n\n          <ion-label>Cost</ion-label>\n\n          <ion-input type="number" formControlName="cost"></ion-input>\n\n      </ion-item>\n\n      <button ion-button (click)=\'logform()\' type="submit" [disabled]="!request.valid">Submit</button>\n\n    </form>\n\n\n\n    <ion-list>\n\n      <ion-item>\n\n        <ion-label>Add Funds</ion-label>\n\n        <ion-input type="number" [(ngModel)]="funds"></ion-input>\n\n      </ion-item>\n\n      <ion-item button (click)="addFunds()">Submit</ion-item>\n\n    </ion-list>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"c:\Users\ENVY\Documents\GitHub\InternshipApp\src\pages\requests\requests.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], RequestsPage);
    return RequestsPage;
}());

//# sourceMappingURL=requests.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(359);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_components_post_component__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_create_account_create_account__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_requests_requests__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_http_http__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_common_http__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_storage__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_create_account_create_account__["a" /* CreateAccountPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_requests_requests__["a" /* RequestsPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_components_post_component__["a" /* PostsComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_13__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_create_account_create_account__["a" /* CreateAccountPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_requests_requests__["a" /* RequestsPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_components_post_component__["a" /* PostsComponent */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_11__providers_http_http__["a" /* HttpProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 409:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Login', component: __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
        var config = {
            apiKey: "AIzaSyDRrUVNC1a0PZnh5EkltumvTQ1mps3ySXY",
            authDomain: "internshiptestproject-63bff.firebaseapp.com",
            databaseURL: "https://internshiptestproject-63bff.firebaseio.com",
            projectId: "internshiptestproject-63bff",
            storageBucket: "internshiptestproject-63bff.appspot.com",
            messagingSenderId: "570648793551"
        };
        __WEBPACK_IMPORTED_MODULE_6_firebase___default.a.initializeApp(config);
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"c:\Users\ENVY\Documents\GitHub\InternshipApp\src\app\app.html"*/'<ion-menu [content]="content">\n\n  <ion-header>\n\n    <ion-toolbar>\n\n      <ion-title>Menu</ion-title>\n\n    </ion-toolbar>\n\n  </ion-header>\n\n\n\n  <ion-content>\n\n    <ion-list>\n\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n        {{p.title}}\n\n      </button>\n\n    </ion-list>\n\n  </ion-content>\n\n\n\n</ion-menu>\n\n\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"c:\Users\ENVY\Documents\GitHub\InternshipApp\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_post_component__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__requests_requests__ = __webpack_require__(353);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, resolver, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.resolver = resolver;
        this.storage = storage;
        this.userInfo = {};
        __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('users').once('value', function (userData) {
            var temp = Object.keys(userData.val());
            _this.userInfo = userData.val();
            var tempList = [];
            for (var x in temp) {
                tempList.push(temp[x]);
            }
            _this.userList = __WEBPACK_IMPORTED_MODULE_5_rxjs__["Observable"].of(tempList);
        });
        //fetches the balance to display on page
        storage.get('walletKey').then(function (key) {
            __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('users/' + key).child('balance').once('value', function (userData) {
                _this.userBal = userData.val().balance;
            }).then(function () {
                //when the balance gets changed the new value will be displayed
                __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('users/' + key).child('balance').on('child_changed', function (userData) {
                    console.log(userData.val());
                    _this.userBal = userData.val();
                });
            });
        });
    }
    HomePage.prototype.navReqPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__requests_requests__["a" /* RequestsPage */]);
    };
    HomePage.prototype.giveInfo = function () {
        this.postCont.clear();
        for (var posts in this.userInfo[this.currentUser]['posts']) {
            var factory = this.resolver.resolveComponentFactory(__WEBPACK_IMPORTED_MODULE_0__components_post_component__["a" /* PostsComponent */]);
            this.componentRef = this.postCont.createComponent(factory);
            this.componentRef.instance.title = this.userInfo[this.currentUser]['posts'][posts].title;
            this.componentRef.instance.cost = this.userInfo[this.currentUser]['posts'][posts].cost;
            this.componentRef.instance.userData = this.currentUser;
        }
    };
    HomePage.prototype.Logout = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().signOut().then(function () {
            console.log('Signed Out');
            _this.storage.clear();
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
        }, function (error) {
            console.error('Sign Out Error', error);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])("viewPosts", { read: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_10" /* ViewContainerRef */] }),
        __metadata("design:type", Object)
    ], HomePage.prototype, "postCont", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"c:\Users\ENVY\Documents\GitHub\InternshipApp\src\pages\home\home.html"*/'<ion-header >\n\n    <ion-navbar>\n\n      <ion-title style="text-align: center;">\n\n        Stelcoin*\n\n      </ion-title>\n\n      <ion-buttons end>\n\n          <button ion-button icon-only (click)="openModal()">\n\n            <ion-icon name="options"></ion-icon>\n\n          </button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n  </ion-header>\n\n  \n\n  <ion-content scrollbar-y="false;" padding>\n\n      \n\n      <h3 id="stelcoin-heading1" style="color:#2E2D2D;font-weight:300;text-align:center;">\n\n        Services\n\n      </h3>\n\n    <ion-list>\n\n      <ion-item>\n\n        <ion-label style="text-align: center;">Item</ion-label>\n\n        <ion-select [(ngModel)]="currentUser" interface="popover" (ionChange)="giveInfo()">\n\n            <ion-option *ngFor="let user of userList | async">{{user}}</ion-option>\n\n        </ion-select>\n\n      </ion-item>\n\n      <ion-item>\n\n          <ion-label style="text-align: center;">Item</ion-label>\n\n      </ion-item>\n\n      <ion-item>\n\n          <ion-label style="text-align: center;">Item</ion-label>\n\n      </ion-item>\n\n      <ion-item>\n\n          <ion-label style="text-align: center;">Item</ion-label>\n\n      </ion-item>\n\n      <ion-item>\n\n          <ion-label style="text-align: center;">Item</ion-label>\n\n      </ion-item>\n\n      <ion-item>\n\n          <ion-label style="text-align: center;">Item</ion-label>\n\n      </ion-item>\n\n      <ion-item>\n\n          <ion-label style="text-align: center;">Item</ion-label>\n\n      </ion-item>\n\n      <ion-item>\n\n          <ion-label style="text-align: center;">Item</ion-label>\n\n      </ion-item>\n\n      <template #viewPosts></template>\n\n    </ion-list>\n\n    \n\n  </ion-content>\n\n  <ion-footer text-center>\n\n        Stelcoin*\n\n    </ion-footer>\n\n  \n\n  \n\n  \n\n'/*ion-inline-end:"c:\Users\ENVY\Documents\GitHub\InternshipApp\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1__angular_core__["o" /* ComponentFactoryResolver */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

},[354]);
//# sourceMappingURL=main.js.map