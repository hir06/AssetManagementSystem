import { ApiService } from "./../../../services/api.services";
import { Component, OnInit } from "@angular/core";

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
        paging: {currentPage: 0, pageSize: 10},
        sorts: [
            {
                field: "buildingName",
                order: "ASC"
            }
        ],
        filters: []
    };

    constructor(private _apiService: ApiService) {
        this.getBuildingsList();
    }

    ngOnInit() {
    }

    getPageData($event: any) {
        this.searchParams.paging.currentPage = $event.pageNo -1;
        this.searchParams.paging.pageSize = $event.pageSize;
        this.getBuildingsList();
    }

    getBuildingsList() {
<<<<<<< HEAD
        let params = {
            paging: {currentPage: 0, pageSize: 10},
            sorts: [
                {
                    field: "buildingName",
                    order: "ASC"
                }
            ],
            filters: []
        };
        this._apiService
            .get("/s/building/search-buildings", {Search: params})
=======
        this._apiService
            .get("/s/building/search-buildings", { Search: JSON.stringify(this.searchParams )})
>>>>>>> d2338f8381641f1571b07e0ef3e24bb348e2faea
            .subscribe(data => {
                this.itemsCount = data.totalRecords;
                this.buildingList = data.buildings;
            });
    }

}
