import { ApiService } from './../../services/api.services';
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AlertsLoaderService } from '../../services/alerts-loader.service';

@Component({
    selector: "app-inspection",
    templateUrl: "./inspection.component.html",
    styleUrls: ["./inspection.component.scss"]
})
export class InspectionComponent implements OnInit {
    inspection: any;
    @Input() asset: any;
    @Output() addedToAsset: EventEmitter<any> = new EventEmitter();
    editMode: boolean = false;
    constructor(private _apiService: ApiService, private _alertsService: AlertsLoaderService) {
        this.initInspection();
    }

    ngOnInit() { }
    initInspection() {
        this.inspection = {
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
    }
    save() {
        if (this.editMode) {
            this.updateInspection();
            return;
        }
        let url = "/building/add-inspection-to-building/buildingId/";
        if (this.asset.assetCategory.id == "VEHICLE") {
            url =
                "/asset-type-other/add-inspection-to-asset-type-other/assetTypeOtherId/";
        }
        if (this.asset.assetCategory.id == "EQUIPMENT") {
            url = "/equipment/add-inspection-to-equipment/equipmentId/";
        }
        if (this.asset.assetCategory.id == "OTHER") {
            url = "/vehicle/add-inspection-to-vehicle/vehicleId/";
        }
        url = url + this.asset.id;
        this._apiService.put(url, this.inspection).subscribe(
            data => {
                this._alertsService.success(
                    "Inspection successfully added to " +
                    this.asset.assetCategory.description
                );
                this.initInspection();
                this.addedToAsset.emit(data);
            },
            error => {
                this._alertsService.error(
                    "Some error occured. Please try again."
                );
            }
        );
    }

    editThisInspection(inspection: any) {
        this.inspection = inspection;
        this.editMode = true;
    }

    updateInspection() {
        this._apiService
            .put("/inspection/update-inspection", this.inspection)
            .subscribe(
            data => {
                this.inspection = data;
                this._alertsService.success(
                    "Inspection successfully updated."
                );
                this.initInspection();
                this.editMode = false;
            },
            error => {
                this._alertsService.error(
                    "Some error occured. Please try again."
                );
            }
            );
    }
    removeInspectionFromAsset(inspection: any) {
        let url = `/building/remove-inspection-from-building/buildingId/${this.asset.id}/inspectionId/${inspection.id}`;
        if (this.asset.assetCategory.id == "VEHICLE") {
            url = `/vehicle/remove-inspection-from-vehicle/vehicleId/${this.asset.id}/inspectionId/${inspection.id}`;
        }
        if (this.asset.assetCategory.id == "EQUIPMENT") {
            url = `/equipment/remove-inspection-from-equipment/equipmentId/${this.asset.id}/inspectionId/${inspection.id}`;
        }
        if (this.asset.assetCategory.id == "OTHER") {
            url = `/asset-type-other/remove-inspection-from-asset-type-other/assetTypeOtherId/${this.asset.id}/inspectionId/${inspection.id}`;;
        }
        this._apiService.delete(url).subscribe(
            data => {
                this.asset = data;
                this._alertsService.success(
                    "Inspection successfully removed from " + this.asset.assetCategory.description
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
