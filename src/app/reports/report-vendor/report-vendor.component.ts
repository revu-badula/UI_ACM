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
  constructor(private _apiservice: ApiserviceService,
    private http: Http, private modalService: NgbModal, private utilservice: UtilService,
    private router: Router,  private _location: Location) { }

  ngOnInit() {
    this.showVendor();
  }
  getColor() {
    return this.color === 'online' ? '#ffffff' : 'white';
  }
  getOpacity() {
    return this.color === 'online' ? 0.8 : 1;
  }


  showVendor() {
    this._apiservice.getVendors()
      .subscribe((data: any) => {
        this.vendorTypes = data.vendorsDTOs;
      }, error => { console.log(error); });

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

}
