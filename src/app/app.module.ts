import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './modules/router.module';
import { UserService } from './services/userService';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule,APP_INITIALIZER  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BuildingComponent } from './components/building/building.component';
import { BuildingListComponent } from './components/building/building-list/building-list.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SideNavComponent,
    DashboardComponent,
    BuildingComponent,
    BuildingListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    UserService,
    {
      provide: APP_INITIALIZER,
      useFactory: getUserDetails,
      deps: [UserService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getUserDetails(userService: UserService) {
  //return () => initializerService.getUserDetails().then(() => {});
  return () => userService.getUserDetails().then((data)=>{
    console.log(data);
  });
}
