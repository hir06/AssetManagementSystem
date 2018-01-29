import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-warranty',
  templateUrl: './warranty.component.html',
  styleUrls: ['./warranty.component.scss']
})
export class WarrantyComponent implements OnInit {
  warranty:any;
  @Input() asset: any;
  constructor() { }

  ngOnInit() {
  }

}
