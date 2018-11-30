import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';
import { Http } from '@angular/http';
import { UtilService } from '../../util.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-report-vendor',
  templateUrl: './report-vendor.component.html',
  styleUrls: ['./report-vendor.component.css']
})
export class ReportVendorComponent implements OnInit {
  color: String;
  public vendorTypes: any;
  public venTypes: any;
  public desc: boolean = false;
  public p: number = 1;
  public showTable: boolean = false;
  public loading: boolean = false;
  public firstName: boolean = false;
  public solutionName: boolean = false;
  public solutionVersionName: boolean = false;
  constructor(private _apiservice: ApiserviceService,
    private http: Http, private modalService: NgbModal, private utilservice: UtilService,
    private router: Router, private _location: Location) { }

  ngOnInit() {
    this.showVendor();
  }
  getColor() {
    // return this.color === 'online' ? '#ffffff' : 'white';
  }
  getOpacity() {
    // return this.color === 'online' ? 0.8 : 1;
  }


  showVendor() {
    this.loading = true;
    this._apiservice.getVendors()
      .subscribe((data: any) => {
        this.loading = false;
        this.vendorTypes = data.vendorsDTOs;
      }, error => {
        this.loading = false;
        console.log(error);
      });

  }

  someVendor(value) {

    if (value === 'Choose...' || value === "") {
      this.venTypes = [];
    }
    else {
      this.loading = true;
      this._apiservice.getLocOnVendors(value)
        .subscribe((data: any) => {
          this.loading = false;
          this.showTable = true;
          this.venTypes = data;
        }, error => {
          this.loading = false;
          console.log(error)
        });
    }
  }
  backClicked() {
    this._location.back();
  }

  handleSort(value) {
    if (!this.desc) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.venTypes.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.desc = true;
    }
    else {
      let orderByValue = value;
      this.venTypes.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.desc = false;
    }


  }

  handleSort1(value) {

    if (!this.firstName) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.venTypes.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.firstName = true;
    }
    else {
      let orderByValue = value;
      this.venTypes.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.firstName = false;
    }


  }


  handleSort2(value) {

    if (!this.solutionName) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.venTypes.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.solutionName = true;
    }
    else {
      let orderByValue = value;
      this.venTypes.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.solutionName = false;
    }


  }


  handleSort3(value) {

    if (!this.solutionVersionName) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.venTypes.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.solutionVersionName = true;
    }
    else {
      let orderByValue = value;
      this.venTypes.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.solutionVersionName = false;
    }


  }

  // handleSort4(value) {

  //   if (!this.venName) {
  //     //this.policies.sort(this.doAsc);
  //     let orderByValue = value;
  //     this.venTypes.sort((a: any, b: any) => {
  //       if (a[orderByValue] > b[orderByValue]) {
  //         return -1;
  //       } else if (a[orderByValue] < b[orderByValue]) {
  //         return 1;
  //       } else {
  //         return 0;
  //       }
  //     });
  //     this.venName = true;
  //   }
  //   else {
  //     let orderByValue = value;
  //     this.venTypes.sort((a: any, b: any) => {
  //       if (a[orderByValue] < b[orderByValue]) {
  //         return -1;
  //       } else if (a[orderByValue] > b[orderByValue]) {
  //         return 1;
  //       } else {
  //         return 0;
  //       }
  //     });
  //     //this.policies.sort(this.doDsc);
  //     this.venName = false;
  //   }


  // }

  // handleSort5(value) {

  //   if (!this.verNum) {
  //     //this.policies.sort(this.doAsc);
  //     let orderByValue = value;
  //     this.venTypes.sort((a: any, b: any) => {
  //       if (a[orderByValue] > b[orderByValue]) {
  //         return -1;
  //       } else if (a[orderByValue] < b[orderByValue]) {
  //         return 1;
  //       } else {
  //         return 0;
  //       }
  //     });
  //     this.verNum = true;
  //   }
  //   else {
  //     let orderByValue = value;
  //     this.venTypes.sort((a: any, b: any) => {
  //       if (a[orderByValue] < b[orderByValue]) {
  //         return -1;
  //       } else if (a[orderByValue] > b[orderByValue]) {
  //         return 1;
  //       } else {
  //         return 0;
  //       }
  //     });
  //     //this.policies.sort(this.doDsc);
  //     this.verNum = false;
  //   }


  // }

  getVendor(id) {
    let url ="editVendors"+"/"+id;
    this.router.navigateByUrl(url);

  }


}
