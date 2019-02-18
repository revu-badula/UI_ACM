import { APP_CONFIG } from '../../../app.config';
import { Location } from '@angular/common';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { File } from 'babel-types';
import { System, applicationView, WorkHours } from '../../../data_model_system';
import { Component, OnInit, HostListener, ViewChild, ElementRef, TemplateRef, NgModule } from '@angular/core';
import { ApiserviceService } from '../../../apiservice.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../../../util.service';
import { SystemFilterPipeDate } from '../../system-date-filter';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-system-details',
  templateUrl: './system-details.component.html',
  styleUrls: ['./system-details.component.css'],
  providers: [ApiserviceService]
})
export class SystemDetailsComponent implements OnInit {

  @ViewChild('editForm') solutionsForm: NgForm;
  @ViewChild('content') content: TemplateRef<any>;

  color: String;
  public applicationViewDTO: any;
  system: System;
  appId: number;
  updatedTime: any;
  public editableForm: boolean = true;
  viewType: any;
  contentData: string = "";
  public showEditButton: boolean = false;
  public showSource: boolean = true;
  public loading: boolean = false;
  public showBox: boolean = true;
  public isShow:boolean=false;
  public users:any;

  constructor(private route: ActivatedRoute, private _apiservice: ApiserviceService,
    private fb: FormBuilder, private http: Http, private _location: Location, private modalService: NgbModal, private router: Router, private utilservice: UtilService) {
    this.system = new System();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.showData();
    this.getUsers();
  }

  ngOnInit() {

  }

  editClick(event): void {
    this.editableForm = false;
    this.isShow = true;
    this.showSource = true;

  }

  showData() {
    if (sessionStorage.getItem('systemName') === null) {
      this.editableForm = false;
      this.isShow=true;
    }
    else {
      this.loading = true;
      this._apiservice.viewApplication(sessionStorage.getItem('systemName'))
        .subscribe((data: any) => {
          this.showSource = false;
          this.loading = false;
          this.showEditButton = true;
          this.showBox = false;
          this.system = data.applicationViewDTO;
          this.appId = data.applicationViewDTO.applicationId;
          let d = new Date(this.system.updatedTime);
          let day = d.getDate();
          let month = d.getMonth() + 1;
          let year = d.getFullYear();
          this.updatedTime = month + "/" + day + "/" + year;
          sessionStorage.setItem('systemActive', 'true');
        }, error => {
          this.loading = false;
          console.log(error);
        });
    }
  }


  createSystem() {

    let url_update = APP_CONFIG.addSystem;
    var formData = new FormData();
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    if (this.appId === undefined) {
      this.loading = true;
      this.system.createdBy = Cookie.get('userName');
      formData.append('createApp', JSON.stringify(this.system));
      this.http.post(url_update, formData)
        .map(res => res.json())
        .subscribe((data: any) => {
          this.loading = false;
          this.appId = data.applicationViewDTO.applicationId;
          this.contentData = "System has been created.";
          sessionStorage.setItem('systemName', data.applicationViewDTO.acronym);
          sessionStorage.setItem('systemActive', 'true');
          this.modalService.open(this.content, ngbModalOptions);
        }, error => {
          this.loading = false;
          console.log(error);
        });

    }
    else {
      this.loading = true;
      this.system.applicationId = this.appId;
      this.system.updatedBy = Cookie.get('userName');
      formData.append('application', JSON.stringify(this.system));
      this.http.post(APP_CONFIG.updateSystem, formData).subscribe((data: any) => {
        this.loading = false;
        this.contentData = "System has been updated.";
        this.modalService.open(this.content, ngbModalOptions);
      }, error => {
        this.loading = false;
        console.log(error);
      });
    }

  }

  selectDefinitive(val) {

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

  getColor() {
    return this.color === 'online' ? '#ffffff' : 'white';
  }

  getOpacity() {
    return this.color === 'online' ? 0.8 : 1;
  }

  goBack(event) {
    event.preventDefault();
    this.router.navigate(['/system/map']);
  }
  getUsers() {
    this._apiservice.getUsers()
      .subscribe((data: any) => {
        this.users = data;

      }, error => console.log(error));

  }



}