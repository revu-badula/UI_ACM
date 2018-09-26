import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../../../apiservice.service';
import { Http } from '@angular/http';
import { UtilService } from '../../../../util.service';
import { IMyDate, IMyDpOptions } from 'mydatepicker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-legalmain',
  templateUrl: './legalmain.component.html',
  styleUrls: ['./legalmain.component.css']
})
export class LegalmainComponent implements OnInit {
  public acronym: any;
  public updatedTime: any;
  public appMOUs: any;
  public showSigned: boolean = false;
  public loading:boolean = false;
  public  desc = false;
   public p: number = 1;
   public signed:boolean=false;
  public recertificationDt:boolean=false;
  constructor(private _apiservice: ApiserviceService,
    private http: Http, private modalService: NgbModal, private utilservice: UtilService,
    private router: Router) {
      UtilService.appMouId = '';
      localStorage.removeItem('appMouId');
    this.getAppId();

  }

  ngOnInit() {
  }

  getAppId() {
    this.loading = true;
    this._apiservice.viewApplication(localStorage.getItem('localityName'))
      .subscribe((data: any) => {
        this.loading = false;
        this.acronym = data.applicationViewDTO.acronym;
        let d = new Date(data.applicationViewDTO.updatedTime);
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        this.updatedTime = month + "/" + day + "/" + year;
        this.getAppMOUs(data.applicationViewDTO.applicationId);
      }, error => {
        this.loading = false;
      console.log(error);
      }
    );
  }





  getAppMOUs(id) {
    this.loading = true;
    this._apiservice.getAppMOUs(id)
      .subscribe((data: any) => {
        this.loading = false;
        this.appMOUs = data;

      }, error => {
        this.loading = false;
        console.log(error);}
      );
  }
  
  
  
  

  editClick() {
    this.showSigned = true;
    
    }

    createMOU()
    {
      this.router.navigate(['/locality/tab/legal/legalform']);
    }

    getAppMOU(id)
    {
      UtilService.appMouId = id;
      localStorage.setItem('appMouId',id);
      this.router.navigate(['/locality/tab/legal/legalform']);
    }


    handleSort(value) {
      if (!this.desc) {
        //this.policies.sort(this.doAsc);
        let orderByValue = value;
        this.appMOUs.sort((a: any, b: any) => {
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
        this.appMOUs.sort((a: any, b: any) => {
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
  
      if (!this.signed) {
        //this.policies.sort(this.doAsc);
        let orderByValue = value;
        this.appMOUs.sort((a: any, b: any) => {
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
        this.appMOUs.sort((a: any, b: any) => {
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
  
  
    handleSort2(value) {
  
      if (!this.recertificationDt) {
        //this.policies.sort(this.doAsc);
        let orderByValue = value;
        this.appMOUs.sort((a: any, b: any) => {
          if (a[orderByValue] > b[orderByValue]) {
            return -1;
          } else if (a[orderByValue] < b[orderByValue]) {
            return 1;
          } else {
            return 0;
          }
        });
        this.recertificationDt = true;
      }
      else {
        let orderByValue = value;
        this.appMOUs.sort((a: any, b: any) => {
          if (a[orderByValue] < b[orderByValue]) {
            return -1;
          } else if (a[orderByValue] > b[orderByValue]) {
            return 1;
          } else {
            return 0;
          }
        });
        //this.policies.sort(this.doDsc);
        this.recertificationDt = false;
      }
  
  
    }
  
  

}
