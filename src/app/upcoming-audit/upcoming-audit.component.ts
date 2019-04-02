import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from 'app/app.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upcoming-audit',
  templateUrl: './upcoming-audit.component.html',
  styleUrls: ['./upcoming-audit.component.css']
})
export class UpcomingAuditComponent implements OnInit {

  public loading: boolean = false;
  public Audits: any;
  public p: number = 1;
  public desc: boolean = false;
  public des: boolean = false;
  public signed: boolean = false;
  public dec: boolean = false;
  public de: boolean = false;

  constructor(private _location: Location, private httpClient: HttpClient,private router:Router) {
    sessionStorage.removeItem('systemName');
   }

  ngOnInit() {
    this.upcomingAudits();

  }

  viewApplication(system:any) {
    sessionStorage.setItem('systemName', system);
    this.router.navigate(['/system/tab2/info']);
  }

  upcomingAudits() {
    this.loading = true;
    let url = APP_CONFIG.upComingAudits
    this.httpClient.get(url)
      .subscribe((data: any) => {
        this.loading = false;
        this.Audits = data;

      }, error => {
        this.loading = false;
        console.log(error);
      });
  }


  backClicked() {
    this._location.back();
  }

  handleSort(value:any) {
    if (!this.desc) {
      let orderByValue = value;
      this.Audits.sort((a: any, b: any) => {
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
      this.Audits.sort((a: any, b: any) => {
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


  handleSort1(value:any) {
    if (!this.des) {
      let orderByValue = value;
      this.Audits.sort((a: any, b: any) => {
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
      this.Audits.sort((a: any, b: any) => {
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


  handleSort2(value:any) {
    if (!this.dec) {
      let orderByValue = value;
      this.Audits.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.dec = true;
    }
    else {
      let orderByValue = value;
      this.Audits.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.dec = false;
    }


  }

  handleSort3(value:any) {
    if (!this.de) {
      let orderByValue = value;
      this.Audits.sort((a: any, b: any) => {
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
      this.Audits.sort((a: any, b: any) => {
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

  handleSort4(value:any) {
    if (!this.signed) {
      let orderByValue = value;
      this.Audits.sort((a: any, b: any) => {
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
      this.Audits.sort((a: any, b: any) => {
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





  


}
