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
    constructor(
        private _apiService: ApiService,
        private _alertsService: AlertsLoaderService
    ) {}

    ngOnInit() {}
    save() {
        let url = "/s/building/add-inspection-to-building/buildingId/";
        if (this.asset.assetCategory.id == "VEHICLE") {
            url =
                "/s/asset-type-other/add-inspection-to-asset-type-other/assetTypeOtherId/";
        }
        if (this.asset.assetCategory.id == "EQUIPMENT") {
            url = "/s/equipment/add-inspection-to-equipment/equipmentId/";
        }
        if (this.asset.assetCategory.id == "OTHER") {
            url = "/s/vehicle/add-inspection-to-vehicle/vehicleId/";
        }
        url = url + this.asset.id;
        this._apiService.put(url, this.warranty).subscribe(
            data => {
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
}
