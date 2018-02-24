import { ApiService } from "./../../services/api.services";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AlertsLoaderService } from "../../services/alerts-loader.service";
import { SharedService } from "../../services/shared.service";

@Component({
    selector: "app-policy",
    templateUrl: "./policy.component.html",
    styleUrls: ["./policy.component.scss"]
})
export class PolicyComponent implements OnInit {
    policy: any ;
    dropDownsData: any;
    @Input() asset: any;
    @Output() addedToAsset: EventEmitter<any> = new EventEmitter();
    editMode: boolean =false;
    constructor(
        private _apiService: ApiService,
        private _alertsService: AlertsLoaderService,
        private _sharedService: SharedService
    ) {
        this.dropDownsData = this._sharedService.dropDownsData;
        this._sharedService.dropDownsService.subscribe(data => {
            this.dropDownsData = data;
        });
        this.initPolicy();
    }

    ngOnInit() {}
    initPolicy(){
        this.policy = {
            id: null,
            statusFlag: null,
            policyNumber: null,
            policyName: null,
            policyDescription: null,
            policyStartDateTime: null,
            policyEndDateTime: null,
            graceDateTime: null,
            gracePeriodInMonths: null,
            policyCoverAmount: null,
            policyPremiumAmount: null,
            policyType: {
                id: null,
                description: null
            },
            policyRenewalType: {
                id: null,
                description: null
            },
            providerName: null,
            providerDescription: null,
            providerPhone: null,
            providerEmail: null,
            providerContactPerson: null,
            comments: null,
            policyTypeOther: null,
            policyRenewalTypeOther: null,
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
            this.updatePolicy();
            return;
        }
        let url = "/building/add-policy-to-building/buildingId/";
        if (this.asset.assetCategory.id == "OTHER") {
            url =
                "/asset-type-other/add-policy-to-asset-type-other/assetTypeOtherId/";
        }
        if (this.asset.assetCategory.id == "EQUIPMENT") {
            url = "/equipment/add-policy-to-equipment/equipmentId/";
        }
        if (this.asset.assetCategory.id == "VEHICLE") {
            url = "/vehicle/add-policy-to-vehicle/vehicleId/";
        }
        url = url + this.asset.id;
        this._apiService.put(url, this.policy).subscribe(
            (data) => {
                this.asset = data;
                this._alertsService.success(
                    "Policy successfully added to" + this.asset.assetCategory.description
                );
                this.initPolicy();
                this.addedToAsset.emit(data);
            },
            (error) => {
                this._alertsService.error(
                    "Some error occured. Please try again."
                );
            }
        );
    }

    editPolicy(policy:any){
        this.policy = policy;
        this.editMode = true;
    }

    updatePolicy(){
        this._apiService.put("/policy/update-policy",this.policy).subscribe(
            data => {
                this.policy = data;
                this._alertsService.success(
                    "Policy successfully updated."
                );
                this.initPolicy();
                this.editMode = false;
            },
            error => {
                this._alertsService.error(
                    "Some error occured. Please try again."
                );
            }
        );
    }
    removePolicyFromAsset(policy: any){
        let url = `/building/remove-policy-from-building/buildingId/${this.asset.id}/policyId/${policy.id}`;
        if (this.asset.assetCategory.id == "VEHICLE") {
            url = `/vehicle/remove-policy-from-vehicle/vehicleId/${this.asset.id}/policyId/${policy.id}`;
        }
        if (this.asset.assetCategory.id == "EQUIPMENT") {
            url = `/equipment/remove-policy-from-equipment/equipmentId/${this.asset.id}/policyId/${policy.id}`;
        }
        if (this.asset.assetCategory.id == "OTHER") {
            url =  `/asset-type-other/remove-policy-from-asset-type-other/assetTypeOtherId/${this.asset.id}/policyId/${policy.id}`;;
        }
        this._apiService.delete(url).subscribe(
            data => {
                this.asset = data;
                this._alertsService.success(
                    "Policy successfully removed from " +this.asset.assetCategory.description
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
