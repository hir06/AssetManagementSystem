import { ApiService } from './../../services/api.services';
import { Component, OnInit, Input } from "@angular/core";
import { AlertsLoaderService } from '../../services/alerts-loader.service';

@Component({
    selector: "app-inspection",
    templateUrl: "./inspection.component.html",
    styleUrls: ["./inspection.component.scss"]
})
export class InspectionComponent implements OnInit {
    inspection: any = {
        id: null,
        statusFlag: null,
        inspectionNumber: null,
        inspectionCompanyName: null,
        inspectionCompanyDescription: null,
        inspectionDoneBy: null,
        inspectionCompanyPhone: null,
        inspectionCompanyEmail: null,
        inspectionCompanyContactPerson: null,
        inspectionDoneDateTime: null,
        inspectionDueDate: null,
        nextInspectionDueDate: null,
        inspectionAmount: null,
        comments: null,
        inspectionDurationInHours: null,
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
    constructor(private _apiService: ApiService, private _alertsService: AlertsLoaderService) {}

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
        this._apiService.put(url, this.inspection).subscribe(
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
