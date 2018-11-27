import { Component, OnInit, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { ApiserviceService } from 'app/apiservice.service';
import { Policy, PolicyDocumentsDTO, PolicyGrp, subControl } from '../../data_modelPolicy';
import { APP_CONFIG } from '../../app.config';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
@Component({
  selector: 'app-sub-control-name',
  templateUrl: './sub-control-name.component.html',
  styleUrls: ['./sub-control-name.component.css']
})
export class SubControlNameComponent implements OnInit {

  public loading: boolean = false;
  policyAccess: Policy;
  subControl1: subControl;
  public showForm: boolean = false;
  public endDate: any;
  color: String;
  public users:any;
  public showBtt: boolean = false;
  config = {
    placeholder: '',
    tabsize: 2,
    height: 200,
    width:"100%",
    toolbar: [
      // [groupName, [list of button]]
      ['misc', ['undo', 'redo']],
      ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style0', 'ul', 'ol', 'paragraph', 'height']]
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times'],
    
  };
  @ViewChild('content') content: TemplateRef<any>;
  constructor(private _apiservice: ApiserviceService, private http: Http,
    public datepipe: DatePipe, private modalService: NgbModal, private _location: Location) {
    this.subControl1 = new subControl();
    this.getPolicy();

  }

  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.getUsers();
  }



  getPolicy() {
    this.loading=true;
    let polId = localStorage.getItem('policyId');
    let poId = +polId;
    this._apiservice.getPolicy(poId)
      .subscribe((data: any) => {
        this.loading = false;
        this.policyAccess = data;
        this.showInfo(data.subPolicyDTOs);

      },error => {
        this.loading=false;
        console.log(error);
      });
  }
  showInfo(value) {
    if (localStorage.getItem('subPol') === null) {

    }
    else {
      this.showBtt = true;
      this.showForm = true;
      let id = localStorage.getItem('subPol');
      let poId = +id;
      value.filter(item => {
        if (item.subPolicyId === poId) {
          this.subControl1 = item;

          if (this.subControl1.endDate === null) {
            this.endDate = { date: null };
          }
          else {
            let d = new Date(this.subControl1.endDate);
            let day = d.getDate();
            let month = d.getMonth() + 1;
            let year = d.getFullYear();
            this.endDate = { date: { year: year, month: month, day: day } };
          }
        }
      })
    }
  }


  addSubPolicy() {
    this.loading = true;
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    if (this.policyAccess.subPolicyDTOs === null) {
      this.policyAccess.subPolicyDTOs = [];
      this.policyAccess.subPolicyDTOs.push(this.subControl1)
    }
    else {
      this.policyAccess.subPolicyDTOs.push(this.subControl1);
    }
    let url = APP_CONFIG.updatePolicy;
    var formData = new FormData();
    formData.append('policy', JSON.stringify(this.policyAccess));

    this.http.post(url, formData).subscribe((data: any) => {
      this.loading = false;
      this.modalService.open(this.content, ngbModalOptions);
    }, error => {
      this.loading = false;
      console.log(error);
    });
  }


  goTo() {
    event.preventDefault();
    this._location.back();
  }

  getEndDate(value) {
    if (value.formatted === "") {
    }
    else {
      let latest_date = this.datepipe.transform(value.formatted, 'yyyy-MM-dd');
      this.subControl1.endDate = moment(latest_date).format();
    }
  }
  editorGroup(): void {
    this.showBtt = false;
    this.showForm = false;
  }

  getColor() {
    // return this.color === 'online' ? '#ffffff' : 'white';
  }

  getOpacity() {
    // return this.color === 'online' ? 0.8 : 1;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {

    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 100) {
      this.color = 'online';
    } else {
      this.color = 'offline';
    }

  }

  getUsers() {
    this._apiservice.getUsers()
      .subscribe((data: any) => {
        this.users = data;

      }, error => console.log(error));

  }



}


