import { ApiService } from "./../../services/api.services";
import { Component, OnInit, Input } from "@angular/core";
import { AlertsLoaderService } from "../../services/alerts-loader.service";

@Component({
    selector: "app-service",
    templateUrl: "./service.component.html",
    styleUrls: ["./service.component.scss"]
})
export class ServiceComponent implements OnInit {
    service: any = {
        id: null,
        statusFlag: null,
        serviceNumber: null,
        serviceCompanyName: null,
        serviceCompanyDescription: null,
        serviceDoneBy: null,
        serviceCompanyContactPerson: null,
        serviceCompanyPhone: null,
        serviceCompanyEmail: null,
        serviceDoneDateTime: null,
        serviceDueDate: null,
        nextServiceDueDate: null,
        serviceAmount: null,
        comments: null,
        serviceDurationInHours: null,
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
        private _alertsService: AlertsLoaderService,
        private _apiService: ApiService
    ) {}

    ngOnInit() {}

    save() {
        let url = "/s/building/add-service-to-building/buildingId/";
        if (this.asset.assetCategory.id == "VEHICLE") {
            url =
                "/s/asset-type-other/add-service-to-asset-type-other/assetTypeOtherId/";
        }
        if (this.asset.assetCategory.id == "EQUIPMENT") {
            url = "/s/equipment/add-service-to-equipment/equipmentId/";
        }
        if (this.asset.assetCategory.id == "OTHER") {
            url = "/s/vehicle/add-service-to-vehicle/vehicleId/";
        }
        url = url + this.asset.id;
        this._apiService.put(url, this.service).subscribe(
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
