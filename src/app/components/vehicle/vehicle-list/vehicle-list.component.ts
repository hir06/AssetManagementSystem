import { ApiService } from "./../../../services/api.services";
import { Component, OnInit } from "@angular/core";
import { AlertsLoaderService } from "../../../services/alerts-loader.service";

@Component({
    selector: "app-vehicle-list",
    templateUrl: "./vehicle-list.component.html",
    styleUrls: ["./vehicle-list.component.scss"]
})
export class VehicleListComponent implements OnInit {
    pageSize: number = 10;
    itemsCount: number = 0;
    vehicleList: any = [];
    searchParams: any = {
        paging: { currentPage: 0, pageSize: 10 },
        sorts: [
            {
                field: "vehicleRegistrationId",
                order: "ASC"
            }
        ],
        filters: []
    };
    constructor(private _apiService: ApiService,private _alertService: AlertsLoaderService) {
        this.getVehicleList();
    }

    ngOnInit() {}

    getPageData($event: any) {
        this.searchParams.paging.currentPage = $event.pageNo - 1;
        this.searchParams.paging.pageSize = $event.pageSize;
        this.getVehicleList();
    }

    getVehicleList() {
        this._apiService
            .get("/vehicle/search-vehicles", { Search: JSON.stringify(this.searchParams) })
            .subscribe(data => {
                this.itemsCount = data.totalRecords;
                this.vehicleList = data.vehicles;
            });
    }
    deleteVehicle (vehicle:any){
        this._apiService.delete(`/vehicle/delete-vehicle/vehicleId/${vehicle.id}`).subscribe(
            (data)=>{
                this._alertService.success("Vehicle deleteed successfully.");
            },
            (error)=>{
                this._alertService.error("Vehicle cannot be deleted because it is associated to an incident.");
            }
        )

    }
}
