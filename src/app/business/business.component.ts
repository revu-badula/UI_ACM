import { Component, OnInit, ChangeDetectorRef, ViewChild, TemplateRef, HostListener, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../app.config';
import { Observable } from 'rxjs';
declare let tinymce: any;
import { ApplicationUserDTO } from '../data_model_legal';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from '../dialog.service';
import { System } from '../data_model_system';
import { Cookie } from 'ng2-cookies';
import { } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UtilService } from '../util.service';



@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {
  @ViewChild('user') addUserC: TemplateRef<any>;
  @ViewChild('elem1') elem1: ElementRef<any>;
  public len: any = 0;
  public len1: any = 0;
  public test: any;
  public effort: any;
  public budget: any;
  public Bo: any;
  public Do: any;
  public Iso: any;
  public Pm: any;
  public So: any;
  public acronym: any;
  public updatedBy: any;
  public sysName: any;
  public updatedTime: any;
  system: System;
  public applicationUserDTO: ApplicationUserDTO;
  public title: any;
  public loading: boolean = false;
  public showEdit: boolean = true;

  color: String;
  public applicationViewDTO: any;

  appId: number;

  public editableForm: boolean = true;
  viewType: any;
  contentData: string = "";
  public showEditButton: boolean = false;
  public showSource: boolean = true;
  public showBox: boolean = true;
  public isShow: boolean = false;
  public users: any;


  config: any = {
    height: 250,
    width: 1080,
    theme: 'modern',
    plugins: 'textcolor wordcount colorpicker textpattern',
    toolbar: 'bold italic strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
    branding: false,
    menubar: false,
    statusbar: false
  };
  config1: any = {
    height: 250,
    width: 1080,
    theme: 'modern',
    plugins: 'textcolor wordcount colorpicker textpattern',
    toolbar: 'bold italic strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
    branding: false,
    menubar: false,
    statusbar: false

  };
  constructor(private ref: ChangeDetectorRef, private httpClient: HttpClient,
    private modalService: NgbModal, private dialog: DialogService, private _apiservice: ApiserviceService, ) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.applicationUserDTO = new ApplicationUserDTO();
    this.system = new System();
    this.config.init_instance_callback = (editor: any) => {
      editor.on('keyup', () => {
        this.getData(editor);
      });
    };
    this.config1.init_instance_callback = (editor: any) => {
      editor.on('keyup', () => {
        this.getData1(editor);
      });
    };
    let w = screen.width;
    if (w>=1600 && w < 1650) {
      this.config.width = 1245;
      this.config1.width = 1245;
    }
    else if (w > 1509 && w < 1600) {
      this.config.width = 1210;
      this.config1.width = 1210;
    }
    else if (w > 1475 && w <= 1509) {
      this.config.width = 1180;
      this.config1.width = 1180;
    }
    else if (w > 1440 && w <= 1475) {
      this.config.width = 1125;
      this.config1.width = 1125;
    }
    else if (w >= 1400 && w <= 1440) {
      this.config.width = 1115;
      this.config1.width = 1115;
    }
    else if (w >= 1310 && w <= 1330) {
      this.config.width = 1050;
      this.config1.width = 1050;
    }
    else if (w >= 1280 && w <= 1309) {
      this.config.width = 1015;
      this.config1.width = 1015;
    }
  }

  ngOnInit() {
    this.getSystem();
    //this.showData();
  }

  getData(editor: any) {
    this.len = 0;
    if (tinymce.activeEditor.getContent({ format: 'text' }).length > 50000) {
      let len: any = tinymce.activeEditor.getContent({ format: 'text' }).length;
      let re = len - 50000;
      let data: any = tinymce.activeEditor.getContent({ format: 'text' });
      let dat = data.substring(0, 50000);
      tinymce.activeEditor.setContent('<div id="idTextPanel" class="jqDnR" style="margin: 0px; padding: 0px; position: relative; color: #666666; font-family: Verdana, Geneva, Helvetica, sans-serif; font-size: 11px;"><p style="margin: 0px 0px 10px; padding: 0px; line-height: normal; font-family: Verdana, Geneva, sans-serif; font-size: 10px;">' + dat + '</p></div>');
      this.ref.detectChanges();
    }
    else if (tinymce.activeEditor.getContent() === "") {
      this.len = 0;
      this.ref.detectChanges();
    }
    else {
      this.len = tinymce.activeEditor.getContent({ format: 'text' }).length;
      this.ref.detectChanges();
    }
  };
  getData1(editor: any) {
    this.len1 = 0;
    if (tinymce.activeEditor.getContent({ format: 'text' }).length > 50000) {
      let len1: any = tinymce.activeEditor.getContent({ format: 'text' }).length;
      let re = len1 - 50000;
      let data: any = tinymce.activeEditor.getContent({ format: 'text' });
      let dat = data.substring(0, 50000);
      tinymce.activeEditor.setContent('<div id="idTextPanel" class="jqDnR" style="margin: 0px; padding: 0px; position: relative; color: #666666; font-family: Verdana, Geneva, Helvetica, sans-serif; font-size: 11px;"><p style="margin: 0px 0px 10px; padding: 0px; line-height: normal; font-family: Verdana, Geneva, sans-serif; font-size: 10px;">' + dat + '</p></div>');
      this.ref.detectChanges();
    }
    else if (tinymce.activeEditor.getContent() === "") {
      this.len1 = 0;
      this.ref.detectChanges();
    }
    else {
      this.len1 = tinymce.activeEditor.getContent({ format: 'text' }).length;
      this.ref.detectChanges();
    }
  }

  editClick() {
    this.showEdit = false;
  }

  getSystem() {
    this.loading = true;
    let url5 = APP_CONFIG.viewApplication;
    this.httpClient.get(url5 + '?' + 'acronym' + '=' + sessionStorage.getItem('systemName'))
      .subscribe((data: any) => {
        this.loading = false;
        this.getBusinessOwner();
        this.acronym = data.applicationViewDTO.acronym;
        this.updatedBy = data.applicationViewDTO.updatedBy;
        this.sysName = data.applicationViewDTO.name;
        this.system.acronym = data.applicationViewDTO.acronym;
        this.system.applicationId = data.applicationViewDTO.applicationId;
        let d = new Date(data.applicationViewDTO.updatedTime);
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        this.updatedTime = month + "/" + day + "/" + year;
        this.system = data.applicationViewDTO;
        if (this.system.description != undefined) {
          let des = this.system.description.replace(/<[^>]+>/gm, '');
          this.len = des.length;
        }
        if (this.system.costType === undefined) {
          this.system.costType = null;
        }
      }, error => {
        this.loading = false;
        console.log(error);
      });
  }

  getBusinessOwner() {
    this.loading = true;
    let url = APP_CONFIG.getBusinessOwnerB;
    let url1 = APP_CONFIG.getDataOwner;
    let url2 = APP_CONFIG.getProjectManager;
    let url3 = APP_CONFIG.getISO;
    let url4 = APP_CONFIG.getSystem_Site_Data_Owner;
    Observable.forkJoin(
      this.httpClient.get(url),
      this.httpClient.get(url1),
      this.httpClient.get(url2),
      this.httpClient.get(url3),
      this.httpClient.get(url4)
    ).subscribe((data: any) => {
      this.loading = false;
      this.Bo = data[0];
      this.Do = data[1];
      this.Pm = data[2];
      this.Iso = data[3];
      this.So = data[4];

    }, error => {
      this.loading = false;
      console.log(error);
    });
  }

  addUser(value: any) {
    this.title = "";
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.applicationUserDTO = new ApplicationUserDTO();
    if (value === 'businessOwner') {
      this.title = "Create Business Owner";
      this.applicationUserDTO.role = "BUSINESS OWNER";
    }
    else if (value === 'projectManager') {
      this.title = "Create Project Manager";
      this.applicationUserDTO.role = "PROJECT MANAGER";
    }
    else if (value === 'dataOwner') {
      this.title = "Create Data Owner";
      this.applicationUserDTO.role = "DATA OWNER";
    }
    else if (value === 'iso') {
      this.title = "Create Information Security officer";
      this.applicationUserDTO.role = "ISO";
    }
    else if (value === 'systemSiteOwner') {
      this.title = "Create Hosting System Site Owner";
      this.applicationUserDTO.role = "SYSTEM OWNER";
    }


    this.applicationUserDTO.active = true;
    this.applicationUserDTO.newEntry = true;
    this.modalService.open(this.addUserC, ngbModalOptions);
  }
  createUser() {
    this.loading = true;
    let url = APP_CONFIG.addUser;
    this.httpClient.post(url, this.applicationUserDTO)
      .subscribe((data: any) => {
        this.loading = false;
        this.dialog.open("Info", "Data has been added.", false, "ok", "ok")
          .then((result: any) => {
            this.getBusinessOwner();
          });
      }, error => {
        this.loading = false;
        console.log(error);
      });
  }

  createSystem() {
    this.system.updatedBy = Cookie.get('userName');
    let url = APP_CONFIG.updateSystem;
    var formData = new FormData();
    formData.append('application', JSON.stringify(this.system));
    this.loading = true;
    this.httpClient.post(url, formData)
      .subscribe((data: any) => {
        this.loading = false;
        this.dialog.open("Info", "Systen has been updated.", false, "OK", "OK")
          .then((result) => {

          });
      }, error => {
        this.loading = false;
        console.log(error);
      });
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

  showData() {
    if (sessionStorage.getItem('systemName') === null) {
      this.editableForm = false;
      this.isShow = true;
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




}
