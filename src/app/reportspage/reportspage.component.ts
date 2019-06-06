import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from 'app/app.config';
import { UserReportRequest } from '../data_model_legal';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-reportspage',
  templateUrl: './reportspage.component.html',
  styleUrls: ['./reportspage.component.css']
})
export class ReportspageComponent implements OnInit {

  public loading: boolean = false;
  public userRoles: any;
  public Users: any;
  public tableUsers: any
  public userRoleId: any;
  public showTable: boolean = false;
  public showOverall: boolean = false;
  user: UserReportRequest;
  public reports: any;
  public tech: any;
  public showDApp: boolean = false;
  public showTech: boolean = false;
  public showReports: boolean = false;
  public selectRep: any;
  public databaseData: any;
  public serverData: any;
  public techData: any;
  public DST:any;
  public showOverallTable: boolean = false;
  public signed:boolean=false;
  public desc:boolean=false;
  public des:boolean=false;
  public de:boolean=false;
  public scheduled:boolean=false;
  public unscheduled:boolean=false;
  public firstTab:boolean = true;
  constructor(private httpClient: HttpClient,
     private _location: Location,private router: Router,private alertService: AlertService) {
    this.user = new UserReportRequest();
    sessionStorage.removeItem('systemName');
    sessionStorage.removeItem('systemActive');
  }

  ngOnInit() {
    this.getUserRoles();
  }

  getUserRoles() {
    this.loading = true;
    let url = APP_CONFIG.getUserRoles
    this.httpClient.get(url)
      .subscribe((data: any) => {
        this.loading = false;
        this.userRoles = data;
      }, error => {
        this.loading = false;
        console.log(error);
      });
  }

  getUserRoleId(value: any) {
    if (value === "") {
      this.user.appRoleId = null;
    }
    else {
      let url = APP_CONFIG.getUsersonRole;
      this.loading = true;
      this.user.appRoleId = value;
      this.httpClient.get(url + "?" + "role=" + value)
        .subscribe((data: any) => {
          this.loading = false;
          this.Users = data;
        }, error => {
          this.loading = false;
          console.log(error);
        });
    }
  }

  getUsers(value: any) {
    if (value === "") {
    }
    else {
      let url = APP_CONFIG.getUserApps;
      this.loading = true;
      this.user.userId = value;
      this.httpClient.post(url, this.user)
        .subscribe((data: any) => {
          this.loading = false;
          this.tableUsers = data.applicationDTOs;
          this.showTable = true;
        }, error => {
          this.loading = false;
          console.log(error);

        });
    }

  }

  getValue(value: any) {
    this.showReports = false;
    this.showTable = false;
    this.showOverall = false;
    this.showOverallTable = false;
    if (value === 'true') {
      this.showReports = true;
    }
    else {
      this.showOverall = true;
    }
  }

  backClicked() {
    this._location.back();
  }

  getReport(value: any) {
    this.showReports = false;
    this.showTable = false;
    this.showDApp = false;
    this.showTech = false;
    this.reports = [];
    this.tech = [];
    this.DST=[];
    this.selectRep = "";
    if (value === "") {

    }
    else {
      if (value === 'database') {
        this.loading = true;
        this.selectRep = "database";
        let url = APP_CONFIG.getDatabases;
        this.httpClient.get(url)
          .subscribe((data: any) => {
            this.loading = false;
            this.reports = data;
            this.showDApp = true;
          }, error => {
            this.loading = false;
            console.log(error);

          });
      }
      else if (value === 'appServer') {
        this.loading = true;
        this.selectRep = "appServer";
        let url = APP_CONFIG.getApplicationServers;
        this.httpClient.get(url)
          .subscribe((data: any) => {
            this.loading = false;
            this.reports = data;
            this.showDApp = true;
          }, error => {
            this.loading = false;
            console.log(error);

          });

      }
      else if (value === 'technology') {
        this.loading = true;
        this.selectRep = "technology";
        let url = APP_CONFIG.getTechnologies;
        this.httpClient.get(url)
          .subscribe((data: any) => {
            this.loading = false;
            this.tech = data;
            this.showTech = true;
          }, error => {
            this.loading = false;
            console.log(error);

          });
      }
    }
  }

  getReportFor(value: any) {
    if (value === "") { }
    else {
      if (this.selectRep === "database") {
        this.loading = true;
        let url = APP_CONFIG.getDatabaseReport;
        this.httpClient.get(url + "?" + "databaseId=" + value)
          .subscribe((data: any) => {
            this.loading = false;
            this.DST = data.applicationDTOs;
            this.showOverallTable=true;
          }, error => {
            this.loading = false;
            console.log(error);
          });
      }
      else if (this.selectRep === "appServer") {
        this.loading = true;
        let url = APP_CONFIG.getServerReport;
        this.httpClient.get(url + "?" + "serverId=" + value)
          .subscribe((data: any) => {
            this.loading = false;
            this.DST = data.applicationDTOs;
            this.showOverallTable=true;
          }, error => {
            this.loading = false;
            console.log(error);
          });
      }
      else if (this.selectRep === "technology") {
        this.loading = true;
        let url = APP_CONFIG.getTechReport;
        this.httpClient.get(url + "?" + "techId=" + value)
          .subscribe((data: any) => {
            this.loading = false;
            this.DST = data.applicationDTOs;
            this.showOverallTable=true;
          }, error => {
            this.loading = false;
            console.log(error);
          });
      }
    }
  }

  goTo(system:any)
  {
    sessionStorage.setItem('systemName', system);
    this.router.navigate(['/system/tab2/info']);
  }


  handleSort1(value:any) {
    if (!this.signed) {
      let orderByValue = value;
      this.DST.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.signed = true;
    }
    else {
      let orderByValue = value;
      this.DST.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.signed = false;
    }


  }


  handleSort2(value:any) {
    if (!this.desc) {
      let orderByValue = value;
      this.DST.sort((a: any, b: any) => {
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
      this.DST.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.desc = false;
    }


  }

  handleSort3(value:any) {
    if (!this.des) {
      let orderByValue = value;
      this.DST.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.des = true;
    }
    else {
      let orderByValue = value;
      this.DST.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.des = false;
    }


  }

  handleSort4(value:any) {
    if (!this.de) {
      let orderByValue = value;
      this.DST.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.de = true;
    }
    else {
      let orderByValue = value;
      this.DST.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.de = false;
    }


  }

  goToIncident()
  {
    this.router.navigate(['/incidentStart/true']);
  }




}



