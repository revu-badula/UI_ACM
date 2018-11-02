import { Component, OnInit, HostListener } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.css']
})
export class OptionListComponent implements OnInit {
  color: String;

  constructor(private _location: Location) { }

  ngOnInit() {
  }
  
  @HostListener("window:scroll", [])
  onWindowScroll() {

    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 100) {
      this.color = 'online';
    } else {
        this.color = 'offline';

    }

  }
  
  getColor() {

  }
  
  getOpacity(){
  }
  
  backClicked() {
        this._location.back();
    }

}
