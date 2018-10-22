import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';
import { Http } from '@angular/http';
import { UtilService } from '../../util.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { Cookie } from 'ng2-cookies';
@Component({
  selector: 'app-report-vendor',
  templateUrl: './report-vendor.component.html',
  styleUrls: ['./report-vendor.component.css']
})
export class ReportVendorComponent implements OnInit {
 color: String;
<<<<<<< HEAD
 public vendorTypes:any;
 public venTypes:any;
=======
 public desc:boolean=false;
 public p:number=1;
>>>>>>> branch 'master' of https://github.com/revu-badula/UI_ACM.git
constructor(private _apiservice: ApiserviceService,
    private http: Http, private modalService: NgbModal, private utilservice: UtilService,
    private router: Router){}

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
  
someVendor(value){

   if (value === 'Choose...' || value === "") {
      this.venTypes = [];
    }
    else {
    
 
    
    this._apiservice.getLocOnVendors(value)
        .subscribe((data: any) => {
        this.venTypes = data;
        for(let i=0;i<data.length;i++)
        {
        let k=data[i].appSolutionDTOs;
        if(k.length > 0)
        {
        for(let j=0;j<k.length;j++)
        {
        let applicationName =k[j].applicationName;
        }
        }
       
       
        }
      }, error => { console.log(error) });
   }
}  
  

}
