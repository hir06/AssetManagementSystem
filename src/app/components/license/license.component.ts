import { AlertsLoaderService } from "./../../services/alerts-loader.service";
import { Component, OnInit, Input } from "@angular/core";
import { ApiService } from "../../services/api.services";

@Component({
    selector: "app-license",
    templateUrl: "./license.component.html",
    styleUrls: ["./license.component.scss"]
})
export class LicenseComponent implements OnInit {
    license: any = {
        id: null,
        statusFlag: null,
        licenseNumber: null,
        licenseHolderName: null,
        licenseHoldingCompany: null,
        licenseHolderDescription: null,
        licenseHolderPhone: null,
        licenseHolderEmail: null,
        licenseProvidedBy: null,
        licenseProvidingAuthority: null,
        licenseProviderDescription: null,
        licenseProviderPhone: null,
        licenseProviderEmail: null,
        placeIssued: null,
        issuedDate: null,
        startDateTime: null,
        endDateTime: null,
        graceDateTime: null,
        renewalDate: null,
        gracePeriodInMonths: null,
        licenseAmount: null,
        renewalAmount: null,
        comments: null
    };
    @Input() asset: any;
    constructor(
        private _alertsService: AlertsLoaderService,
        private _apiService: ApiService
    ) {}

    ngOnInit() {}

    save() {
        let url = "/s/building/add-license-to-building/buildingId/";
        if (this.asset.assetCategory.id == "VEHICLE") {
            url =
                "/s/asset-type-other/add-license-to-asset-type-other/assetTypeOtherId/";
        }
        if (this.asset.assetCategory.id == "EQUIPMENT") {
            url = "/s/equipment/add-license-to-equipment/equipmentId/";
        }
        if (this.asset.assetCategory.id == "OTHER") {
            url = "/s/vehicle/add-license-to-vehicle/vehicleId/";
        }
        url = url + this.asset.id;
        this._apiService.put(url, this.license).subscribe(
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
