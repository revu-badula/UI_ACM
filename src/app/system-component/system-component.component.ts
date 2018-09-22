import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-system-component',
  templateUrl: './system-component.component.html',
  styleUrls: ['./system-component.component.css']
})
export class SystemComponentComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }
  backClicked() {
    this._location.back();
}

}
