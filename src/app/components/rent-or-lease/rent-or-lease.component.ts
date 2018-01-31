import { AlertsLoaderService } from "./../../services/alerts-loader.service";
import { Component, OnInit, Input } from "@angular/core";
import { ApiService } from "../../services/api.services";
import { SharedService } from "../../services/shared.service";

@Component({
    selector: "app-rent-or-lease",
    templateUrl: "./rent-or-lease.component.html",
    styleUrls: ["./rent-or-lease.component.scss"]
})
export class RentOrLeaseComponent implements OnInit {
    rent: any = {
        id: null,
        statusFlag: null,
        agreementId: "ASSET_TYPE_OTHER1",
        agreementName: "AGREEMENT FOR ASSET TYPE OTHER NAME 1",
        agreementDescription: "AGREEMENT FOR ASSET TYPE OTHER DESCRIPTION 1",
        companyName: "CHRIS RENTAL",
        companyDescription: "CHRIS RENTAL OR LEASING COMPANY LIMITED",
        companyPhone: "258-369-1478",
        companyEmail: "chrisrental@cr.com",
        companyContactPerson: "Mr. Christopher Julian",
        startDateTime: "01/01/2017 00:00:01",
        endDateTime: "31/12/2017 23:59:59",
        graceDateTime: "31/01/2018 23:59:59",
        gracePeriodInMonths: 1,
        agreementAmount: 26581.98,
        renewalAmount: 2568.25,
        rentalOrLeaseType: {
            id: "RENTAL"
        },
        rentalOrLeaseTypeOther: null,
        comments: "Worlds No. 1 Rental and Leasing Company.",
        buildings: null,
        equipments: null,
        vehicles: null,
        assetTypeOthers: null,
        existingBuildings: null,
        existingEquipments: null,
        existingVehicles: null,
        existingAssetTypeOthers: null
    };
    dropDownsData:any;
    @Input() asset: any;
    constructor(
        private _apiService: ApiService,
        private _alertsService: AlertsLoaderService,
        private _sharedService: SharedService
    ) {
      this._sharedService.dropDownsService.subscribe((data)=>{
        this.dropDownsData = data;//rentOrLeaseTypeList
    });
    }

    ngOnInit() {}
    save() {
        let url = "/s/building/add-rental-or-lease-to-building/buildingId/";
        if (this.asset.assetCategory.id == "VEHICLE") {
            url =
                "/s/asset-type-other/add-rental-or-lease-to-asset-type-other/assetTypeOtherId/";
        }
        if (this.asset.assetCategory.id == "EQUIPMENT") {
            url = "/s/equipment/add-rental-or-lease-to-equipment/equipmentId/";
        }
        if (this.asset.assetCategory.id == "OTHER") {
            url = "/s/vehicle/add-rental-or-lease-to-vehicle/vehicleId/";
        }
        url = url + this.asset.id;
        this._apiService.put(url, this.rent).subscribe(
            data => {
                this.asset = data;
                this._alertsService.success(
                    "Service successfully added to " +
                        this.asset.assetCategory.description
                );
            },
            error => {
                this._alertsService.error(
                    "Some error occured. Please try again."
                );
            }
        );
    }
    editRentOrLease(rol: any){
        this.rent = rol;
    }
    removeRentOrLeaseFromAsset(rol: any){
        let url = `/s/building/remove-rental-or-lease-from-building/buildingId/${this.asset.id}/rentalOrLeaseId/${rol.id}`;
        if (this.asset.assetCategory.id == "VEHICLE") {
            url = `/s/vehicle/remove-rental-or-lease-from-vehicle/vehicleId/${this.asset.id}/rentalOrLeaseId/${rol.id}`;
        }
        if (this.asset.assetCategory.id == "EQUIPMENT") {
            url = `/s/equipment/remove-rental-or-lease-from-equipment/equipmentId/${this.asset.id}/rentalOrLeaseId/${rol.id}`;
        }
        if (this.asset.assetCategory.id == "OTHER") {
            url =  `/s/asset-type-other/remove-rental-or-lease-from-asset-type-other/assetTypeOtherId/${this.asset.id}/rentalOrLeaseId/${rol.id}`;;
        }
        this._apiService.delete(url).subscribe(
            data => {
                this.asset = data;
                this._alertsService.success(
                    "Rental or Lease successfully removed from " +this.asset.assetCategory.description
                );
            },
            error => {
                this._alertsService.error(
                    "Some error occured. Please try again."
                );
            }
        );
    }
}
