import { AlertsLoaderService } from "./alerts-loader.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { UserService } from "./userService";


@Injectable()
export class ApiService {
    apiUrl: string = "https://ddf10148.ngrok.io/rmsrest";
    constructor(
        private _http: HttpClient,
        private _ajaxLoader: AlertsLoaderService,
        private _userService: UserService
    ) {}
    post(url: string, data: any, headers: any) {
        this._ajaxLoader.showLoader();
        return this._http
            .post(this.apiUrl + url, data, { headers: headers })
            .map((res: any) => {
                this._ajaxLoader.hideLoader();
                return res;
            }).catch((error: HttpErrorResponse) => {
                  this._ajaxLoader.hideLoader();
                  return Observable.throw(error);
            });
    }
    get(url: string) {
        this._ajaxLoader.showLoader();
        let headers = {
            "X-AUTH-TOKEN": this._userService.authToken
        }
        return this._http.get(this.apiUrl + url,{headers: headers}) .map((res: any) => {
            this._ajaxLoader.hideLoader();
            return res;
        }).catch((error: HttpErrorResponse) => {
              this._ajaxLoader.hideLoader();
              return Observable.throw(error);
        });
    }

    login(url, data) {
        return this.post(this.apiUrl + url, data, null);
    }
    getAssetTypes(url: string){
        return this.get(url);
    }
}
