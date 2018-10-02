import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../../../../apiservice.service';
import { UtilService } from '../../../../../util.service';
import { AppAssess, AssessmentPolicyDTO, Policy } from '../../../../../data.model.assessmentDTO';
import { Router, ActivatedRoute } from '@angular/router';
import { APP_CONFIG } from '../../../../../app.config';

@Component({
  selector: 'app-assess-tab',
  templateUrl: './system-assess-tab.component.html',
  styleUrls: ['./system-assess-tab.component.css']
})
export class SystemAssessTabComponent implements OnInit {

   public assessmentDTOs: any;
  public mainData: any;
  public loading: boolean = false;
  public showEdit: boolean = true;
  public updatedTime: any;
  public p: number = 1;
  public desc: boolean = false;
  public name:boolean=false;
  public assessmentDt:boolean=false;
  public nextAssessmentDt:boolean=false;
  public showPagination:boolean=true;

  public showPlusButton: boolean = false;
  constructor(private _apiservice: ApiserviceService,
    private utilService: UtilService, private route: ActivatedRoute, private router: Router) {
    this.getAppId();
    localStorage.removeItem('sysassesId');
    localStorage.removeItem('systemAssessActive');
    UtilService.disabled=true;
  }
  ngOnInit() {

  }

  getAppId() {
    this.loading = true;
    this._apiservice.viewApplication(localStorage.getItem('systemName'))
      .subscribe((data: any) => {
        this.loading = false;
        this.mainData = data.applicationViewDTO.acronym;
        let d = new Date(data.applicationViewDTO.updatedTime);
        if(data.applicationViewDTO.assessmentDTOs === undefined)
        {
          this.showPagination=false;
        }
        else{
        this.assessmentDTOs = data.applicationViewDTO.assessmentDTOs;
        }
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        this.updatedTime = month + "/" + day + "/" + year;
      }, error => {
        this.loading=false;
        console.log(error);
      });
  }

  goTo() {
    this.router.navigate(['/system/tab2/assessment/Tabs2/first2']);

  }
  showPlus() {

    this.showPlusButton = true;
    this.showEdit = false;
  }

  getAudit(id) {
    localStorage.setItem('sysassesId', id);
    UtilService.disabled=false;
    this.router.navigate(['/system/tab2/assessment/Tabs2/first2']);
  }

 handleSort(value) {
    if (!this.desc) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.assessmentDTOs.sort((a: any, b: any) => {
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
      this.assessmentDTOs.sort((a: any, b: any) => {
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
    if (!this.name) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.assessmentDTOs.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.name = true;
    }
    else {
      let orderByValue = value;
      this.assessmentDTOs.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.name = false;
    }


  }

  handleSort2(value) {
    if (!this.assessmentDt) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.assessmentDTOs.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.assessmentDt = true;
    }
    else {
      let orderByValue = value;
      this.assessmentDTOs.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.assessmentDt = false;
    }


  }
  handleSort3(value) {
    if (!this.nextAssessmentDt) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.assessmentDTOs.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.nextAssessmentDt = true;
    }
    else {
      let orderByValue = value;
      this.assessmentDTOs.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.nextAssessmentDt = false;
    }


  }

 

}

