import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../../../apiservice.service';
import { Router } from '@angular/router';
import { UtilService } from '../../../../util.service';

@Component({
  selector: 'app-locality-solutions-link',
  templateUrl: './locality-solutions-link.component.html',
  styleUrls: ['./locality-solutions-link.component.css']
})
export class LocalitySolutionsLinkComponent implements OnInit {

  public appSolutions: any;
  public loading: boolean = false;
  public desc: boolean = false;
  public des: boolean = false;
  public dec: boolean = false;
  public precinctType: boolean = false;
  public p: number = 1;
  public acronym: any;
  public updatedTime: any;
  public updatedBy:any;
  public showPagination: boolean = true;
  constructor(private _apiservice: ApiserviceService, private router: Router, private utilService: UtilService) {
    this.viewApplication(localStorage.getItem('localityName'));
    localStorage.removeItem('appSolId');
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
    localStorage.setItem('appSolId', appSolutionId);
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





}
