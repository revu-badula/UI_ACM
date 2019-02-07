import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';
import { Http } from '@angular/http';
import { UtilService } from '../../util.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-report-solutions',
  templateUrl: './report-solutions.component.html',
  styleUrls: ['./report-solutions.component.css']
})
export class ReportSolutionsComponent implements OnInit {

  public displayData: number;

  public Locals: any;
  public p: number = 1;
  public desc: boolean = false;
  public names: any;
  public sysTypes: any;
  public precTypes: any;
  public systemTypes: any;
  public color: String;
  public precitTypes: any;
  public loading: boolean = false;
  public showTable: boolean = false;
  public precType: boolean = false;
  public sysType: boolean = false;
  public mSolution: boolean = false;
  public venName: boolean = false;
  public verNum: boolean = false;
  public showPage: boolean = false;
  @ViewChild('systyp') inputEl: ElementRef;
  @ViewChild('modsol') inputEl1: ElementRef;
  @ViewChild('pcnt') inputEl2: ElementRef;
  @ViewChild('pcntsol') inputEl3: ElementRef;
  constructor(private _apiservice: ApiserviceService,
    private http: Http, private modalService: NgbModal, private utilservice: UtilService,
    private router: Router, private _location: Location) {
    sessionStorage.removeItem('localityName');
    sessionStorage.removeItem('active');
  }

  ngOnInit() {
    this.showDropdown();
    //this.showPrecinct();
  }



  getColor() {
    // return this.color === 'online' ? '#ffffff' : 'white';
  }
  getOpacity() {
    // return this.color === 'online' ? 0.8 : 1;
  }

  showDropdown() {
    this.loading = true;
    this._apiservice.getSolutionsOnload()
      .subscribe((data: any) => {
        this.loading = false;
        this.systemTypes = data.systemTypeDTOs;
        this.precTypes = data.precinctTypeDTOs;
      }, error => {
        this.loading = false;
        console.log(error);
      });

  }


  showPrecinct() {
    this.loading = true;
    this._apiservice.getSolutionsOnload()
      .subscribe((data: any) => {
        this.loading = false;
        this.precTypes = data.precinctTypeDTOs;
      }, error => {
        this.loading = false;
        console.log(error);
      });
  }



  selectSystem(systemTypeId) {

    if (systemTypeId === 'Choose...' || systemTypeId === "") {
      this.sysTypes = [];
    }
    else {
      if(this.inputEl2.nativeElement.value == ""){}
      else{
        this.inputEl2.nativeElement.value="";
        this.inputEl3.nativeElement.value="";
      }
      this.precitTypes=[];
      this._apiservice.getSolOnTypeForReports(systemTypeId)
        .subscribe((data: any) => {
          this.sysTypes = data.solutionsDTOs;
        }, error => { console.log(error) });
    }
  }



  selectPrecinct(precinctTypeId) {

    if (precinctTypeId === 'Choose...' || precinctTypeId === "") {
      this.precitTypes = [];
    }
    else {
      this.sysTypes=[];
      this.inputEl.nativeElement.value = "";
      this.inputEl1.nativeElement.value = "";
      this._apiservice.getSolOnTypeForPrecinct(precinctTypeId)
        .subscribe((data: any) => {
          this.precitTypes = data.solutionsDTOs;
        }, error => { console.log(error) });
    }
  }








  selectSolution(solutionId) {

    if (solutionId === 'Choose...' || solutionId === "") {
      this.Locals = [];
    }
    else {
      this.loading = true;
      UtilService.soluId = solutionId;
      this._apiservice.getLocOnTypeForSystem(solutionId)
        .subscribe((data: any) => {
          this.loading = false;
          this.showTable = true;
          this.Locals = data;
          if (data.length > 0) {
            this.showPage = true;
          }
        }, error => {
          this.loading = false;
          console.log(error)
        });
    }
  }



  backClicked() {
    this._location.back();
  }

  handleSort(value) {
    if (!this.desc) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.Locals.sort((a: any, b: any) => {
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
      this.Locals.sort((a: any, b: any) => {
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

    if (!this.sysType) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.Locals.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.sysType = true;
    }
    else {
      let orderByValue = value;
      this.Locals.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.sysType = false;
    }


  }


  handleSort2(value) {

    if (!this.precType) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.Locals.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.precType = true;
    }
    else {
      let orderByValue = value;
      this.Locals.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.precType = false;
    }


  }


  handleSort3(value) {

    if (!this.mSolution) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.Locals.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.mSolution = true;
    }
    else {
      let orderByValue = value;
      this.Locals.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.mSolution = false;
    }


  }

  handleSort4(value) {

    if (!this.venName) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.Locals.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.venName = true;
    }
    else {
      let orderByValue = value;
      this.Locals.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.venName = false;
    }


  }

  handleSort5(value) {

    if (!this.verNum) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.Locals.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.verNum = true;
    }
    else {
      let orderByValue = value;
      this.Locals.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.verNum = false;
    }


  }

  getLocality(value) {
    sessionStorage.setItem('localityName', value);
    sessionStorage.setItem('active', 'true');
    this.router.navigate(['/locality/tab/solutions']);
  }





}
