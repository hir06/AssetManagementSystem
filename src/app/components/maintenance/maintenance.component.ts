import { ApiService } from './../../services/api.services';
import { Component, OnInit, Input } from '@angular/core';
import { AlertsLoaderService } from '../../services/alerts-loader.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {
  maintenance:any = {
    "id": null,
    "statusFlag": null,
    "agreementId": null,
    "agreementName": null,
    "agreementDescription": null,
    "companyName": null,
    "companyDescription": null,
    "companyPhone": null,
    "companyEmail": null,
    "companyContactPerson": null,
    "startDateTime": null,
    "endDateTime": null,
    "graceDateTime": null,
    "amcAmount": null,
    "gracePeriodInMonths": null,
    "comments": null,
    "buildings": null,
    "equipments": null,
    "vehicles": null,
    "assetTypeOthers": null,
    "existingBuildings": null,
    "existingEquipments": null,
    "existingVehicles": null,
    "existingAssetTypeOthers": null
  };
  @Input() asset: any;
  constructor(private _apiService: ApiService,private _alertsService: AlertsLoaderService) { }

  ngOnInit() {
  }

  save(){
    let url = "/s/building/add-amc-to-building/buildingId/";
    if(this.asset.assetCategory.id == "VEHICLE"){
      url = "/s/asset-type-other/add-amc-to-asset-type-other/assetTypeOtherId/";
    }
    if(this.asset.assetCategory.id == "EQUIPMENT"){
      url = "/s/equipment/add-amc-to-equipment/equipmentId/";
    }
    if(this.asset.assetCategory.id == "OTHER"){
      url = "/s/vehicle/add-amc-to-vehicle/vehicleId/";
    }
    url  = url + this.asset.id;
    this._apiService.put(url, this.maintenance).subscribe(
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
    )
  }
}
