import { APP_CONFIG } from '../../../app.config';
import { Location } from '@angular/common';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { File } from 'babel-types';
import { Locality, applicationView, WorkHours } from '../../../data_model_locality';
import { Component, OnInit, HostListener, ViewChild, ElementRef, TemplateRef, NgModule } from '@angular/core';
import { ApiserviceService } from '../../../apiservice.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, NgForm, PatternValidator } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../../../util.service';
import { FilterPipeDate } from '../../locality-date-filter';
import { Cookie } from 'ng2-cookies';
import { PhonePipe } from '../../phone-pipe';

@Component({
  selector: 'app-locality-details',
  templateUrl: './locality-details.component.html',
  styleUrls: ['./locality-details.component.css'],
  providers: [ApiserviceService, PhonePipe]
})
export class LocalityDetailsComponent implements OnInit {
  daysArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  @ViewChild('fileInput') inputEl: ElementRef;
  @ViewChild('editForm') solutionsForm: NgForm;
  @ViewChild('content') content: TemplateRef<any>;
  color: String;
  public applicationViewDTO: any;
  locality: Locality;
  loc: any;
  appId: number;
  updatedTime: any;
  editableForm: boolean = true;
  viewType: any;
  contentData: string = "";
  showEditButton: boolean = false;
  time: any;
  config = {
    placeholder: '',
    tabsize: 2,
    height: 200,
    width: '100%',
    toolbar: [
      // [groupName, [list of button]]
      ['misc', ['undo', 'redo']],
      ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style0', 'ul', 'ol', 'paragraph', 'height']]
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times'],

  };
  workHours: WorkHours;
  public loading: boolean = false;
  public showBtn: boolean = false;
  public isShow: boolean = false;

  constructor(private route: ActivatedRoute, private _apiservice: ApiserviceService, private fb: FormBuilder
    , private http: Http, private _location: Location, private modalService: NgbModal,
    private router: Router, private utilservice: UtilService, private phone: PhonePipe) {


    this.locality = new Locality();

    this.workHours = new WorkHours();

  }

  ngOnInit() {
    this.viewApplication(localStorage.getItem('localityName'));

  }

  editClick(event): void {
    this.editableForm = false;
    this.showBtn = true;
    this.isShow = true;

  }




  createLocality() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.loading = true;
    if (this.appId === undefined) {
      var formData = new FormData();
      this.locality.activeLocality = 1;
      let url_update = APP_CONFIG.addLocality;
      this.locality.createdByName = Cookie.get('userName');
      this.locality.createdBy = Cookie.get('userName');
      formData.append('createApp', JSON.stringify(this.locality));
      this.http.post(url_update, formData)
        .map(res => res.json())
        .subscribe((data: any) => {
          this.loading = false;
          this.contentData = "locality has been created.";
          this.appId = data.applicationViewDTO.applicationId;
          localStorage.setItem('localityName', data.applicationViewDTO.acronym);
          localStorage.setItem('active', 'true');

          this.modalService.open(this.content, ngbModalOptions);
        }, error => {
          this.loading = false;
          console.log(error);
        });

    }
    else {
      var formData = new FormData();
      this.locality.applicationId = this.appId;
      this.locality.updatedBy = Cookie.get('userName');
      formData.append('application', JSON.stringify(this.locality));
      this.http.post(APP_CONFIG.updateLocality, formData).subscribe((data: any) => {
        this.loading = false;
        this.contentData = "locality has been updated.";
        this.modalService.open(this.content, ngbModalOptions);
      }, error => {
        this.loading = false;
        console.log(error);
      });
    }

  }

  viewApplication(local) {

    this.loading = true;
    this._apiservice.viewApplication(local)
      .subscribe((data: any) => {
        this.loading = false;
        if (data.applicationViewDTO === null) {
          this.isShow = true;
          this.editableForm = false;
          this.locality.acronym = local;
          this.locality.fipsCd = localStorage.getItem('fipscode');
          this.locality.workHoursDTOs = []
          for (let day in this.daysArray) {
            this.workHours = new WorkHours();
            this.workHours.day = this.daysArray[day];

            this.locality.workHoursDTOs.push(this.workHours);

          }

        }
        else {
          this.showEditButton = true;
          this.showBtn = false;
          UtilService.active = true;
          localStorage.setItem('active', 'true');
          this.appId = data.applicationViewDTO.applicationId;
          this.locality = data.applicationViewDTO;
          this.locality.workHoursDTOs = data.applicationViewDTO.workHoursDTOs;
          let d = new Date(this.locality.updatedTime);
          let day = d.getDate();
          let month = d.getMonth() + 1;
          let year = d.getFullYear();
          this.updatedTime = month + "/" + day + "/" + year;

          this.locality.workHoursDTOs = data.applicationViewDTO.workHoursDTOs;
          let dummy_array = [];

          for (let day in this.daysArray) {
            for (let workHour in this.locality.workHoursDTOs) {
              if (this.locality.workHoursDTOs[workHour].day == this.daysArray[day]) {
                dummy_array.push(this.locality.workHoursDTOs[workHour])
              }

            }
          }
          this.locality.workHoursDTOs = dummy_array;
          //console.log(dummy_array);
          //console.log("this.locality.workHoursDTOs", this.locality.workHoursDTOs);
        }


      }, error => {
        this.loading = false;
        console.log(error);
      });



  }


  //  redirect() {
  //    this.router.navigate(['/locality/tab/solutions']);
  //
  //  }




  @HostListener('window:scroll', [])
  onWindowScroll() {

    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 100) {
      this.color = 'online';

    } else {
      this.color = 'offline';

    }

  }

  getColor() {
    return this.color === 'online' ? '#ffffff' : 'white';
  }

  getOpacity() {
    return this.color === 'online' ? 0.8 : 1;
  }

  getTime(value, day) {

    this.workHours.day = day;
    this.workHours.openTm = value;
  }
  getCloseTime(value, day) {
    this.workHours.closeTm = value;
    this.locality.workHoursDTOs.push(this.workHours);
    //console.log(this.locality.workHoursDTOs);
  }
  d(event) {
    event.preventDefault();
    this.router.navigate(['/locality/map']);
  }

  getPhoneNumber(e, value) {

    let key = e.charCode || e.keyCode || 0;
    if (key !== 8 && key !== 9) {
      if (value.length === 3) {
        this.locality.phoneNumber = value + '-';
      }
      if (value.length === 7) {
        this.locality.phoneNumber = value + '-';
      }

    }

    return (key == 8 || key == 9 || key == 17 || key == 46 || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));

  }

  getNumber(value) {
  
    if (value.length === 10) {
      let val: any = +value;
      let pattern = /[0-9\+\-\ ]/;
      let phnTest = pattern.test(val);
      if(phnTest){
      let data = value.slice(0, 3);
      let pn = data + '-';
      let d2 = value.slice(3, 6);
      let pn2 = d2 + '-';
      let d3 = value.slice(6, 10);
      let phm = pn + pn2 + d3;
      this.locality.phoneNumber = phm;
      }

    }
    else {
      this.locality.phoneNumber = value;
    }


  }




}