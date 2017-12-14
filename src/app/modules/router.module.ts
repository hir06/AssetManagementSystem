import { LoginComponent } from './../components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
      { path: '/', component: LoginComponent }
];

@NgModule({
      imports: [
            RouterModule.forRoot(appRoutes)
      ],
      exports: [RouterModule],
      providers:[]
})
export class AppRoutingModule { }
