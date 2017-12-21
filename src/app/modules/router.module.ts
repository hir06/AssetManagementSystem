import { AddBuildingComponent } from './../components/building/add-building/add-building.component';
import { BuildingListComponent } from './../components/building/building-list/building-list.component';
import { BuildingComponent } from './../components/building/building.component';
import { DashboardComponent } from './../components/dashboard/dashboard.component';
import { HeaderComponent } from './../components/header/header.component';
import { LoginComponent } from './../components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';





const appRoutes: Routes = [
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'buildings', component: BuildingComponent,
            children:[
                  {path: '',component: BuildingListComponent , pathMatch: 'full'},
                  {path: 'add-building',component: AddBuildingComponent , pathMatch: 'full'}
            ]
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
