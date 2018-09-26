import { ApiserviceService } from '../apiservice.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-solution-view-component',
  templateUrl: './solution-view-component.component.html',
  styleUrls: ['./solution-view-component.component.css'],
  providers: [ ApiserviceService ]
})
export class SolutionViewComponentComponent implements OnInit {
  
  constructor(private _location: Location,private _apiservice: ApiserviceService) { }

  ngOnInit() {
  
   
    //this.getVendors();
 
  }
  
   backClicked() {
        this._location.back();
    }
  
  
  /*getVendors()
  {
     this._apiservice.getVendors()
    .subscribe((data:any) => {
     this.vendors = data.vendorsDTOs;
      this.vendorsContact=data.vendorsDTOs.vendorContact;
      console.log(data);
      
    },error => console.log(error));
  }*/

}
