import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiserviceService } from '../../../../apiservice.service';
import { IMyDate, IMyDpOptions } from 'mydatepicker';
import { AppAudit, Policy } from '../../../../data.model.auditDTO';
import { UtilService } from '../../../../util.service';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { APP_CONFIG } from '../../../../app.config';
import { HttpClient } from "@angular/common/http";
import { FilterPipeDate } from '../../../locality-date-filter';
import { FilterAuditName } from '../../../locality-auditname-filter';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Chart, pattern } from 'chart.js';
import { ChartsModule } from 'ng2-charts';


import { Location } from '@angular/common';


import { NgModule, enableProdMode } from '@angular/core'

import { BrowserModule } from '@angular/platform-browser';
import { FusionChartsModule } from 'angular-fusioncharts';

// Load FusionCharts
import * as FusionCharts from 'fusioncharts';
// Load Charts module
import * as Charts from 'fusioncharts/fusioncharts.charts';
// Load fusion theme
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
FusionChartsModule.fcRoot(FusionCharts, Charts)


const data = {
  "chart": {
    "caption": "Evidence",
    "subcaption": "",
    "showvalues": "1",
    "showpercentintooltip": "0",
    "numberprefix": "",
    "enablemultislicing": "1",
    "theme": "fusion"
  },
  "data": [
    {
      "label": "Pending",
      "value": "30"
    },
    {
      "label": "Complete",
      "value": "23"
    },
    
  ]
};


const data1 = {
  "chart": {
    "caption": "Risk Level",
    "subcaption": "",
    "showvalues": "1",
    "showpercentintooltip": "0",
    "numberprefix": "",
    "enablemultislicing": "1",
    "theme": "fusion"
  },
  "data": [
    {
      "label": "Very Low",
      "value": "30"
    },
    {
      "label": "Low",
      "value": "23"
    },

    {
      "label": "Medium",
      "value": "10"
    },
    {
      "label": "High",
      "value": "33"
    },

    {
      "label": "Very High",
      "value": "53"
    },


    
  ]
};


const data2 = {
  "chart": {
    "caption": "Severity",
    "subcaption": "",
    "showvalues": "1",
    "showpercentintooltip": "0",
    "numberprefix": "",
    "enablemultislicing": "1",
    "theme": "fusion"
  },
  "data": [
    {
      "label": "Very Low",
      "value": "20"
    },
    {
      "label": "Low",
      "value": "23"
    },

    {
      "label": "Medium",
      "value": "10"
    },
    {
      "label": "High",
      "value": "33"
    },

    {
      "label": "Very High",
      "value": "63"
    },


    
  ]
};


@Component({
  selector: 'app-audit-details',
  templateUrl: './audit-details.component.html',
  styleUrls: ['./audit-details.component.css'],
  providers: [ApiserviceService]
})

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    FusionChartsModule // Include in imports
  ],
  providers: [],
  bootstrap: []
  

})





export class AuditDetailsComponent implements OnInit {

  public data: Object;
  public  width = 400;
  public height = 300;
  public type = 'pie3d';
  public dataFormat = 'json';
  public dataSource = data;
  public dataSource1 = data1;
  public dataSource2 = data2;

      
  public showPlusButton: boolean = false;





  public p: number = 1;
  public loading: boolean = false;
  public mainData: any;
  public updatedTime: any;
  public appAuditDTOs: any;
  public showEdit: boolean = true;
  public desc: boolean = false;
  public sortType: any;
  public auditType: boolean = false;
  public auditDate:boolean=false;
  public nextAuditDate:boolean=false;
  public sts:boolean=false;
  public updtBy:boolean=false;
  public updt:boolean=false;
  public updatedBy:any;
  public showPagination: boolean = true;
  constructor(private modalService: NgbModal, private http: Http,
    private _apiservice: ApiserviceService, private utilService: UtilService,
    private router: Router, private route: ActivatedRoute) {

    this.getAppId();

    UtilService.appAuditId = '';
    UtilService.auditActive = false;
    UtilService.disabled = true;
    sessionStorage.removeItem('appAuditId');
    sessionStorage.removeItem('auditActive');
    this.utilService.setEditTrue(false);
    sessionStorage.removeItem("disabled");

  }

  ngOnInit() {

  }

  getAppId() {
    this.loading = true;
    this._apiservice.viewApplication(sessionStorage.getItem('localityName'))
      .subscribe((data: any) => {
        this.loading = false;
        this.mainData = data.applicationViewDTO.acronym;
        this.updatedBy =data.applicationViewDTO.updatedBy;
        let d = new Date(data.applicationViewDTO.updatedTime);
        if (data.applicationViewDTO.appAuditDTOs === undefined) {
          this.showPagination = false;
          this.appAuditDTOs = [];
        }
        else{
          this.appAuditDTOs = data.applicationViewDTO.appAuditDTOs;
        }
        
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        this.updatedTime = month + "/" + day + "/" + year;
      }, error => {
        this.loading = false;
        console.log(error);
      });

  }

  goTo() {
    sessionStorage.setItem("disabled","true");
    this.router.navigate(['/locality/tab/Audit/Tab/first']);

  }

  showPlus() {
    this.showEdit = false;
    this.showPlusButton = true;
  }

  getAudit(id) {
    UtilService.appAuditId = id;
    sessionStorage.setItem('appAuditId', id);
    UtilService.disabled = false;
    sessionStorage.setItem("disabled","false");
    this.router.navigate(['/locality/tab/Audit/Tab/first']);
  }
  handleSort1(value) {
    if (!this.auditType) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.appAuditDTOs.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.auditType = true;
    }
    else {
      let orderByValue = value;
      this.appAuditDTOs.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.auditType = false;
    }
  }

  handleSort(value) {
    if (!this.desc) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.appAuditDTOs.sort((a: any, b: any) => {
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
      this.appAuditDTOs.sort((a: any, b: any) => {
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


  handleSort2(value) {
    if (!this.auditDate) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.appAuditDTOs.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.auditDate = true;
    }
    else {
      let orderByValue = value;
      this.appAuditDTOs.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.auditDate = false;
    }


  }

  handleSort3(value) {
    if (!this.nextAuditDate) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.appAuditDTOs.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.nextAuditDate = true;
    }
    else {
      let orderByValue = value;
      this.appAuditDTOs.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.nextAuditDate = false;
    }


  }


  handleSort4(value) {
    if (!this.sts) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.appAuditDTOs.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.sts = true;
    }
    else {
      let orderByValue = value;
      this.appAuditDTOs.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.sts = false;
    }


  }


  handleSort5(value) {
    if (!this.updtBy) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.appAuditDTOs.sort((a: any, b: any) => {
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
      this.appAuditDTOs.sort((a: any, b: any) => {
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

  handleSort6(value) {
    if (!this.updt) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.appAuditDTOs.sort((a: any, b: any) => {
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
      this.appAuditDTOs.sort((a: any, b: any) => {
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


