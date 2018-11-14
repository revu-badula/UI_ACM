import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-policy-view-component',
  templateUrl: './policy-view-component.component.html',
  styleUrls: ['./policy-view-component.component.css']
})
export class PolicyViewComponentComponent implements OnInit {
  @Output() featureSelected = new EventEmitter<string>();
   color: String;

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  constructor(private _location: Location) { }

  ngOnInit() {
  }
  
  backClicked() {
    this._location.back();
  }
  
  @HostListener('window:scroll', [])
  onWindowScroll() {

    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 100) {
      this.color = 'online';
    } else {
      this.color = 'offline';
    }

  }

   getColor() {
    // return this.color === 'online' ? '#ffffff' : 'white';
  }

  getOpacity() {
    // return this.color === 'online' ? 0.8 : 1;
  }
  

}
