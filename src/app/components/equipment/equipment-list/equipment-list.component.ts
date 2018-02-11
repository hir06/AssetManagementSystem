import { ApiService } from "./../../../services/api.services";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-equipment-list",
    templateUrl: "./equipment-list.component.html",
    styleUrls: ["./equipment-list.component.scss"]
})
export class EquipmentListComponent implements OnInit {
    pageSize: number = 10;
    itemsCount: number = 0;
    equipmentList: any = [];
    searchParams: any = {
        paging: { currentPage: 0, pageSize: 10 },
        sorts: [
            {
                field: "equipmentName",
                order: "ASC"
            }
        ],
        filters: []
    };
    constructor(private _apiService: ApiService) {
        this.getEquipmentList();
    }

    ngOnInit() {}

    getPageData($event: any) {
        this.searchParams.paging.currentPage = $event.pageNo - 1;
        this.searchParams.paging.pageSize = $event.pageSize;
        this.getEquipmentList();
    }

    getEquipmentList() {
        this._apiService
            .get("/s/equipment/search-equipments", { Search: JSON.stringify(this.searchParams) })
            .subscribe(data => {
                this.itemsCount = data.totalRecords;
                this.equipmentList = data.equipments;
            });
    }
}
