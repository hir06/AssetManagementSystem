import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {
  maintenance:any;
  @Input() asset: any;
  constructor() { }

  ngOnInit() {
  }

}
