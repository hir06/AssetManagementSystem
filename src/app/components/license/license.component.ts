import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.scss']
})
export class LicenseComponent implements OnInit {
  license :any;
  @Input() asset: any;
  constructor() { }

  ngOnInit() {
  }

}
