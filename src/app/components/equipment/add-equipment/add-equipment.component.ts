import { ApiService } from './../../../services/api.services';
import { SharedService } from "./../../../services/shared.service";
import { Component, OnInit } from "@angular/core";
import { AlertsLoaderService } from '../../../services/alerts-loader.service';

@Component({
    selector: "app-add-equipment",
    templateUrl: "./add-equipment.component.html",
    styleUrls: ["./add-equipment.component.scss"]
})
export class AddEquipmentComponent implements OnInit {
    equipment: any = {
        id: null,
        assets: null,
        statusFlag: null,
        equipmentId: null,
        equipmentDetails: null,
        serialNumber: null,
        assetCategory: {
            id: "EQUIPMENT"
        },
        addresses: [],
        insurancePolicies: null,
        rentalOrLeaseAgreements: null,
        loanAgreements: null,
        annualMaintenanceContracts: null,
        licenses: null,
        warrantyAgreements: null,
        inspections: null,
        services: null,
        existingInsurancePolicies: null,
        existingRentalOrLeaseAgreements: null,
        existingLoanAgreements: null,
        existingAnnualMaintenanceContracts: null,
        existingLicenses: null,
        existingWarrantyAgreements: null,
        existingInspections: null,
        existingServices: null,
        assignees: null,
        equipmentName: null,
        equipmentTag: null,
        equipmentCost: null,
        equipmentLength: null,
        equipmentWidth: null,
        equipmentHeight: null,
        equipmentWeight: null,
        equipmentQuantity: null,
        equipmentMake: null,
        equipmentModel: null,
        assetCondition: {
            id: null
        },
        assetStatus: {
            id: null
        },
        assetType: {
            id: null
        },
        assetConditionOther: null,
        assetStatusOther: null,
        assetTypeOther: null,
        equipmentPurchasedDate: null,
        equipmentPurchasedFrom: null,
        equipmentCompanyPhone: null,
        equipmentCompanyEmail: null,
        equipmentCompanyContactPerson: null,
        equipmentCompanyComments: null,
        orderNumber: null,
        invoiceNumber: null,
        equipmentDamageDesc: null,
        equipmentReturnedDate: null,
        refundAmount: null,
        equipmentReturned: null,
        equipmentReturnedReason: null,
        organization: {
            id: null
        },
        department: {
            id: null
        },
        regulatoryCompliance: null,
        regulatoryAuthorityName: null,
        regCompObtainedDate: null,
        fireExtinguishers: null,
        fireExits: null,
        amcPresent: "N",
        insurancePresent: "N",
        loanPresent: "N",
        licensePresent: "N",
        warrantyPresent: "N",
        inspectionPresent: "N",
        servicePresent: "N",
        fireExitsLoc: null,
        fireExtinguisherLoc: null,
        fireExtinguisherTypes: []
    };
    public currentTab: any;
    public tabs: any;
    public dropDownsData: any = {};
    constructor(private _sharedService: SharedService,private _apiService: ApiService, private _alertsService: AlertsLoaderService) {
        this.tabs = this._sharedService.getTabstoShow(this.equipment);
        this.currentTab = this.tabs[0];
        this._sharedService.dropDownsService.subscribe(data => {
            this.dropDownsData = data;
        });
    }
    ngOnInit() {}
    changeTab(tab: string) {
        if(!this.equipment.id){
            this._alertsService.error("Please save building details first.");
            return;
        }
        this.currentTab = tab;
    }
    updateTabs() {
        this.tabs = this._sharedService.getTabstoShow(this.equipment);
    }
    save(){
      this._apiService.createOrUpdateEquipment("/s/equipment/create-or-update-equipment",this.equipment)
      .subscribe(
          (data)=>{
              this.equipment = data;
              this._alertsService.success("Equipment successfully saved");
          },
          (error)=>{
            this._alertsService.success("Error occured while saving equpment details");
          }
      )
  }
}
