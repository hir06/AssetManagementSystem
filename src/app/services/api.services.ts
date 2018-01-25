import { AlertsLoaderService } from "./alerts-loader.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ApiService {
    apiUrl: string = "https://b2897cdb.ngrok.io/rmsrest";
    constructor(
        private _http: HttpClient,
        private _ajaxLoader: AlertsLoaderService
    ) {}
    post(url: string, data: any, headers: any) {
        this._ajaxLoader.showLoader();
        return this._http
            .post(this.apiUrl + url, data, { headers: headers })
            .map((res: any) => {
                this._ajaxLoader.hideLoader();
                return res;
            });
    }
    get(url: string) {
        this._ajaxLoader.showLoader();
        return this._http.get(url).map((res: any) => {
            this._ajaxLoader.hideLoader();
            return res;
        });
    }

    login(url, data) {
        return this.post(this.apiUrl + url, data, null);
    }
}
