import { ApiService } from "./../../../services/api.services";
import { Component, OnInit } from "@angular/core";
import { AlertsLoaderService } from "../../../services/alerts-loader.service";

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
                field: "assetTypeOtherName",
                order: "ASC"
            }
        ],
        filters: []
    };
    constructor(private _apiService: ApiService, private _alertService: AlertsLoaderService) {
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
            .get("/asset-type-other/search-asset-type-others", { Search: JSON.stringify(this.searchParams) })
            .subscribe(data => {
                this.itemsCount = data.totalRecords;
                this.otherAssetList = data.assetTypeOthers;
            });
    }
    deleteAsset(asset:any){
        this._apiService.delete(`/asset-type-other/delete-asset-type-other/assetTypeOtherId/${asset.id}`).subscribe(
            (data)=>{
                this._alertService.success("Asset deleteed successfully.");
            },
            (error)=>{
                this._alertService.error("Asset type other cannot be deleted because it is associated to an incident.");
            }
        )

    }
}
