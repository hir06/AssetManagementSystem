import { HeaderComponent } from './../components/header/header.component';
import { LoginComponent } from './../components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'dashboard', component: HeaderComponent }
];

@NgModule({
      imports: [
        RouterModule.forRoot(appRoutes) 
      ],
      exports: [RouterModule],
      providers:[]
})
export class AppRoutingModule { }
