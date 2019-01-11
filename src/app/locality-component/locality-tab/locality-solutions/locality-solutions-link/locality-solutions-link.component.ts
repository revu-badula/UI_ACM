import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../../../apiservice.service';
import { Router } from '@angular/router';
import { UtilService } from '../../../../util.service';
import { ApplicationSolution, SolutionsDTO, Vendor, Device, HostingType, SystemType } from '../../../../data_model_lsolutions';
import { DialogService } from '../../../../dialog.service';
import { APP_CONFIG } from 'app/app.config';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-locality-solutions-link',
  templateUrl: './locality-solutions-link.component.html',
  styleUrls: ['./locality-solutions-link.component.css']
})
export class LocalitySolutionsLinkComponent implements OnInit {

  public appSolutions: any;
  public loading: boolean = false;
  public desc: boolean = false;
  applicationSolution: ApplicationSolution;
  public des: boolean = false;
  public dec: boolean = false;
  public precinctType: boolean = false;
  public p: number = 1;
  public acronym: any;
  public updatedTime: any;
  public updatedBy: any;
  public updtBy: boolean = false;
  public updt: boolean = false;
  public showSigned: boolean = false;
  public showPagination: boolean = true;
  public archived: number = 0;
  constructor(private _apiservice: ApiserviceService, private router: Router,
    private utilService: UtilService, private dialogService: DialogService, private http: Http) {
    this.viewApplication(sessionStorage.getItem('localityName'));
    sessionStorage.removeItem('appSolId');
    this.applicationSolution = new ApplicationSolution();
  }

  ngOnInit() {
  }




  viewApplication(local) {
    this.loading = true;
    this._apiservice.viewApplication(local)
      .subscribe((data: any) => {
        this.loading = false;
        this.acronym = data.applicationViewDTO.acronym;
        this.updatedBy = data.applicationViewDTO.updatedBy;
        let d = new Date(data.applicationViewDTO.updatedTime);
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        this.updatedTime = month + "/" + day + "/" + year;
        if (data.applicationViewDTO.applicationSolutionDTOs === undefined) {
          this.showPagination = false;
          this.appSolutions = [];
        }
        else {
          this.appSolutions = data.applicationViewDTO.applicationSolutionDTOs;
        }
      }, error => {
        this.loading = false;
        console.log(error);
      });
  }

  handleSort() {

    if (!this.desc) {
      this.appSolutions.sort(this.doAsc);
      this.desc = true;
    }
    else {
      this.appSolutions.sort(this.doDsc);
      this.desc = false;
    }

  }

  doAsc(a, b) {

    if (a.solutionsDTO.name > b.solutionsDTO.name) {
      return -1;
    } else if (a.solutionsDTO.name < b.solutionsDTO.name) {
      return 1;
    }
    return 0;
  }

  doDsc(a, b) {
    if (a.solutionsDTO.name < b.solutionsDTO.name) {
      return -1;
    } else if (a.solutionsDTO.name > b.solutionsDTO.name) {
      return 1;
    }
    return 0;
  }


  handleSorted() {

    if (!this.des) {
      this.appSolutions.sort(this.doAs);
      this.des = true;
    }
    else {
      this.appSolutions.sort(this.doDs);
      this.des = false;
    }

  }

  doAs(a, b) {


    if (a.solutionsDTO.vendor.name > b.solutionsDTO.vendor.name) {
      return -1;
    } else if (a.solutionsDTO.vendor.name < b.solutionsDTO.vendor.name) {
      return 1;
    }
    return 0;
  }

  doDs(a, b) {
    if (a.solutionsDTO.vendor.name < b.solutionsDTO.vendor.name) {
      return -1;
    } else if (a.solutionsDTO.vendor.name > b.solutionsDTO.vendor.name) {
      return 1;
    }
    return 0;
  }

  handleSorting() {

    if (!this.dec) {
      this.appSolutions.sort(this.doAc);
      this.dec = true;
    }
    else {
      this.appSolutions.sort(this.doDc);
      this.dec = false;
    }

  }

  doAc(a, b) {


    if (a.solutionsDTO.solutionTypeName > b.solutionsDTO.solutionTypeName) {
      return -1;
    } else if (a.solutionsDTO.solutionTypeName < b.solutionsDTO.solutionTypeName) {
      return 1;
    }
    return 0;
  }

  doDc(a, b) {
    if (a.solutionsDTO.solutionTypeName < b.solutionsDTO.solutionTypeName) {
      return -1;
    } else if (a.solutionsDTO.solutionTypeName > b.solutionsDTO.solutionTypeName) {
      return 1;
    }
    return 0;
  }



  showSolutionsPage(appSolutionId) {
    this.utilService.isLocalitySolutionAdd = false;
    sessionStorage.setItem('appSolId', appSolutionId);
    this.router.navigate(['/locality/tab/solutions/solutionForm']);
  }

  selectLocality() {
    this.utilService.isLocalitySolutionAdd = true;
    this.router.navigate(['/locality/tab/solutions/solutionForm']);
  }


  handleSorting1() {

    if (!this.precinctType) {
      this.appSolutions.sort(this.doAs1);
      this.precinctType = true;
    }
    else {
      this.appSolutions.sort(this.doDs1);
      this.precinctType = false;
    }

  }

  doAs1(a, b) {

    if (a.solutionsDTO.precinctTypeName > b.solutionsDTO.precinctTypeName) {
      return -1;
    } else if (a.solutionsDTO.precinctTypeName < b.solutionsDTO.precinctTypeName) {
      return 1;
    }
    return 0;
  }

  doDs1(a, b) {
    if (a.solutionsDTO.precinctTypeName < b.solutionsDTO.precinctTypeName) {
      return -1;
    } else if (a.solutionsDTO.precinctTypeName > b.solutionsDTO.precinctTypeName) {
      return 1;
    }
    return 0;
  }



  handleSort2(value) {

    if (!this.updtBy) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.appSolutions.sort((a: any, b: any) => {
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
      this.appSolutions.sort((a: any, b: any) => {
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


  handleSort3(value) {

    if (!this.updt) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.appSolutions.sort((a: any, b: any) => {
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
      this.appSolutions.sort((a: any, b: any) => {
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


  editClick() {
    this.showSigned = true;
  }


  archiveAppSolution(value) {
    this.applicationSolution = value;


    this.dialogService.open("Info", "Are you sure you want to delete this? You can still see the deleted solutions in the archive.", true, "YES", "NO")
      .then((result: any) => {
        if (result) {
          const headers = new Headers();
          headers.append('Content-Type', 'application/json');
          let options = new RequestOptions({ headers: headers });
          this.applicationSolution.archived = 1;
          var formData = new FormData();
          formData.append('appSolutionString', JSON.stringify(this.applicationSolution));
          let url = APP_CONFIG.archiveAppSolution;
          //this._apiservice.archiveAppSolution(data)
          this.loading = true;
          this.http.post(url, formData)
            .subscribe((data: any) => {
              this.loading = false;
              this.appSolutions.forEach(element => {
                if (element.appSolutionId === value.appSolutionId)
                  element.archived = 1;

              });
            }, error => {
              this.loading = false;
              console.log(error);
            });
        }
        else { }

      }, error => {
        console.log(error);
      });
  }


}
