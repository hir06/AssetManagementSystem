import { ApiService } from './api.services';
import { Injectable } from '@angular/core';
//import { Http, Response } from '@angular/http';

@Injectable()
export class SharedService {
        public activeView: string;
        public dropDownsData: any = {};
        public tabs = [
                {
                  name: "Asset Details",
                  tab:1
                }, {
                  name: "Maintenance",
                  tab:2
                }, {
                  name: "Inspection",
                  tab:3
                }, {
                  name: "License",
                  tab:4
                }, {
                  name: "Loan",
                  tab:5
                }, {
                  name: "Policy",
                  tab:6
                }, {
                  name: "Rental/Lease",
                  tab:7
                }, {
                  name: "Service",
                  tab:8
                }, {
                  name: "Warranty",
                  tab:9
                }, {
                  name: "Documents",
                  tab:10
                }, {
                  name: "Summary",
                  tab:11
                }
              ];
        constructor(private _apiService: ApiService) { }
        getAssetType(){
          this._apiService.get("/s/table-maintenance/asset-type/asset-types").subscribe(
              (data)=>{
                  this.dropDownsData.assetTypeData = data;
              },(error)=>{
                  console.log(error);
              }
          );
      }

      getRentOrLeaseType(){
        this._apiService.get("/s/table-maintenance/rental-or-lease-type/rental-or-lease-types").subscribe(
          (data)=>{
              console.log(data);
              this.dropDownsData.rentOrLeaseType = data;
          },(error)=>{
              console.log(error);
          }
      );
      }

      getAssetConditionList(){
        this._apiService.get("/s/table-maintenance/asset-condition/asset-conditions").subscribe(
          (data)=>{
              console.log(data);
              this.dropDownsData.rentOrLeaseType = data;
          },(error)=>{
              console.log(error);
          }
      );
      }

      getAssetStatusList(){
        this._apiService.get("/s/table-maintenance/asset-status/asset-statuses").subscribe(
          (data)=>{
              console.log(data);
              this.dropDownsData.rentOrLeaseType = data;
          },(error)=>{
              console.log(error);
          }
      );
      }

      getRenewalTypeList(){
        this._apiService.get("/s/table-maintenance/renewal-type/renewal-types").subscribe(
          (data)=>{
              console.log(data);
              this.dropDownsData.rentOrLeaseType = data;
          },(error)=>{
              console.log(error);
          }
      );
      }
      getExtinguisherTypeList(){
        this._apiService.get("/s/table-maintenance/fire-extinguisher-type/fire-extinguisher-types").subscribe(
          (data)=>{
              console.log(data);
              this.dropDownsData.rentOrLeaseType = data;
          },(error)=>{
              console.log(error);
          }
      );
      }
      getVehicleTypeList(){
        this._apiService.get("/s/table-maintenance/vehicle-type/vehicle-types").subscribe(
          (data)=>{
              console.log(data);
              this.dropDownsData.rentOrLeaseType = data;
          },(error)=>{
              console.log(error);
          }
      );
      }
      getMonthTypeList(){
        ///s/table-maintenance/month-type/month-types
        this._apiService.get("/s/table-maintenance/month-type/month-types").subscribe(
          (data)=>{
              console.log(data);
              this.dropDownsData.rentOrLeaseType = data;
          },(error)=>{
              console.log(error);
          }
      );
      }
}