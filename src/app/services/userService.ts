import { Injectable } from '@angular/core';
//import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
        userDetails: any;
        constructor() { }
        decryptToken(token:any){
                var base64Url = token.split('.')[0];
                var decryptedUserDetails = JSON.parse(window.atob(base64Url));
                if (decryptedUserDetails) {
                    //check if the token has expired
                    if (new Date(decryptedUserDetails.expires) < new Date()) {
                        return false;
                    }else{
                            this.userDetails = decryptedUserDetails;
                            return decryptedUserDetails;
                    }
                }
        }
        getUserDetails() {
                return new Promise((resolve, reject) => {
                        //console.log(`${getTimeString()} onAppInit2:: inside promise`);
                        let amsAuthToken = localStorage.getItem('amsAuthToken');
                        setTimeout(() => {
                                if (!amsAuthToken) {
                                        resolve(false); 
                                }else{
                                        resolve(this.decryptToken(amsAuthToken));
                                }
                               
                        }, 5000);
                });
        }
}