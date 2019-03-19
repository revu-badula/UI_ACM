import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';
import { Http } from '@angular/http';
import { UtilService } from '../../util.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { county } from '../../county';
import { Location } from '@angular/common';
@Component({
  selector: 'app-report-legal',
  templateUrl: './report-legal.component.html',
  styleUrls: ['./report-legal.component.css']
})
export class ReportLegalComponent implements OnInit {


  public Localities: any;
  public Locals: any;
  public p: number = 1;
  public desc: boolean = false;
  public name: boolean = false;
  public rcDt: boolean = false;
  public dtrcpt: boolean = false;
  sysTypes: any;
  precinctTypes: any;
  systemTypes: any;
  color: String;
  public showTable: boolean = false;
  public loading: boolean = false;
  public locality: any;
  public systems: any;
  public signedLocalities: any = [];
  public unsignedLocalities: any = [];

  constructor(private _apiservice: ApiserviceService,
    private http: Http, private modalService: NgbModal, 
    private utilservice: UtilService,
    private router: Router,private _location: Location) {
    sessionStorage.removeItem('localityName');
    sessionStorage.removeItem('active');


  }

  ngOnInit() {
    this.getLocForMous();
    //this.getSysForMous();

  }
  getColor() {
    // return this.color === 'online' ? '#ffffff' : 'white';
  }
  getOpacity() {
    // return this.color === 'online' ? 0.8 : 1;
  }

  backClicked() {
    this._location.back();
  }





  getLocForMous() {
    this.Localities = [];
    this.loading = true;
    this._apiservice.getLocForMous().
      subscribe((data: any) => {
        this.loading = false;
        this.Localities = data;
        if (UtilService.signlegal) {
          for (let i = 0; i < this.Localities.length; i++) {
            if (this.Localities[i].signed) {
              this.signedLocalities.push(this.Localities[i]);
            }

          }
        }
        else {
          for (let i = 0; i < this.Localities.length; i++) {
            if (!(this.Localities[i].signed)) {
              this.signedLocalities.push(this.Localities[i]);
            }

          }
        }

      }, error => {
        this.loading = false;
        console.log(error);

      }


      );

  }

  getSysForMous() {
    this.loading = true;
    this.Localities = [];

    this._apiservice.getSysForMous().
      subscribe((data: any) => {
        this.loading = false;
        this.Localities = data;

      }, error => {
        this.loading = false;
        console.log(error);

      }


      );


  }



  handleSort(value:any) {
    if (!this.desc) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.signedLocalities.sort((a: any, b: any) => {
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
      this.signedLocalities.sort((a: any, b: any) => {
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

  handleSort1(value:any) {

    if (!this.rcDt) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.signedLocalities.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.rcDt = true;
    }
    else {
      let orderByValue = value;
      this.signedLocalities.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.rcDt = false;
    }


  }


  handleSort2(value:any) {

    if (!this.dtrcpt) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.signedLocalities.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.dtrcpt = true;
    }
    else {
      let orderByValue = value;
      this.signedLocalities.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.dtrcpt = false;
    }


  }


  handleSort3(value:any) {

    if (!this.name) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.signedLocalities.sort((a: any, b: any) => {
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
      this.signedLocalities.sort((a: any, b: any) => {
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

  getLocality(value:any) {
    // let countyarray = county.filter(item => item.county_name === value);
    // for (let i = 0; i < countyarray.length; i++) {
    //   localStorage.setItem('fipscode', countyarray[i].county_code);
    // }
    sessionStorage.setItem('localityName', value);
    sessionStorage.setItem('active', 'true');
    this.router.navigate(['/locality/tab/legal']);
  }

}

