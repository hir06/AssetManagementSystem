import { ApiService } from "./../../../services/api.services";
import { Component, OnInit } from "@angular/core";

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
    constructor(private _apiService: ApiService) {
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
            .get("/s/vehicle/search-vehicles", { Search: JSON.stringify(this.searchParams) })
            .subscribe(data => {
                this.itemsCount = data.totalRecords;
                this.vehicleList = data.vehicles;
            });
    }
}
