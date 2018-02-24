import { ApiService } from "./../../../services/api.services";
import { Component, OnInit } from "@angular/core";
import { AlertsLoaderService } from "../../../services/alerts-loader.service";

@Component({
    selector: "app-building-list",
    templateUrl: "./building-list.component.html",
    styleUrls: ["./building-list.component.scss"]
})
export class BuildingListComponent implements OnInit {
    pageSize: number = 10;
    itemsCount: number = 0;
    buildingList: any = [];
    searchParams: any = {
        paging: { currentPage: 0, pageSize: 10 },
        sorts: [
            {
                field: "buildingName",
                order: "ASC"
            }
        ],
        filters: []
    };
    constructor(private _apiService: ApiService,private _alertService: AlertsLoaderService) {
        this.getBuildingsList();
    }

    ngOnInit() {}
    getPageData($event: any) {
        this.searchParams.paging.currentPage = $event.pageNo -1;
        this.searchParams.paging.pageSize = $event.pageSize;
        this.getBuildingsList();
    }

    getBuildingsList() {
        this._apiService
            .get("/building/search-buildings", { Search: JSON.stringify(this.searchParams )})
            .subscribe(data => {
                this.itemsCount = data.totalRecords;
                this.buildingList = data.buildings;
            });
    }

    deleteBuilding(building:any){
        this._apiService.delete(`/building/delete-building/buildingId/${building.id}`).subscribe(
            (data)=>{
                this._alertService.success("Building deleteed successfully.");
            },
            (error)=>{
                this._alertService.error("Building cannot be deleted because it is associated to an incident.");
            }
        )

    }
}
