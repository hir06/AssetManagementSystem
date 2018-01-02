import { SharedService } from './services/shared.service';
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
import { AddBuildingComponent } from './components/building/add-building/add-building.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { OtherComponent } from './components/other/other.component';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { AddEquipmentComponent } from './components/equipment/add-equipment/add-equipment.component';
import { EquipmentListComponent } from './components/equipment/equipment-list/equipment-list.component';
import { AddVehicleComponent } from './components/vehicle/add-vehicle/add-vehicle.component';
import { VehicleListComponent } from './components/vehicle/vehicle-list/vehicle-list.component';
import { AddOtherAssetsComponent } from './components/other/add-other-assets/add-other-assets.component';
import { OtherAssetsListComponent } from './components/other/other-assets-list/other-assets-list.component';
import { Router } from '@angular/router';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SideNavComponent,
    DashboardComponent,
    BuildingComponent,
    BuildingListComponent,
    AddBuildingComponent,
    VehicleComponent,
    OtherComponent,
    EquipmentComponent,
    AddEquipmentComponent,
    EquipmentListComponent,
    AddVehicleComponent,
    VehicleListComponent,
    AddOtherAssetsComponent,
    OtherAssetsListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    SharedService,
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
    if(!data){
      return false;
    }
  });
}
