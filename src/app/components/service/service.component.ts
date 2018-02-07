import { ApiService } from "./../../services/api.services";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AlertsLoaderService } from "../../services/alerts-loader.service";
import { THROW_IF_NOT_FOUND } from "@angular/core/src/di/injector";

@Component({
    selector: "app-service",
    templateUrl: "./service.component.html",
    styleUrls: ["./service.component.scss"]
})
export class ServiceComponent implements OnInit {
    service: any ;
    @Input() asset: any;
    editMode: boolean = false;
    @Output() addedToAsset: EventEmitter<any> = new EventEmitter();
    constructor(
        private _alertsService: AlertsLoaderService,
        private _apiService: ApiService
    ) {
        this.initService();
    }

    ngOnInit() {}
    initService(){
        this.service= {
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
    }
    save() {
        if(this.editMode){
            this.updateService();
            return;
        }
        let url = "/s/building/add-service-to-building/buildingId/";
        if (this.asset.assetCategory.id == "OTHER") {
            url =
                "/s/asset-type-other/add-service-to-asset-type-other/assetTypeOtherId/";
        }
        if (this.asset.assetCategory.id == "EQUIPMENT") {
            url = "/s/equipment/add-service-to-equipment/equipmentId/";
        }
        if (this.asset.assetCategory.id == "VEHICLE") {
            url = "/s/vehicle/add-service-to-vehicle/vehicleId/";
        }
        url = url + this.asset.id;
        this._apiService.put(url, this.service).subscribe(
            data => {
                this.asset = data;
                this._alertsService.success(
                    "Service successfully added to " +
                        this.asset.assetCategory.description
                );
                this.initService();
                this.addedToAsset.emit(data);
            },
            error => {
                this._alertsService.error(
                    "Some error occured. Please try again."
                );
            }
        );
    }

    editService(service: any){
        this.service = service;
        this.editMode = true;
    }
    updateService(){
        this._apiService.put("/s/service/create-or-update-service",this.service).subscribe(
            data => {
                this.service = data;
                this._alertsService.success(
                    "Service successfully updated."
                );
            },
            error => {
                this._alertsService.error(
                    "Some error occured. Please try again."
                );
            }
        );
    }
    removeServiceFromAsset(service: any){
        let url = `/s/building/remove-service-from-building/buildingId/${this.asset.id}/serviceId/${service.id}`;
        if (this.asset.assetCategory.id == "VEHICLE") {
            url = `/s/vehicle/remove-service-from-vehicle/vehicleId/${this.asset.id}/serviceId/${service.id}`;
        }
        if (this.asset.assetCategory.id == "EQUIPMENT") {
            url = `/s/equipment/remove-service-from-equipment/equipmentId/${this.asset.id}/serviceId/${service.id}`;
        }
        if (this.asset.assetCategory.id == "OTHER") {
            url =  `/s/asset-type-other/remove-service-from-asset-type-other/assetTypeOtherId/${this.asset.id}/serviceId/${service.id}`;;
        }
        this._apiService.delete(url).subscribe(
            data => {
                this.asset = data;
                this._alertsService.success(
                    "Service successfully removed from " +this.asset.assetCategory.description
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
