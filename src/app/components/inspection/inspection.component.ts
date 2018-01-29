import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.scss']
})
export class InspectionComponent implements OnInit {
  inspection:any;
  @Input() asset: any;
  constructor() { }

  ngOnInit() {
  }

}
