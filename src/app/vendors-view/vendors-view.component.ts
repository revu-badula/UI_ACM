import { ApiserviceService } from '../apiservice.service';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-vendors-view',
  templateUrl: './vendors-view.component.html',
  styleUrls: ['./vendors-view.component.css'],
  providers: [ApiserviceService]
})
export class VendorsViewComponent implements OnInit {

  public vendors: any;
  public vendorsContact: any;
  public desc = false;
  public des = false;
  public email: boolean = false;
  public ph: boolean = false;
  public updtBy: boolean = false;
  public updt: boolean = false;
  public lname: boolean = false;
  public p: number = 1;
  public loading: boolean = false;
  constructor(private _location: Location, private _apiservice: ApiserviceService, private router: Router) { }

  ngOnInit() {
    this.getVendors();

  }

  getVendors() {
    this.loading = true;
    this._apiservice.getVendors()
      .subscribe((data: any) => {
        this.loading = false;
        this.vendors = data.vendorsDTOs;
        this.vendorsContact = data.vendorsDTOs.vendorContact;
      }, error => {
        this.loading = false;
        console.log(error);
      });
  }


  handleSort() {

    if (!this.desc) {
      this.vendors.sort(this.doAsc);
      this.desc = true;
    }
    else {
      this.vendors.sort(this.doDsc);
      this.desc = false;
    }

  }

  doAsc(a, b) {


    if (a.name > b.name) {
      return -1;
    } else if (a.name < b.name) {
      return 1;
    }
    return 0;
  }

  doDsc(a, b) {

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



  handleSorted() {

    if (!this.des) {
      this.vendors.vendorsContact.sort(this.doAs);
      this.des = true;
    }
    else {
      this.vendors.vendorsContact.sort(this.doDs);
      this.des = false;
    }

  }

  doAs(a, b) {


    if (a.firstName + "" + a.lastName > b.firstName + "" + b.lastName) {
      return -1;
    } else if (a.firstName + "" + a.lastName < b.firstName + "" + b.lastName) {
      return 1;
    }
    return 0;
  }

  doDs(a, b) {

    if (a.firstName + "" + a.lastName < b.firstName + "" + b.lastName) {
      return -1;
    } else if (a.firstName + "" + a.lastName > b.firstName + "" + b.lastName) {
      return 1;
    }
    return 0;
  }





  handleSort3(value) {
    // this.vendorsContact=[];
    // this.vendors.vendorContact=[];
    // for (let i = 0; i < this.vendors.length; i++) {
    //   this.vendorsContact.push(this.vendors[i].vendorContact);
    // }
    if (!this.lname) {
      //this.policies.sort(this.doAsc);
      // let orderByValue = value;
      // this.vendorsContact.sort((a: any, b: any) => {
      //   if (a[orderByValue] > b[orderByValue]) {
      //     return -1;
      //   } else if (a[orderByValue] < b[orderByValue]) {
      //     return 1;
      //   } else {
      //     return 0;
      //   }
      // });
      // for (let i = 0; i < this.vendorsContact.length; i++) {
      //   this.vendors.vendorContact.push(this.vendorsContact[i]);
      // }
      // //this.vendors.vendorContact = this.vendorsContact;
      // this.vendors = this.vendors;
      //console.log(this.vendorsContact);
      this.vendors.sort((a,b) => a.vendorContact.firstName.localeCompare(b.vendorContact.firstName));
      //console.log(this.vendors);
      this.lname = true;
    }
    else {
      // let orderByValue = value;
      // this.vendorsContact.sort((a: any, b: any) => {
      //   if (a[orderByValue] < b[orderByValue]) {
      //     return -1;
      //   } else if (a[orderByValue] > b[orderByValue]) {
      //     return 1;
      //   } else {
      //     return 0;
      //   }
      // });
      // //this.policies.sort(this.doDsc);
      // this.vendors.vendorContact = this.vendorsContact;
      // for (let i = 0; i < this.vendorsContact.length; i++) {
      //   this.vendors.vendorContact.push(this.vendorsContact[i]);
      // }
      // //console.log(this.vendors);
      // this.vendors = this.vendors;
      //console.log(this.vendorsContact);
      this.vendors.sort((a,b) => b.vendorContact.firstName.localeCompare(a.vendorContact.firstName));
      //console.log(this.vendors);
      this.lname = false;
    }
  


  }



  handleSort4(value) {
    if (!this.email) {
      // //this.policies.sort(this.doAsc);
      // let orderByValue = value;
      // this.vendors.vendorsContact.sort((a: any, b: any) => {
      //   if (a[orderByValue] > b[orderByValue]) {
      //     return -1;
      //   } else if (a[orderByValue] < b[orderByValue]) {
      //     return 1;
      //   } else {
      //     return 0;
      //   }
      // });
      this.vendors.sort((a,b) => a.vendorContact.emailId.localeCompare(b.vendorContact.emailId));
       this.email = true;
    }
    else {
    //   let orderByValue = value;
    //   this.vendors.vendorsContact.sort((a: any, b: any) => {
    //     if (a[orderByValue] < b[orderByValue]) {
    //       return -1;
    //     } else if (a[orderByValue] > b[orderByValue]) {
    //       return 1;
    //     } else {
    //       return 0;
    //     }
    //   });
    //   //this.policies.sort(this.doDsc);
    this.vendors.sort((a,b) => b.vendorContact.emailId.localeCompare(a.vendorContact.emailId));
       this.email = false;
     }


  }




  handleSort5(value) {
    if (!this.ph) {
      //this.policies.sort(this.doAsc);
      // let orderByValue = value;
      // this.vendors.vendorsContact.sort((a: any, b: any) => {
      //   if (a[orderByValue] > b[orderByValue]) {
      //     return -1;
      //   } else if (a[orderByValue] < b[orderByValue]) {
      //     return 1;
      //   } else {
      //     return 0;
      //   }
      // });
      this.vendors.sort((a,b) => a.vendorContact.phoneNumber.localeCompare(b.vendorContact.phoneNumber));
      this.ph = true;
    }
    else {
      // let orderByValue = value;
      // this.vendors.vendorsContact.sort((a: any, b: any) => {
      //   if (a[orderByValue] < b[orderByValue]) {
      //     return -1;
      //   } else if (a[orderByValue] > b[orderByValue]) {
      //     return 1;
      //   } else {
      //     return 0;
      //   }
      // });
      //this.policies.sort(this.doDsc);
      this.vendors.sort((a,b) => b.vendorContact.phoneNumber.localeCompare(a.vendorContact.phoneNumber));
      this.ph = false;
    }


  }



  handleSort6(value) {
    if (!this.updtBy) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.vendors.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.updtBy = true;
    }
    else {
      let orderByValue = value;
      this.vendors.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.updtBy = false;
    }


  }



  handleSort7(value) {
    if (!this.updt) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.vendors.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.updt = true;
    }
    else {
      let orderByValue = value;
      this.vendors.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.updt = false;
    }


  }





}
