import { AddOtherAssetsComponent } from './../components/other/add-other-assets/add-other-assets.component';
import { OtherAssetsListComponent } from './../components/other/other-assets-list/other-assets-list.component';
import { AddVehicleComponent } from './../components/vehicle/add-vehicle/add-vehicle.component';
import { VehicleListComponent } from './../components/vehicle/vehicle-list/vehicle-list.component';
import { VehicleComponent } from './../components/vehicle/vehicle.component';
import { EquipmentListComponent } from './../components/equipment/equipment-list/equipment-list.component';
import { EquipmentComponent } from './../components/equipment/equipment.component';
import { AddBuildingComponent } from './../components/building/add-building/add-building.component';
import { BuildingListComponent } from './../components/building/building-list/building-list.component';
import { BuildingComponent } from './../components/building/building.component';
import { DashboardComponent } from './../components/dashboard/dashboard.component';
import { HeaderComponent } from './../components/header/header.component';
import { LoginComponent } from './../components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEquipmentComponent } from '../components/equipment/add-equipment/add-equipment.component';
import { OtherComponent } from '../components/other/other.component';
import { UserService } from '../services/userService';



const appRoutes: Routes = [
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'dashboard', component: DashboardComponent,canActivate:[UserService]},
      { path: 'buildings', component: BuildingComponent,
            children:[
                  {path: '',component: BuildingListComponent , pathMatch: 'full'},
                  {path: 'add-building',component: AddBuildingComponent , pathMatch: 'full'}
            ],canActivate:[UserService]
      },
      { path: 'equipments', component: EquipmentComponent,
            children:[
                  {path: '',component: EquipmentListComponent , pathMatch: 'full'},
                  {path: 'add-equipment',component: AddEquipmentComponent , pathMatch: 'full'}
            ],canActivate:[UserService]
      },
      { path: 'vehicles', component: VehicleComponent,
            children:[
                  {path: '',component: VehicleListComponent , pathMatch: 'full'},
                  {path: 'add-vehicle',component: AddVehicleComponent , pathMatch: 'full'}
            ],canActivate:[UserService]
      },
      { path: 'others', component: OtherComponent,
            children:[
                  {path: '',component: OtherAssetsListComponent , pathMatch: 'full'},
                  {path: 'add-other-asset',component: AddOtherAssetsComponent , pathMatch: 'full'}
            ],canActivate:[UserService]
      }
];

@NgModule({
      imports: [
        RouterModule.forRoot(appRoutes) 
      ],
      exports: [RouterModule],
      providers:[]
})
export class AppRoutingModule { }
