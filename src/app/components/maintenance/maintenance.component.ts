import { ApiService } from "./../../services/api.services";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AlertsLoaderService } from "../../services/alerts-loader.service";

@Component({
    selector: "app-maintenance",
    templateUrl: "./maintenance.component.html",
    styleUrls: ["./maintenance.component.scss"]
})
export class MaintenanceComponent implements OnInit {
    maintenance: any ;
    @Input() asset: any;
    editMode: boolean = false;
    @Output() addedToAsset: EventEmitter<any> = new EventEmitter();
    constructor(
        private _apiService: ApiService,
        private _alertsService: AlertsLoaderService
    ) {
        this.initMaintenance();
    }

    ngOnInit() {}
    initMaintenance(){
        this.maintenance = {
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
            amcAmount: null,
            gracePeriodInMonths: null,
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
            this.updateAMC();
            return;
        }
        let url = "/building/add-amc-to-building/buildingId/";
        if (this.asset.assetCategory.id == "OTHER") {
            url =
                "/asset-type-other/add-amc-to-asset-type-other/assetTypeOtherId/";
        }
        if (this.asset.assetCategory.id == "EQUIPMENT") {
            url = "/equipment/add-amc-to-equipment/equipmentId/";
        }
        if (this.asset.assetCategory.id == "VEHICLE") {
            url = "/vehicle/add-amc-to-vehicle/vehicleId/";
        }
        url = url + this.asset.id;
        this._apiService.put(url, this.maintenance).subscribe(
            data => {
                this.asset = data;
                this._alertsService.success(
                    "Asset Management Contract successfully added to " +
                        this.asset.assetCategory.description
                );
                this.initMaintenance();
                this.addedToAsset.emit(data);
            },
            error => {
                this._alertsService.error(
                    "Some error occured. Please try again."
                );
            }
        );
    }

    editMaintenance(amc: any) {
        this.maintenance = amc;
        this.editMode = true;
    }
    updateAMC() {
        this._apiService.put("/amc/update-amc", this.maintenance).subscribe(
            data => {
                this.maintenance = data;
                this._alertsService.success("Annual maintenace contract successfully updated.");
                this.initMaintenance();
                this.editMode = false;
            },
            error => {
                this._alertsService.error(
                    "Some error occured. Please try again."
                );
            }
        );
    }
    removeMaintenanceFromAsset(amc: any) {
        let url = `/building/remove-amc-from-building/buildingId/${
            this.asset.id
        }/amcId/${amc.id}`;
        if (this.asset.assetCategory.id == "VEHICLE") {
            url = `/vehicle/remove-amc-from-vehicle/vehicleId/${
                this.asset.id
            }/amcId/${amc.id}`;
        }
        if (this.asset.assetCategory.id == "EQUIPMENT") {
            url = `/equipment/remove-amc-from-equipment/equipmentId/${
                this.asset.id
            }/amcId/${amc.id}`;
        }
        if (this.asset.assetCategory.id == "OTHER") {
            url = `/asset-type-other/remove-amc-from-asset-type-other/assetTypeOtherId/${
                this.asset.id
            }/amcId/${amc.id}`;
        }
        this._apiService.delete(url).subscribe(
            data => {
                this.asset = data;
                this._alertsService.success(
                    "Annual maintenanace contract successfully removed from " +
                        this.asset.assetCategory.description
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
