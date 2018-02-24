import { AlertsLoaderService } from "./../../services/alerts-loader.service";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ApiService } from "../../services/api.services";
import { SharedService } from "../../services/shared.service";

@Component({
    selector: "app-rent-or-lease",
    templateUrl: "./rent-or-lease.component.html",
    styleUrls: ["./rent-or-lease.component.scss"]
})
export class RentOrLeaseComponent implements OnInit {
    rent: any;
    dropDownsData: any;
    @Input() asset: any;
    @Output() addedToAsset: EventEmitter<any> = new EventEmitter();
    editMode: boolean = false;
    constructor(
        private _apiService: ApiService,
        private _alertsService: AlertsLoaderService,
        private _sharedService: SharedService
    ) {
        this.dropDownsData = this._sharedService.dropDownsData;
        this._sharedService.dropDownsService.subscribe((data) => {
            this.dropDownsData = data;//rentOrLeaseTypeList
        });
        this.initRentOrLease();
    }

    ngOnInit() { }
    initRentOrLease(){
        this.rent = {
            id: null,
            statusFlag: null,
            agreementId: null,
            agreementName: null,
            agreementDescription: null,
            companyName: null,
            companyDescription: null,
            companyPhone: null,
            companyEmail: null,
            companyContactPerson: null,
            startDateTime: null,
            endDateTime: null,
            graceDateTime: null,
            gracePeriodInMonths: null,
            agreementAmount: null,
            renewalAmount: null,
            rentalOrLeaseType: {
                id: null
            },
            rentalOrLeaseTypeOther: null,
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
        if (this.editMode) {
            this.updateRentOrLease();
            return;
        }
        let url = "/building/add-rental-or-lease-to-building/buildingId/";
        if (this.asset.assetCategory.id == "VEHICLE") {
            url =
                "/asset-type-other/add-rental-or-lease-to-asset-type-other/assetTypeOtherId/";
        }
        if (this.asset.assetCategory.id == "EQUIPMENT") {
            url = "/equipment/add-rental-or-lease-to-equipment/equipmentId/";
        }
        if (this.asset.assetCategory.id == "OTHER") {
            url = "/vehicle/add-rental-or-lease-to-vehicle/vehicleId/";
        }
        url = url + this.asset.id;
        this._apiService.put(url, this.rent).subscribe(
            data => {
                this.asset = data;
                this._alertsService.success(
                    "rental or lease agreement successfully added to " +
                    this.asset.assetCategory.description
                );
                this.initRentOrLease();
                this.addedToAsset.emit(data);
            },
            error => {
                this._alertsService.error(
                    "Some error occured. Please try again."
                );
            }
        );
    }
    editRentOrLease(rol: any) {
        this.rent = rol;
        this.editMode = true;
    }

    updateRentOrLease() {
        this._apiService.put("/rental-or-lease/update-rental-or-lease-agreement", this.rent).subscribe(
            data => {
                this.rent = data;
                this._alertsService.success(
                    "Rental or lease agreement successfully updated."
                );
                this.initRentOrLease();
                this.editMode = false;
            },
            error => {
                this._alertsService.error(
                    "Some error occured. Please try again."
                );
            }
        );
    }
    removeRentOrLeaseFromAsset(rol: any) {
        let url = `/building/remove-rental-or-lease-from-building/buildingId/${this.asset.id}/rentalOrLeaseId/${rol.id}`;
        if (this.asset.assetCategory.id == "VEHICLE") {
            url = `/vehicle/remove-rental-or-lease-from-vehicle/vehicleId/${this.asset.id}/rentalOrLeaseId/${rol.id}`;
        }
        if (this.asset.assetCategory.id == "EQUIPMENT") {
            url = `/equipment/remove-rental-or-lease-from-equipment/equipmentId/${this.asset.id}/rentalOrLeaseId/${rol.id}`;
        }
        if (this.asset.assetCategory.id == "OTHER") {
            url = `/asset-type-other/remove-rental-or-lease-from-asset-type-other/assetTypeOtherId/${this.asset.id}/rentalOrLeaseId/${rol.id}`;;
        }
        this._apiService.delete(url).subscribe(
            data => {
                this.asset = data;
                this._alertsService.success(
                    "Rental or Lease successfully removed from " + this.asset.assetCategory.description
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
