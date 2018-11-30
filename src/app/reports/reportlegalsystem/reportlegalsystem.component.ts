import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';
import { Http } from '@angular/http';
import { UtilService } from '../../util.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reportlegalsystem',
  templateUrl: './reportlegalsystem.component.html',
  styleUrls: ['./reportlegalsystem.component.css']
})
export class ReportlegalsystemComponent implements OnInit {

  public Localities: any;
  public Locals: any;
  public p: number = 1;
  public desc: boolean = false;
  sysTypes: any;
  precinctTypes: any;
  systemTypes: any;
  color: String;
  public name: boolean = false;
  public rcDt: boolean = false;
  public dtrcpt: boolean = false;
  public loading: boolean = false;
  public locality: any;
  public systems: any;
  public signedSystems: any = [];

  constructor(private _apiservice: ApiserviceService,
    private http: Http, private modalService: NgbModal, private utilservice: UtilService,
    private router: Router) {
    localStorage.removeItem('systemName');
    localStorage.removeItem('systemActive');

  }

  ngOnInit() {
    this.getSysForMous();

  }
  getColor() {
    // return this.color === 'online' ? '#ffffff' : 'white';
  }
  getOpacity() {
    // return this.color === 'online' ? 0.8 : 1;
  }


  getSysForMous() {
    this.loading = true;
    this._apiservice.getSysForMous().
      subscribe((data: any) => {
        this.loading = false;
        this.Localities = data;
        if (UtilService.signsystem) {
          for (let i = 0; i < this.Localities.length; i++) {
            if (this.Localities[i].signed) {
              this.signedSystems.push(this.Localities[i]);
            }

          }
        }
        else {
          for (let i = 0; i < this.Localities.length; i++) {
            if (!(this.Localities[i].signed)) {
              this.signedSystems.push(this.Localities[i]);
            }

          }
        }

      }, error => {
        this.loading = false;
        console.log(error);

      }


      );


  }

  handleSort(value) {
    if (!this.desc) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.signedSystems.sort((a: any, b: any) => {
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
      this.signedSystems.sort((a: any, b: any) => {
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

    if (!this.rcDt) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.signedSystems.sort((a: any, b: any) => {
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
      this.signedSystems.sort((a: any, b: any) => {
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


  handleSort2(value) {

    if (!this.dtrcpt) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.signedSystems.sort((a: any, b: any) => {
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
      this.signedSystems.sort((a: any, b: any) => {
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


  handleSort3(value) {

    if (!this.name) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.signedSystems.sort((a: any, b: any) => {
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
      this.signedSystems.sort((a: any, b: any) => {
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

  getSystem(value)
  {
    localStorage.setItem('systemName', value);
    localStorage.setItem('systemActive','true');
    this.router.navigate(['/system/tab2/legal']);
  }




}
