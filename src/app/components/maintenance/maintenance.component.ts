import { ApiService } from "./../../services/api.services";
import { Component, OnInit, Input } from "@angular/core";
import { AlertsLoaderService } from "../../services/alerts-loader.service";

@Component({
    selector: "app-maintenance",
    templateUrl: "./maintenance.component.html",
    styleUrls: ["./maintenance.component.scss"]
})
export class MaintenanceComponent implements OnInit {
    maintenance: any = {
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
    @Input() asset: any;
    editMode: boolean = false;
    constructor(
        private _apiService: ApiService,
        private _alertsService: AlertsLoaderService
    ) {}

    ngOnInit() {}

    save() {
        if (this.editMode) {
            this.updateAMC();
            return;
        }
        let url = "/s/building/add-amc-to-building/buildingId/";
        if (this.asset.assetCategory.id == "OTHER") {
            url =
                "/s/asset-type-other/add-amc-to-asset-type-other/assetTypeOtherId/";
        }
        if (this.asset.assetCategory.id == "EQUIPMENT") {
            url = "/s/equipment/add-amc-to-equipment/equipmentId/";
        }
        if (this.asset.assetCategory.id == "VEHICLE") {
            url = "/s/vehicle/add-amc-to-vehicle/vehicleId/";
        }
        url = url + this.asset.id;
        this._apiService.put(url, this.maintenance).subscribe(
            data => {
                this.asset = data;
                this._alertsService.success(
                    "Asset Management Contract successfully added to " +
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

    editMaintenance(amc: any) {
        this.maintenance = amc;
        this.editMode = true;
    }
    updateAMC() {
        this._apiService.put("/s/amc/update-amc", this.maintenance).subscribe(
            data => {
                this.maintenance = data;
                this._alertsService.success("Policy successfully updated.");
            },
            error => {
                this._alertsService.error(
                    "Some error occured. Please try again."
                );
            }
        );
    }
    removeMaintenanceFromAsset(amc: any) {
        let url = `/s/building/remove-amc-from-building/buildingId/${
            this.asset.id
        }/amcId/${amc.id}`;
        if (this.asset.assetCategory.id == "VEHICLE") {
            url = `/s/vehicle/remove-amc-from-vehicle/vehicleId/${
                this.asset.id
            }/amcId/${amc.id}`;
        }
        if (this.asset.assetCategory.id == "EQUIPMENT") {
            url = `/s/equipment/remove-amc-from-equipment/equipmentId/${
                this.asset.id
            }/amcId/${amc.id}`;
        }
        if (this.asset.assetCategory.id == "OTHER") {
            url = `/s/asset-type-other/remove-amc-from-asset-type-other/assetTypeOtherId/${
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
            },
            error => {
                this._alertsService.error(
                    "Some error occured. Please try again."
                );
            }
        );
    }
}
