import { AlertsLoaderService } from "./../../services/alerts-loader.service";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ApiService } from "../../services/api.services";

@Component({
    selector: "app-warranty",
    templateUrl: "./warranty.component.html",
    styleUrls: ["./warranty.component.scss"]
})
export class WarrantyComponent implements OnInit {
    warranty: any ;
    @Input() asset: any;
    editMode: boolean = false;
    @Output() addedToAsset: EventEmitter<any> = new EventEmitter();
    constructor(
        private _apiService: ApiService,
        private _alertsService: AlertsLoaderService
    ) {
        this.initWarranty();
    }

    ngOnInit() {}
    initWarranty(){
        this.warranty = {
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
    }
    save() {
        if(this.editMode){
            this.updateWarranty();
            return;
        }
        let url = "/building/add-warranty-to-building/buildingId/";
        if (this.asset.assetCategory.id == "VEHICLE") {
            url = "/vehicle/add-warranty-to-vehicle/vehicleId/";
        }
        if (this.asset.assetCategory.id == "EQUIPMENT") {
            url = "/equipment/add-warranty-to-equipment/equipmentId/";
        }
        if (this.asset.assetCategory.id == "OTHER") {
            url = "/asset-type-other/add-warranty-to-asset-type-other/assetTypeOtherId/";
        }
        url = url + this.asset.id;
        this._apiService.put(url, this.warranty).subscribe(
            data => {
                this.asset = data;
                this._alertsService.success(
                    "Warranty successfully added to " +
                        this.asset.assetCategory.description
                );
                this.initWarranty();
                this.addedToAsset.emit(data);
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
        this._apiService.put("/warranty/create-or-update-warranty",this.warranty).subscribe(
            data => {
                this.warranty = data;
                this._alertsService.success(
                    "Warranty successfully updated."
                );
                this.initWarranty();
                this.editMode = false;
            },
            error => {
                this._alertsService.error(
                    "Some error occured. Please try again."
                );
            }
        );
    }
    removeWarrantyFromAsset(warranty: any){
        let url = `/building/remove-warranty-from-building/buildingId/${this.asset.id}/warrantyId/${warranty.id}`;
        if (this.asset.assetCategory.id == "VEHICLE") {
            url = `/vehicle/remove-warranty-from-vehicle/vehicleId/${this.asset.id}/warrantyId/${warranty.id}`;
        }
        if (this.asset.assetCategory.id == "EQUIPMENT") {
            url = `/equipment/remove-warranty-from-equipment/equipmentId/${this.asset.id}/warrantyId/${warranty.id}`;
        }
        if (this.asset.assetCategory.id == "OTHER") {
            url =  `/asset-type-other/remove-warranty-from-asset-type-other/assetTypeOtherId/${this.asset.id}/warrantyId/${warranty.id}`;;
        }
        this._apiService.delete(url).subscribe(
            data => {
                this.asset = data;
                this._alertsService.success(
                    "Warranty successfully removed from " +this.asset.assetCategory.description
                );
                this.addedToAsset.emit(data);
            },
            error => {
                this._alertsService.error(
                    "Some error occured. Please try again."
                );
            }
        );
    }
}
