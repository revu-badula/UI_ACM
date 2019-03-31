import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from 'app/app.config';

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

  constructor(private _location: Location, private httpClient: HttpClient) { }

  ngOnInit() {
    this.upcomingAudits();

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

  handleSort() {

    if (!this.desc) {
      this.Audits.sort(this.doAsc);
      this.desc = true;
    }
    else {
      this.Audits.sort(this.doDsc);
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


  handleSorta() {

    if (!this.des) {
      this.Audits.sort(this.doAs);
      this.des = true;
    }
    else {
      this.Audits.sort(this.doDs);
      this.des = false;
    }

  }

  doAs(a, b) {

    if (a.vendor.name > b.vendor.name) {
      return -1;
    } else if (a.vendor.name < b.vendor.name) {
      return 1;
    }
    return 0;
  }

  doDs(a, b) {
    if (a.vendor.name < b.vendor.name) {
      return -1;
    } else if (a.vendor.name > b.vendor.name) {
      return 1;
    }
    return 0;
  }




  handleSortb() {

    if (!this.dec) {
      this.Audits.sort(this.doA);
      this.dec = true;
    }
    else {
      this.Audits.sort(this.doD);
      this.dec = false;
    }

  }

  doA(a, b) {

    if (a.solutionTypeName > b.solutionTypeName) {
      return -1;
    } else if (a.solutionTypeName < b.solutionTypeName) {
      return 1;
    }
    return 0;
  }

  doD(a, b) {
    if (a.solutionTypeName < b.solutionTypeName) {
      return -1;
    } else if (a.solutionTypeName > b.solutionTypeName) {
      return 1;
    }
    return 0;
  }



  handleSortc() {

    if (!this.de) {
      this.Audits.sort(this.doAc);
      this.de = true;
    }
    else {
      this.Audits.sort(this.doDc);
      this.de = false;
    }

  }

  doAc(a, b) {

    if (a.systemTypeDTO.name > b.systemTypeDTO.name) {
      return -1;
    } else if (a.systemTypeDTO.name < b.systemTypeDTO.name) {
      return 1;
    }
    return 0;
  }

  doDc(a, b) {
    if (a.systemTypeDTO.name < b.systemTypeDTO.name) {
      return -1;
    } else if (a.systemTypeDTO.name > b.systemTypeDTO.name) {
      return 1;
    }
    return 0;
  }



  handleSort1(value) {

    if (!this.signed) {
      //this.policies.sort(this.doAsc);
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
      //this.policies.sort(this.doDsc);
      this.signed = false;
    }


  }


}
