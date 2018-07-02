webpackJsonp([0],{

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_post_component__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__requests_requests__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__myAccount_myAcc__ = __webpack_require__(88);
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
        this.reqInfo = {};
        this.nameKey = {};
        //fetches the balance to display on page
        storage.get('walletKey').then(function (key) {
            _this.loginUser = key;
            __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('users/' + key).child('balance').once('value', function (userData) {
                _this.userBal = userData.val().balance;
            }).then(function () {
                //when the balance gets changed the new value will be displayed
                __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('users/' + key).child('balance').on('child_changed', function (userData) {
                    _this.userBal = userData.val();
                });
            });
        }).then(function () {
            __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('requests').once('value', function (data) {
                if (data.val() != null || data.val() != undefined) {
                    var sortList = data.val();
                    for (var x in sortList) {
                        if (_this.loginUser == x) {
                            continue;
                        }
                        var userPosts = [];
                        userPosts.push(sortList[x]);
                        _this.reqInfo[x] = userPosts;
                    }
                    var keyList_1 = Object.keys(_this.reqInfo);
                    var NameList_1 = [];
                    for (var user in keyList_1) {
                        __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('users/' + keyList_1[user]).once('value', function (getNames) {
                            NameList_1.push(getNames.val().name + " " + getNames.val().surname);
                            _this.nameKey[getNames.val().name + " " + getNames.val().surname] = keyList_1[user];
                        });
                    }
                    _this.userList = __WEBPACK_IMPORTED_MODULE_5_rxjs__["Observable"].of(NameList_1);
                }
            });
        });
    }
    HomePage.prototype.navReqPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__requests_requests__["a" /* RequestsPage */]);
    };
    HomePage.prototype.navMyAccount = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__myAccount_myAcc__["a" /* myAcc */]);
    };
    HomePage.prototype.giveInfo = function () {
        this.postCont.clear();
        for (var num in this.reqInfo[this.nameKey[this.currentUser]]) {
            for (var post in this.reqInfo[this.nameKey[this.currentUser]][num]) {
                var factory = this.resolver.resolveComponentFactory(__WEBPACK_IMPORTED_MODULE_0__components_post_component__["a" /* PostsComponent */]);
                this.componentRef = this.postCont.createComponent(factory);
                this.componentRef.instance.title = this.reqInfo[this.nameKey[this.currentUser]][num][post].title;
                this.componentRef.instance.cost = this.reqInfo[this.nameKey[this.currentUser]][num][post].cost;
                this.componentRef.instance.userData = this.nameKey[this.currentUser];
                this.componentRef.instance.reqID = post;
            }
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])("viewPosts", { read: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_10" /* ViewContainerRef */] }),
        __metadata("design:type", Object)
    ], HomePage.prototype, "postCont", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/cheronrandall/Documents/GitHub/InternshipApp/src/pages/home/home.html"*/'<ion-header >\n    <ion-navbar>\n      <ion-title style="text-align: center;">\n        Home\n      </ion-title>\n      <ion-buttons end>\n          <button ion-button icon-only (click)="navMyAccount()">\n            <ion-icon name="person"></ion-icon>\n          </button>\n        </ion-buttons>\n    </ion-navbar>\n  </ion-header>\n  \n  <ion-content scrollbar-y="false;" padding>\n    <ion-list>\n        <ion-item>\n            <ion-label>\n                <font style="font-size:20px">Wallet </font>\n            </ion-label>\n            <ion-label text-right>\n                {{userBal}} <font style="color: primary; font-size:16px">STC</font>\n            </ion-label>\n        </ion-item>  \n      <ion-item>\n        <ion-label style="text-align: center;">User</ion-label>\n        <ion-select [(ngModel)]="currentUser" interface="popover" (ionChange)="giveInfo()">\n            <ion-option *ngFor="let user of userList | async">{{user}}</ion-option>\n        </ion-select>\n      </ion-item>\n      <ion-item *ngFor="let title of postList | async" (click)="giveInfo()">\n          <ion-label style="text-align: center">{{title.title}}</ion-label>\n          <ion-label style="text-align: center">R: {{title.cost}}</ion-label>\n      </ion-item>\n      <template #viewPosts></template>\n    </ion-list>\n    \n  </ion-content>\n  <ion-footer text-center>\n\n    </ion-footer>\n  \n  \n  \n'/*ion-inline-end:"/Users/cheronrandall/Documents/GitHub/InternshipApp/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1__angular_core__["o" /* ComponentFactoryResolver */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_request_component__ = __webpack_require__(254);
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
    function RequestsPage(navCtrl, navParams, formBuilder, storage, resolver) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.storage = storage;
        this.resolver = resolver;
        this.allReqs = {};
        this.request = this.formBuilder.group({
            title: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            cost: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
        });
        this.storage.get('walletKey').then(function (key) {
            _this.userKey = key;
            var tempList = [];
            __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('requests/' + _this.userKey).on('child_added', function (reqData) {
                tempList.push([{ 'key': reqData.key, 'title': reqData.val().title, 'cost': reqData.val().cost }]);
                _this.allReqs = tempList;
                _this.createComponents();
            });
        });
    }
    RequestsPage.prototype.logform = function () {
        __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('requests/' + this.userKey).push({
            title: this.request.value.title,
            cost: parseInt(this.request.value.cost)
        });
        this.request.reset();
    };
    RequestsPage.prototype.createComponents = function () {
        this.reqContainer.clear();
        for (var x in this.allReqs) {
            var factory = this.resolver.resolveComponentFactory(__WEBPACK_IMPORTED_MODULE_5__components_request_component__["a" /* RequestComponent */]);
            this.componentRef = this.reqContainer.createComponent(factory);
            this.componentRef.instance.title = this.allReqs[x][0].title;
            this.componentRef.instance.cost = this.allReqs[x][0].cost;
            this.componentRef.instance.key = this.allReqs[x][0].key;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])("viewRequests", { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewContainerRef */] }),
        __metadata("design:type", Object)
    ], RequestsPage.prototype, "reqContainer", void 0);
    RequestsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-requests',template:/*ion-inline-start:"/Users/cheronrandall/Documents/GitHub/InternshipApp/src/pages/requests/requests.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title text-center>Requests</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n    <form [formGroup]="request">\n      <ion-item>\n        <ion-label style="text-align: center;">\n          Make new Request\n        </ion-label>\n      </ion-item>\n      <ion-item>\n          <ion-label>Title</ion-label>\n          <ion-input type="text" formControlName="title"></ion-input>\n      </ion-item>\n      <ion-item>\n          <ion-label>Cost</ion-label>\n          <ion-input type="number" formControlName="cost"></ion-input>\n      </ion-item>\n      <button ion-button (click)=\'logform()\' type="submit" [disabled]="!request.valid">Submit</button>\n    </form>\n\n    <ion-list>\n      <ion-item>\n        <ion-label style="text-align: center;">\n          My Requests\n        </ion-label>\n      </ion-item>\n      <template #viewRequests></template>\n    </ion-list>\n    \n</ion-content>\n'/*ion-inline-end:"/Users/cheronrandall/Documents/GitHub/InternshipApp/src/pages/requests/requests.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */]])
    ], RequestsPage);
    return RequestsPage;
}());

//# sourceMappingURL=requests.js.map

/***/ }),

/***/ 168:
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
webpackEmptyAsyncContext.id = 168;

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
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
    function PostsComponent(navCtrl, storage) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.bool = true;
    }
    PostsComponent.prototype.Confirm = function () {
        //Interaction with blockchain here
        this.transaction();
    };
    PostsComponent.prototype.transaction = function () {
        var _this = this;
        this.storage.get('walletKey').then(function (key) {
            var posterBal;
            var userBal;
            //fetches balance of user whose post is clicked on
            __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('users/' + _this.userData + '/balance').child('balance').once('value', function (bal) {
                posterBal = bal.val();
            }).then(function () {
                //fetches balance of current user
                __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('users/' + key + '/balance').child('balance').once('value', function (bal) {
                    userBal = bal.val();
                }).then(function () {
                    if ((posterBal - _this.cost) >= 0) {
                        __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('users/' + _this.userData + '/balance').update({
                            balance: posterBal - _this.cost
                        });
                        __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('users/' + key + '/balance').update({
                            balance: userBal + _this.cost
                        });
                        __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('requests/' + _this.userData + '/' + _this.reqID).remove();
                        _this.bool = false;
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
            template: "\n        <ion-item id={{userData}} *ngIf=\"bool\">\n            <ion-label>{{title}}</ion-label>\n            <ion-label>R {{cost}}</ion-label>\n            <button ion-button color=\"danger\" item-right id={{reqID}} (click)=\"Confirm()\" ion-button>Offer</button>\n        </ion-item>\n    "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], PostsComponent);
    return PostsComponent;
}());

//# sourceMappingURL=post-component.js.map

/***/ }),

/***/ 213:
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
webpackEmptyAsyncContext.id = 213;

/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RequestComponent = /** @class */ (function () {
    function RequestComponent(navCtrl, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.bool = true;
        this.storage.get('walletKey').then(function (current) {
            _this.userKey = current;
        });
    }
    Object.defineProperty(RequestComponent.prototype, "key", {
        get: function () { return this._key; },
        set: function (key) {
            this._key = key;
        },
        enumerable: true,
        configurable: true
    });
    RequestComponent.prototype.deleteReq = function (reqKey) {
        __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('requests/' + this.userKey + '/' + reqKey).remove();
        this.bool = false;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], RequestComponent.prototype, "key", null);
    RequestComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            template: "\n    <ion-item *ngIf=\"bool\">\n        <ion-label>{{title}}</ion-label>\n        <ion-label>{{cost}}</ion-label>\n        <button ion-button icon-only item-right color=\"danger\" (click)=\"deleteReq(key)\">\n            <ion-icon name=\"close-circle\"></ion-icon>\n        </button>\n    </ion-item>\n    "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], RequestComponent);
    return RequestComponent;
}());

//# sourceMappingURL=request-component.js.map

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__create_account_create_account__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(33);
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
                    console.log(currentUser);
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
            selector: 'page-login',template:/*ion-inline-start:"/Users/cheronrandall/Documents/GitHub/InternshipApp/src/pages/login/login.html"*/'<ion-header>\n\n<ion-navbar>\n<ion-title style="text-align: center;">\n                <font face="Futura">\n                        Stelcoin\n                </font>\n        </ion-title>\n</ion-navbar>\n        \n\n  </ion-header>\n  \n  <ion-content padding>\n\n        <img src="assets/imgs/stelcoin.png"/>  \n    <ion-list>\n            <div text-center class="row" >\n                    <div class="col" >\n        <ion-item>\n            <ion-label floating>Email</ion-label>\n            <ion-input type="email" [(ngModel)]="userEmail"></ion-input>\n        </ion-item>\n        </div>\n        </div>\n\n        <div  class="row" >\n                <div  class="col" >\n        <ion-item>\n            <ion-label floating>Password</ion-label>\n            <ion-input type="password" [(ngModel)]="userPass"></ion-input>\n        </ion-item>\n        </div>\n    </div>\n        \n    </ion-list>\n\n\n    <div centre class="row" >\n            <div class="col" >\n                    <button ion-button (click)="runAuthen()" round outline>Login</button>\n            </div>\n            \n        </div>\n    <div class="row">\n     \n            <div class="col">\n                    <button ion-button (click)="navCreatePage()" round outline color="stelcoinred">Create Account</button>\n            </div>\n    </div>\n    \n  </ion-content>\n  <!-- <ion-footer text-center>\n                Stelcoin*\n        </ion-footer>\n   -->\n'/*ion-inline-end:"/Users/cheronrandall/Documents/GitHub/InternshipApp/src/pages/login/login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateAccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__myAccount_myAcc__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(41);
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
                }).then(function () { return _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__myAccount_myAcc__["a" /* myAcc */]); });
            });
        }
        else {
            console.log("Password doesn't match");
        }
    };
    CreateAccountPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-create-account',template:/*ion-inline-start:"/Users/cheronrandall/Documents/GitHub/InternshipApp/src/pages/create-account/create-account.html"*/'<ion-header>\n\n    <ion-navbar>\n        <ion-title text-center>\n            <font face="Courier New">\n                Register\n            </font>\n        </ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n    <ion-list>\n\n        <div text-center class="row" >\n            <div class="col" >\n                <ion-item>\n                    <ion-label floating>Email</ion-label>\n                    <ion-input type="email" [(ngModel)]="userEmail"></ion-input>\n                </ion-item>\n            </div>\n        </div>\n\n        <div  class="row" >\n            <div  class="col" >\n\n                <ion-item>\n                    <ion-label floating>Password</ion-label>\n                    <ion-input type="password" [(ngModel)]="userPass"></ion-input>\n                </ion-item>\n\n            </div>\n        </div>\n\n        <div  class="row" >\n            <div  class="col" >\n                <ion-item>\n                    <ion-label floating>Retype Password</ion-label>\n                    <ion-input type="password" [(ngModel)]="confirmPass"></ion-input>\n                </ion-item>\n            </div>\n        </div>\n\n        <div class="row">\n            <div text-center class="col">\n                <button text-center ion-button  (click)="CreateAccount()" round>\n                    Submit\n                </button>\n            </div>\n        </div>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/cheronrandall/Documents/GitHub/InternshipApp/src/pages/create-account/create-account.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], CreateAccountPage);
    return CreateAccountPage;
}());

//# sourceMappingURL=create-account.js.map

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(360);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_components_post_component__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_components_request_component__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_create_account_create_account__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_requests_requests__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_myAccount_myAcc__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_http_http__ = __webpack_require__(695);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_common_http__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_storage__ = __webpack_require__(33);
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
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_create_account_create_account__["a" /* CreateAccountPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_myAccount_myAcc__["a" /* myAcc */],
                __WEBPACK_IMPORTED_MODULE_9__pages_requests_requests__["a" /* RequestsPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_components_post_component__["a" /* PostsComponent */],
                __WEBPACK_IMPORTED_MODULE_1__pages_components_request_component__["a" /* RequestComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_14__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_15__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_10__pages_myAccount_myAcc__["a" /* myAcc */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_create_account_create_account__["a" /* CreateAccountPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_requests_requests__["a" /* RequestsPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_components_post_component__["a" /* PostsComponent */],
                __WEBPACK_IMPORTED_MODULE_1__pages_components_request_component__["a" /* RequestComponent */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_3__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_13__providers_http_http__["a" /* HttpProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 410:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_myAccount_myAcc__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_requests_requests__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(33);
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
    function MyApp(platform, statusBar, splashScreen, storage) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.storage = storage;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Request', component: __WEBPACK_IMPORTED_MODULE_8__pages_requests_requests__["a" /* RequestsPage */] },
            { title: 'My Account', component: __WEBPACK_IMPORTED_MODULE_6__pages_myAccount_myAcc__["a" /* myAcc */] },
            { title: 'Logout', component: '' }
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
        __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.initializeApp(config);
    };
    MyApp.prototype.openPage = function (page) {
        if (page.title != 'Logout') {
            // Reset the content nav to have just this page
            // we wouldn't want the back button to show in this scenario
            this.nav.setRoot(page.component);
        }
        else {
            this.logout();
        }
    };
    MyApp.prototype.logout = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.auth().signOut().then(function () {
            console.log('Signed Out');
            _this.storage.clear();
            _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */]);
        }, function (error) {
            console.error('Sign Out Error', error);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/cheronrandall/Documents/GitHub/InternshipApp/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/cheronrandall/Documents/GitHub/InternshipApp/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 695:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(354);
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

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return myAcc; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var myAcc = /** @class */ (function () {
    function myAcc(navCtrl, navParams, formBuilder, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.storage = storage;
        this.request = this.formBuilder.group({
            title: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            cost: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
        });
        this.storage.get('walletKey').then(function (key) {
            __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('users/' + key).child('balance').once('value', function (data) {
                _this.bal = data.val().balance;
            }).then(function () {
                __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('users/' + key).child('balance').on('child_changed', function (data) {
                    _this.bal = data.val();
                });
            });
            __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('users/' + key).child('name').once('value', function (userName) {
                _this.name = userName.val();
            });
            __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('users/' + key).child('surname').once('value', function (userSur) {
                _this.surname = userSur.val();
            });
        });
    }
    myAcc.prototype.logform = function () {
        var _this = this;
        this.storage.get('walletKey').then(function (key) {
            __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('users/' + key + '/posts').push({
                title: _this.request.value.title,
                cost: parseInt(_this.request.value.cost)
            });
            _this.request.reset();
        });
    };
    myAcc.prototype.addFunds = function () {
        var _this = this;
        this.storage.get('walletKey').then(function (key) {
            __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('users/' + key).child('balance').once('value', function (bal) {
                __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('users/' + key + '/balance').update({
                    balance: parseInt(bal.val().balance) + parseInt(_this.funds)
                });
                _this.funds = '';
            });
        });
    };
    myAcc.prototype.submitInfo = function () {
        var _this = this;
        this.storage.get('walletKey').then(function (key) {
            __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database().ref('users/' + key).update({
                name: _this.name,
                surname: _this.surname
            });
        });
    };
    myAcc = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-myAcc',template:/*ion-inline-start:"/Users/cheronrandall/Documents/GitHub/InternshipApp/src/pages/myAccount/myAcc.html"*/'        <ion-header>\n            <ion-navbar>\n                <ion-title style="text-align: center;">\n                        <font text-center2>\n                                Account\n                        </font>\n                </ion-title>\n            </ion-navbar>\n        </ion-header>\n\n        <ion-content scrollbar-y="false;" padding>\n            <!-- <ion-item text-center>\n                <ion-label>\n                        <font style="font-size:20px">My Profile</font>\n                </ion-label>\n            </ion-item> -->\n            <ion-item>\n                <ion-label floating>Name</ion-label>\n                <ion-input type="text" [(ngModel)]="name"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label floating>Surname</ion-label>\n                <ion-input type="text" [(ngModel)]="surname"></ion-input>\n            </ion-item>\n            <ion-item>\n                <button item-right ion-button (click)="submitInfo()">Submit</button>\n            </ion-item>\n\n            <ion-item>\n                <ion-label>\n                    <font style="font-size:20px">Wallet </font>\n                </ion-label>\n                <ion-label text-right>\n                    {{bal}} <font style="color: primary; font-size:16px">STC</font>\n                </ion-label>\n            </ion-item>  \n\n                <div class="row"></div>\n                <ion-item>\n                        <ion-label floating>Add Funds</ion-label>\n                            <ion-input type="number" [(ngModel)]="funds">\n\n                            </ion-input> \n                            <button item-right ion-button (click)="addFunds()" square>\n                                    Submit\n                                </button>                 \n                </ion-item>\n                   \n                        <div class="row"></div>\n                        <div class="row">\n                            <ion-item>\n                                <ion-label>\n                                        <font style="font-size:20px">My Jobs </font>\n                                </ion-label>\n                                <ion-label text-right>\n                                        <font style="font-size:10px">active </font>\n                                </ion-label>\n                            </ion-item>\n                            </div>\n                                <ion-list>\n                                    <ion-item>\n                                        <ion-label>\n                                            <font style="font-size:20px">Job 1 </font>\n                                        </ion-label>\n                                        <button item-right ion-button square>Delete</button>\n                                    </ion-item>\n                                    <ion-item>\n                                        <ion-label>\n                                            <font style="font-size:20px">Job 2 </font>\n                                        </ion-label>\n                                        <button item-right ion-button square>Delete</button>\n                                    </ion-item>\n                                    <ion-item>\n                                        <ion-label>\n                                            <font style="font-size:20px">Job 3 </font>\n                                        </ion-label>\n                                        <button item-right ion-button square>Delete</button>\n                                    </ion-item>\n                                </ion-list>\n\n                \n                \n                    \n        </ion-content>\n\n        <ion-footer text-center>\n\n        </ion-footer>'/*ion-inline-end:"/Users/cheronrandall/Documents/GitHub/InternshipApp/src/pages/myAccount/myAcc.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], myAcc);
    return myAcc;
}());

//# sourceMappingURL=myAcc.js.map

/***/ })

},[355]);
//# sourceMappingURL=main.js.map