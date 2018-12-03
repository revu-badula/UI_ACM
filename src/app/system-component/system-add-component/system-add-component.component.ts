import { Component, OnInit, ViewChild, ElementRef, TemplateRef, } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApiserviceService } from '../../apiservice.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../../util.service';
@Component({
  selector: 'app-system-add-component',
  templateUrl: './system-add-component.component.html',
  styleUrls: ['./system-add-component.component.css'],
  providers: [ApiserviceService]
})
export class SystemAddComponentComponent implements OnInit {


  public titus: string;
  public system: any;
  public acronyms: any;
  public businessOwners: any;
  public pendingApplications: any;
  public loading: boolean = false;
  public desc: boolean = false;
  public businessOwner: boolean = false;
  public systemOwner: boolean = false;
  public updtBy:boolean=false;
  public updt:boolean=false;
  public p: number = 1;
  public showPagination:boolean=true;
  @ViewChild('content') content: TemplateRef<any>;
  constructor(private router: Router, private _apiservice: ApiserviceService, private modalService: NgbModal, private utilService: UtilService) {
    localStorage.removeItem('systemName');
    localStorage.removeItem('systemActive');

  }

  ngOnInit() {
    this.getPendingApplications();
  }








  getPendingApplications() {
    this.loading = true;
    this._apiservice.getPendingApplications()
      .subscribe((data: any) => {
        this.loading = false;
        if (data.length === 0) {
          this.pendingApplications = [];
          this.showPagination = false;
        }
        else {
          this.pendingApplications = data;
        }
      }, error => {
        this.loading = false;
        console.log(error);
      });

  }

  viewApplication(system) {
    localStorage.setItem('systemName', system);
    this.router.navigate(['/system/tab2/info']);
  }

  createSystem() {
    this.router.navigate(['/system/tab2/info']);
  }


  handleSort(value) {
    if (!this.desc) {

      let orderByValue = value;
      this.pendingApplications.sort((a: any, b: any) => {
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
      this.pendingApplications.sort((a: any, b: any) => {
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

  handleSort1(value) {
    if (!this.businessOwner) {
      let orderByValue = value;
      this.pendingApplications.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.businessOwner = true;
    }
    else {
      let orderByValue = value;
      this.pendingApplications.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.businessOwner = false;
    }


  }



  handleSort2(value) {
    if (!this.systemOwner) {

      let orderByValue = value;
      this.pendingApplications.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.systemOwner = true;
    }
    else {
      let orderByValue = value;
      this.pendingApplications.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.systemOwner = false;
    }


  }


  handleSort3(value) {
    if (!this.updtBy) {

      let orderByValue = value;
      this.pendingApplications.sort((a: any, b: any) => {
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
      this.pendingApplications.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.updtBy = false;
    }


  }


  handleSort4(value) {
    if (!this.updt) {

      let orderByValue = value;
      this.pendingApplications.sort((a: any, b: any) => {
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
      this.pendingApplications.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.updt = false;
    }


  }





}
