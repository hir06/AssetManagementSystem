import { UserService } from './../../services/userService';
import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

declare function unescape(s:string): string;
declare function escape(s:string): string;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  signInError: boolean;
  login:any = {};
  constructor(private _http: HttpClient,private route: Router) { }

  ngOnInit() {
    //https://b2897cdb.ngrok.io/rmsrest
    this.route.navigate(['/dashboard']);
  }
  loginUser(){
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic " + btoa(`${this.login.username}:${this.login.password}`));
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    this._http.post('https://b2897cdb.ngrok.io/rmsrest/p/api/login',{},{ headers: headers }).subscribe(
      (data:any)=>{
        localStorage.setItem('amsAuthToken',data.XAuthToken);
      },
      (error)=>{
        console.log(error);
        this.signInError = true;
      }
    )
  }

}
