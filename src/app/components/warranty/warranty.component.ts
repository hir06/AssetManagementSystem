import { AlertsLoaderService } from "./../../services/alerts-loader.service";
import { Component, OnInit, Input } from "@angular/core";
import { ApiService } from "../../services/api.services";

@Component({
    selector: "app-warranty",
    templateUrl: "./warranty.component.html",
    styleUrls: ["./warranty.component.scss"]
})
export class WarrantyComponent implements OnInit {
    warranty: any = {
        id: null,
        statusFlag: null,
        warrantyNumber: null,
        warrantyName: null,
        warrantyDescription: null,
        warrantyProvidedBy: null,
        warrantyProviderDescription: null,
        warrantyProviderPhone: null,
        warrantyProviderEmail: null,
        warrantyProviderContactPerson: null,
        warrantyProvidedDate: null,
        warrantyStartDateTime: null,
        warrantyEndDateTime: null,
        warrantyRenewalDate: null,
        warrantyGraceDateTime: null,
        gracePeriodInMonths: null,
        warrantyAmount: null,
        warrantyRenewalAmount: null,
        comments: null,
        buildings: null,
        equipments: null,
        vehicles: null,
        assetTypeOthers: null,
        existingBuildings: null,
        existingEquipments: null,
        existingVehicles: null,
        existingAssetTypeOthers: null
    };
    @Input() asset: any;
    editMode: boolean = false;
    constructor(
        private _apiService: ApiService,
        private _alertsService: AlertsLoaderService
    ) {}

    ngOnInit() {}
    save() {
        if(this.editMode){
            this.updateWarranty();
            return;
        }
        let url = "/s/building/add-inspection-to-building/buildingId/";
        if (this.asset.assetCategory.id == "VEHICLE") {
            url = "/s/vehicle/add-inspection-to-vehicle/vehicleId/";
        }
        if (this.asset.assetCategory.id == "EQUIPMENT") {
            url = "/s/equipment/add-inspection-to-equipment/equipmentId/";
        }
        if (this.asset.assetCategory.id == "OTHER") {
            url = "/s/asset-type-other/add-inspection-to-asset-type-other/assetTypeOtherId/";
        }
        url = url + this.asset.id;
        this._apiService.put(url, this.warranty).subscribe(
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
    editWarranty(warranty: any){
        this.warranty = warranty;
        this.editMode = true;
    }
    updateWarranty(){
        this._apiService.put("/s/warranty/create-or-update-warranty",this.warranty).subscribe(
            data => {
                this.warranty = data;
                this._alertsService.success(
                    "Warranty successfully updated."
                );
            },
            error => {
                this._alertsService.error(
                    "Some error occured. Please try again."
                );
            }
        );
    }
    removeWarrantyFromAsset(warranty: any){
        let url = `/s/building/remove-warranty-from-building/buildingId/${this.asset.id}/warrantyId/${warranty.id}`;
        if (this.asset.assetCategory.id == "VEHICLE") {
            url = `/s/vehicle/remove-warranty-from-vehicle/vehicleId/${this.asset.id}/warrantyId/${warranty.id}`;
        }
        if (this.asset.assetCategory.id == "EQUIPMENT") {
            url = `/s/equipment/remove-warranty-from-equipment/equipmentId/${this.asset.id}/warrantyId/${warranty.id}`;
        }
        if (this.asset.assetCategory.id == "OTHER") {
            url =  `/s/asset-type-other/remove-warranty-from-asset-type-other/assetTypeOtherId/${this.asset.id}/warrantyId/${warranty.id}`;;
        }
        this._apiService.delete(url).subscribe(
            data => {
                this.asset = data;
                this._alertsService.success(
                    "Warranty successfully removed from " +this.asset.assetCategory.description
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
