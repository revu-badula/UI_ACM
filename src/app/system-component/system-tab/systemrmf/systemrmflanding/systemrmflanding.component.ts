import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../../../apiservice.service';
import { UtilService } from '../../../../util.service';
import { Router, ActivatedRoute } from '@angular/router';
import { APP_CONFIG } from '../../../../app.config';
import { DialogService } from '../../../../dialog.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-systemrmflanding',
  templateUrl: './systemrmflanding.component.html',
  styleUrls: ['./systemrmflanding.component.css']
})
export class SystemrmflandingComponent implements OnInit {


  public loading: boolean = false;
  public showEdit: boolean = true;
  public p: number = 1;
  public desc: boolean = false;
  public name: boolean = false;
  public showPagination: boolean = false;
  public show: boolean = true;
  public rmf: any;
  public appId: any;
  public col1: any;
  public col2: any;
  public col3: any;
  public col4: any;
  public col5: any;
  public col6: any;
  public rmfname: any;
  public rmftype: any;
  public sysname: any;
  public systemRmfId: any;
  constructor(private _apiservice: ApiserviceService,
    private utilService: UtilService, private route: ActivatedRoute, private router: Router,
    private dialogService: DialogService, private httpClient: HttpClient) {
    sessionStorage.removeItem("systemRmfId");
    sessionStorage.removeItem("rmfdisabled");
    sessionStorage.removeItem('rmfActive');


  }

  ngOnInit() {
    this.getAppId();
  }

  getAppId() {
    this.loading = true;
    this._apiservice.viewApplication(sessionStorage.getItem('systemName'))
      .subscribe((data: any) => {
        this.loading = false;
        this.appId = data.applicationViewDTO.applicationId;
        this.sysname = data.applicationViewDTO.acronym
        this.getRmfData();
      }, error => {
        this.loading = false;
        console.log(error);
      });
  }
  getRmfData() {
    this.loading = true;
    let url = APP_CONFIG.getAppRMFs;
    this.httpClient.get(url + "?" + "systemId=" + this.appId)
      .subscribe((data: any) => {
        this.loading = false;
        this.rmf = data;
        this.showPagination = true;
      }, error => {
        this.loading = false;
        console.log(error);
      })
  }

  goTo() {
    sessionStorage.setItem("rmfdisabled", "true");
    this.router.navigate(['/system/tab2/rmf/tabrmf/rmfStart']);

  }
  showPlus() {
    this.showEdit = false;
  }
  getBack()
  {
    this.show=true;
  }

  getPicture(value: any) {
    this.show = false;
    this.rmfname = value.name;
    this.rmftype = value.rmfTypeName;
    this.systemRmfId = value.rmfAppId;
  }
  getAudit() {
    sessionStorage.setItem("systemRmfId", this.systemRmfId);
    this.router.navigate(['/system/tab2/rmf/tabrmf/rmfStart']);
  }

  getFile(value:any)
  {
    if(value === 'poam'){
    let url=APP_CONFIG.generatePOAM;
    window.open(url + '?' + 'rmfAppId' + '=' + this.systemRmfId);
    }
    else if(value === 'ssp')
    {
      let url=APP_CONFIG.generateSsp;
      window.open(url + '?' + 'rmfAppId' + '=' + this.systemRmfId);
    }
    else if(value === 'sars')
    {
      let url=APP_CONFIG.generateSars;
      window.open(url + '?' + 'rmfAppId' + '=' + this.systemRmfId);
    }
  }

  handleSort1(value: any) {

    if (!this.col1) {
      let orderByValue = value;
      this.rmf.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.col1 = true;
    }
    else {
      let orderByValue = value;
      this.rmf.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.col1 = false;
    }
  }


  handleSort2(value: any) {

    if (!this.col2) {
      let orderByValue = value;
      this.rmf.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.col2 = true;
    }
    else {
      let orderByValue = value;
      this.rmf.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.col2 = false;
    }


  }

  handleSort3(value: any) {

    if (!this.col3) {
      let orderByValue = value;
      this.rmf.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.col3 = true;
    }
    else {
      let orderByValue = value;
      this.rmf.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.col3 = false;
    }


  }


  handleSort4(value: any) {

    if (!this.col4) {
      let orderByValue = value;
      this.rmf.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.col4 = true;
    }
    else {
      let orderByValue = value;
      this.rmf.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.col4 = false;
    }


  }

  handleSort5(value: any) {

    if (!this.col5) {
      let orderByValue = value;
      this.rmf.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.col5 = true;
    }
    else {
      let orderByValue = value;
      this.rmf.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.col5 = false;
    }


  }

}
