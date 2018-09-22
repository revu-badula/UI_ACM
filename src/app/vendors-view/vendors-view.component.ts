import { ApiserviceService } from '../apiservice.service';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-vendors-view',
  templateUrl: './vendors-view.component.html',
  styleUrls: ['./vendors-view.component.css'],
  providers: [ ApiserviceService ]
})
export class VendorsViewComponent implements OnInit {

    public vendors:any;
  public vendorsContact:any;
   public desc = false;
   public des = false;
   public p:number =1;
  public loading:boolean = false;
  constructor(private _location: Location,private _apiservice: ApiserviceService,private router: Router) { }

  ngOnInit() {
    this.getVendors()
    this.loading = true;

  }
  
    getVendors()
  {
     this._apiservice.getVendors()
    .subscribe((data:any) => {
      this.loading = false;
    this.vendors = data.vendorsDTOs.sort(function(val1, val2){
    return val1.name > val2.name
});
      this.vendorsContact=data.vendorsDTOs.vendorContact;
      console.log("this.vendors",this.vendors);
    },error => console.log(error));
  }
  
  
  handleSort(){

    console.log("headerClick");
    if(!this.desc) {
      this.vendors.sort(this.doAsc);
      this.desc = true;
    }
    else {
       this.vendors.sort(this.doDsc);
       this.desc = false;
    }

  }

  doAsc(a, b) {
    console.log(a.name, b.name);
  
    if (a.name > b.name) {
      return -1;
    } else if (a.name < b.name) {
      return 1;
    }
    return 0;
  }

  doDsc(a, b) {
     console.log(a.name, b.name);
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    }
    return 0;
  }
   backClicked() {
        this._location.back();
    }
  
  
  
  handleSorted(){

    console.log("headerClick");
    if(!this.des) {
      this.vendors.sort(this.doAs);
      this.des = true;
    }
    else {
       this.vendors.sort(this.doDs);
       this.des = false;
    }

  }

  doAs(a, b) {
    console.log(a.firstName + " " + a.lastName, b.firstName + " " + b.lastName);
  
    if (a.firstName + " " + a.lastName > b.firstName + " " + b.lastName) {
      return -1;
    } else if (a.firstName + " " + a.lastName < b.firstName + " " + b.lastName) {
      return 1;
    }
    return 0;
  }

  doDs(a, b) {
     console.log(a.firstName + " " + a.lastName, b.firstName + " " + b.lastName);
    if (a.firstName + " " + a.lastName < b.firstName + " " + b.lastName) {
      return -1;
    } else if (a.firstName + " " + a.lastName > b.firstName + " " + b.lastName) {
      return 1;
    }
    return 0;
  }
  
  
  
  
  
  
  
  
  
  
  
  
  /*openVendorEdit(id)
  {
    this.router.navigate(['/editVendors/' + id]);
  }*/

}
