import { Injectable } from '@angular/core';
//import { Http, Response } from '@angular/http';

@Injectable()
export class SharedService {
        public activeView: string;
        public tabs = [
                {
                  name: "Building Details",
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
                  name: "Building Details",
                  tab:9
                }, {
                  name: "Warranty",
                  tab:10
                }, {
                  name: "Supporting Documents",
                  tab:11
                }, {
                  name: "Summary",
                  tab:12
                }
              ];
        constructor() { }

}