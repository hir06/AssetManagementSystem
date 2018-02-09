import { ApiService } from "./../../../services/api.services";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-other-assets-list",
    templateUrl: "./other-assets-list.component.html",
    styleUrls: ["./other-assets-list.component.scss"]
})
export class OtherAssetsListComponent implements OnInit {
    pageSize: number = 10;
    itemsCount: number = 0;
    otherAssetList: any = [];
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
    constructor(private _apiService: ApiService) {
        this.getOtherAssetList();
    }

    ngOnInit() {}

    getPageData($event: any) {
        this.searchParams.paging.currentPage = $event.pageNo - 1;
        this.searchParams.paging.pageSize = $event.pageSize;
        this.getOtherAssetList();
    }

    getOtherAssetList() {
        this._apiService
            .get("/s/asset-type-other/search-asset-type-others", { Search: JSON.stringify(this.searchParams) })
            .subscribe(data => {
                this.itemsCount = data.totalRecords;
                this.otherAssetList = data.assetTypeOthers;
            });
    }
}
