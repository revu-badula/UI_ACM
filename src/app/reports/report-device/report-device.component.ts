import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';
import { Http } from '@angular/http';
import { UtilService } from '../../util.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DatePipe, Location, formatDate } from '@angular/common';
@Component({
  selector: 'app-report-device',
  templateUrl: './report-device.component.html',
  styleUrls: ['./report-device.component.css']
})
export class ReportDeviceComponent implements OnInit {
  color: String;
  public desc:boolean=false;
  public p:number=1;
  public devices:any;
  public showPage:boolean=false;
  public mNum:boolean=false;
  public sNum:boolean=false;
  public curScan:boolean=false;
  public nextScan:boolean=false;
  public sName:boolean=false;
  public overall:boolean=false;
  public loading:boolean=false;
   constructor(private _apiservice: ApiserviceService,
    private http: Http, private modalService: NgbModal, private utilservice: UtilService,
    private router: Router,  private _location: Location)  {
      localStorage.removeItem('localityName');
      localStorage.removeItem('active');
     }

  ngOnInit() {
  this.showDevice();
  }
  getColor() {
    return this.color === 'online' ? '#ffffff' : 'white';
  }
  getOpacity() {
    return this.color === 'online' ? 0.8 : 1;
  }
  showDevice(){
    this.loading=true;
  this._apiservice.getLocForDevices().
      subscribe((data: any) => {
        this.loading=false;
        this.devices = data;
        if(data.length > 0)
        {
          this.showPage=true;
        }
      }, error => {
        this.loading=false;
        console.log(error);

      }


      );
  }

  backClicked() {
    this._location.back();
  }

  handleSort(value) {
    if (!this.desc) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.devices.sort((a: any, b: any) => {
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
      this.devices.sort((a: any, b: any) => {
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

    if (!this.mNum) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.devices.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.mNum = true;
    }
    else {
      let orderByValue = value;
      this.devices.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.mNum = false;
    }


  }


  handleSort2(value) {

    if (!this.sNum) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.devices.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.sNum = true;
    }
    else {
      let orderByValue = value;
      this.devices.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.sNum = false;
    }


  }


  handleSort3(value) {

    if (!this.curScan) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.devices.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.curScan = true;
    }
    else {
      let orderByValue = value;
      this.devices.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.curScan = false;
    }


  }

  handleSort4(value) {

    if (!this.nextScan) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.devices.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.nextScan = true;
    }
    else {
      let orderByValue = value;
      this.devices.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.nextScan = false;
    }


  }

  handleSort5(value) {

    if (!this.sName) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.devices.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.sName = true;
    }
    else {
      let orderByValue = value;
      this.devices.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.sName = false;
    }


  }

  handleSort6(value) {

    if (!this.overall) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.devices.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.overall = true;
    }
    else {
      let orderByValue = value;
      this.devices.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.overall = false;
    }


  }

  getLocality(value) {
    localStorage.setItem('localityName', value);
    this.router.navigate(['/locality/tab/info']);
  }

}
