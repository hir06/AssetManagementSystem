import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApiService {
        apiUrl: string = "https://b2897cdb.ngrok.io/rmsrest";
        constructor(private _http: HttpClient) { }
        post(url:string,data:any,headers:any){
               return this._http.post(this.apiUrl+url,data,{headers:headers});
        }
        get(url:string){
              return this._http.get(url)
        }

        login(url,data){
              return this.post(this.apiUrl+url,data,null);
        }
}