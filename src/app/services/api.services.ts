import { AlertsLoaderService } from "./alerts-loader.service";
import { Injectable } from "@angular/core";
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { UserService } from "./userService";

@Injectable()
export class ApiService {
    apiUrl: string = "https://ddf10148.ngrok.io/rmsrest";
    constructor(
        private _http: HttpClient,
        private _ajaxLoader: AlertsLoaderService,
        private _userService: UserService
    ) {}
    post(url: string, data: any, headers?: any, showLoader?: boolean) {
        this._ajaxLoader.showLoader();
        if (!headers) {
            headers = {};
        }
        headers["X-AUTH-TOKEN"] = this._userService.authToken;
        return this._http
            .post(this.apiUrl + url, data, { headers: headers })
            .map((res: any) => {
                this._ajaxLoader.hideLoader();
                return res;
            })
            .catch((error: HttpErrorResponse) => {
                this._ajaxLoader.hideLoader();
                return Observable.throw(error);
            });
    }
    get(url: string, headers?: any, showLoader?: boolean) {
        this._ajaxLoader.showLoader();
        if (!headers) {
            headers = {};
        }
        headers["X-AUTH-TOKEN"] = this._userService.authToken;
        return this._http
            .get(this.apiUrl + url, { headers: headers })
            .map((res: any) => {
                this._ajaxLoader.hideLoader();
                return res;
            })
            .catch((error: HttpErrorResponse) => {
                this._ajaxLoader.hideLoader();
                return Observable.throw(error);
            });
    }

    put(url: string, data: any, headers?: any, showLoader?: boolean) {
        this._ajaxLoader.showLoader();
        if (!headers) {
            headers = {};
        }
        headers["X-AUTH-TOKEN"] = this._userService.authToken;
        return this._http
            .put(this.apiUrl + url, data, { headers: headers })
            .map((res: any) => {
                this._ajaxLoader.hideLoader();
                return res;
            })
            .catch((error: HttpErrorResponse) => {
                this._ajaxLoader.hideLoader();
                return Observable.throw(error);
            });
    }
    login(url, data) {
        return this.post(url, data, null);
    }
    getAssetTypes(url: string) {
        return this.get(url);
    }
    createOrUpdateBuilding(url: string, data: any) {
        return this.put(url, data, null);
    }

    createOrUpdateOtherAsset(url: string, data: any){
        return this.put(url, data, null);
    }
    createOrUpdateEquipment(url: string, data: any){
        return this.put(url, data, null);
    }
    createOrUpdateVehicle(url: string, data: any){
        return this.put(url, data, null);
    }
}
