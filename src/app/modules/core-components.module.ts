import { MaintenanceComponent } from './../components/maintenance/maintenance.component';

import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HeaderComponent } from "../components/header/header.component";
import { LoginComponent } from "../components/login/login.component";
import { SideNavComponent } from "../components/side-nav/side-nav.component";
import { DashboardComponent } from "../components/dashboard/dashboard.component";
import { BuildingComponent } from "../components/building/building.component";
import { BuildingListComponent } from "../components/building/building-list/building-list.component";
import { AddBuildingComponent } from "../components/building/add-building/add-building.component";
import { VehicleComponent } from "../components/vehicle/vehicle.component";
import { OtherComponent } from "../components/other/other.component";
import { EquipmentComponent } from "../components/equipment/equipment.component";
import { AddEquipmentComponent } from "../components/equipment/add-equipment/add-equipment.component";
import { EquipmentListComponent } from "../components/equipment/equipment-list/equipment-list.component";
import { AddVehicleComponent } from "../components/vehicle/add-vehicle/add-vehicle.component";
import { VehicleListComponent } from "../components/vehicle/vehicle-list/vehicle-list.component";
import { AddOtherAssetsComponent } from "../components/other/add-other-assets/add-other-assets.component";
import { OtherAssetsListComponent } from "../components/other/other-assets-list/other-assets-list.component";
import { RouterModule } from '@angular/router';
import { PaginationModule } from 'ngx-pagination-bootstrap';



@NgModule({
    declarations: [
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
        OtherAssetsListComponent,
        MaintenanceComponent
    ],
    imports: [FormsModule, CommonModule,RouterModule,PaginationModule],
    providers: [],
    exports: [
        FormsModule,
        CommonModule
    ],
    entryComponents: [ DashboardComponent ]
})
export class CoreModule {}
