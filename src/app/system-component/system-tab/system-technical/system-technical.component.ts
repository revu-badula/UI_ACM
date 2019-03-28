import { Component, OnInit, ChangeDetectorRef, ViewChild, TemplateRef } from '@angular/core';
import { APP_CONFIG } from '../../../app.config';
import { ApiserviceService } from '../../../apiservice.service';
import { System, applicationView, WorkHours } from '../../../data_model_system';
import { Cookie } from 'ng2-cookies';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DialogService } from '../../../dialog.service';
import { ApplicationUserDTO } from '../../../data_model_legal';
declare let tinymce: any;
@Component({
  selector: 'app-system-technical',
  templateUrl: './system-technical.component.html',
  styleUrls: ['./system-technical.component.css']
})
export class SystemTechnicalComponent {
  @ViewChild('user') addUserC: TemplateRef<any>;
  public applicationViewDTO: any;
  system: System;
  public applicationUserDTO: ApplicationUserDTO;
  public title: any;
  public acronym: any;
  public updatedBy: any;
  public sysName: any;
  public updatedTime: any;
  public Bo: any;
  public Do: any;
  public Iso: any;
  public Pm: any;
  public So: any;
  public loading: boolean = false;
  public len: any = 0;
  public len1: any = 0;
  public len2: any = 0;
  public len3:any = 0;
  public manager:any;
  public tech:any;
  public business:any;
  public admin:any;
  public developer:any;
  public data:any;
  public tester:any;
  system1:any;
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
  config2: any = {
    height: 250,
    width: 1080,
    theme: 'modern',
    plugins: 'textcolor wordcount colorpicker textpattern',
    toolbar: 'bold italic strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
    branding: false,
    menubar: false,
    statusbar: false
  };
  config3: any = {
    height: 250,
    width: 1080,
    theme: 'modern',
    plugins: 'textcolor wordcount colorpicker textpattern',
    toolbar: 'bold italic strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
    branding: false,
    menubar: false,
    statusbar: false
  };
  constructor(private ref: ChangeDetectorRef,private dialog: DialogService, private httpClient: HttpClient, private _apiservice: ApiserviceService,private modalService: NgbModal) {
    this.getTechnologies();
    this. getTechProjectManager();
    this.getBusinessAnalyst();
    this. getSystemAdministrator();
    this.getDbAdmin();
    this.getDevelopers();
    this.getDevelopers();
    this.getDataCustodian();
    this.applicationUserDTO = new ApplicationUserDTO();
    this.getTesters();
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
    this.config2.init_instance_callback = (editor: any) => {
      editor.on('keyup', () => {
        this.getData2(editor);
      });
    };
    this.config3.init_instance_callback = (editor: any) => {
      editor.on('keyup', () => {
        this.getData3(editor);
      });
    };
    let w = screen.width;
    if (w > 1475) {
      this.config.width = 1180;
      this.config1.width = 1180;
      this.config2.width = 1180;
      this.config3.width = 1180;
    }
    else if (w > 1440 && w <= 1475) {
      this.config.width = 1125;
      this.config1.width = 1125;
      this.config2.width = 1125;
      this.config3.width = 1125;
    }
    else if (w >= 1400 && w <= 1440) {
      this.config.width = 1115;
      this.config1.width = 1115;
      this.config2.width = 1115;
      this.config3.width = 1115;
    }
    else if (w >= 1310 && w <= 1330) {
      this.config.width = 1050;
      this.config1.width = 1050;
      this.config2.width = 1050;
      this.config3.width = 1050;
    }
    else if (w >= 1280 && w <= 1309) {
      this.config.width = 1020;
      this.config1.width = 1020;
      this.config2.width = 1020;
      this.config3.width = 1020;
    }
  }



  ngOnInit() {
    this.getSystem();
  }
  getTechnologies(){
    this._apiservice.getTechnologies()
    .subscribe((data: any) => {
      this.tech  = data;
      console.log( this.tech);

    }, error => console.log(error));
  }
  getTechProjectManager(){
    this._apiservice.getTechProjectManager()
    .subscribe((data: any) => {
      this.manager  = data;
      console.log(this.manager );

    }, error => console.log(error));
  }
  getSystemAdministrator(){
    this._apiservice.getTechProjectManager()
    .subscribe((data: any) => {
      this.system1 = data;
      console.log(this.system1 );

    }, error => console.log(error));
  }
  getDbAdmin(){
    this._apiservice.getDbAdmin()
    .subscribe((data: any) => {
      this.admin  = data;
      console.log(this.admin);

    }, error => console.log(error));
  }
  getTesters(){
    this._apiservice.getTesters()
    .subscribe((data: any) => {
      this.tester  = data;
      console.log(  this.tester );

    }, error => console.log(error));
  }
  getDataCustodian(){
    this._apiservice.getDataCustodian()
    .subscribe((data: any) => {
      this.data  = data;
      console.log(  this.data );

    }, error => console.log(error)); 
  }
  getBusinessAnalyst(){
    this._apiservice.getBusinessAnalyst()
    .subscribe((data: any) => {
      this.business  = data;
      console.log(  this.business );

    }, error => console.log(error));
  }


  createSystem() {
    this.system.updatedBy = Cookie.get('userName');
    let url = APP_CONFIG.updateSystem;
    var formData = new FormData();

    let technicalData: any = Object.assign({}, this.system.technologiesDTOs);

    this.system.technologiesDTOs = [];
    this.system.technologiesDTOs.push(technicalData);


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
        if(this.system.description != undefined){
        let des = this.system.description.replace(/<[^>]+>/gm, '');
        this.len = des.length;
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


  getDevelopers(){
    this._apiservice.getDevelopers()
    .subscribe((data: any) => {
      this.developer  = data;
      console.log(  this.developer );

    }, error => console.log(error)); 
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
  getData3(editor: any) {
    this.len3 = 0;
    if (tinymce.activeEditor.getContent({ format: 'text' }).length > 50000) {
      let len4: any = tinymce.activeEditor.getContent({ format: 'text' }).length;
      let re = len4 - 50000;
      let data: any = tinymce.activeEditor.getContent({ format: 'text' });
      let dat = data.substring(0, 50000);
      tinymce.activeEditor.setContent('<div id="idTextPanel" class="jqDnR" style="margin: 0px; padding: 0px; position: relative; color: #666666; font-family: Verdana, Geneva, Helvetica, sans-serif; font-size: 11px;"><p style="margin: 0px 0px 10px; padding: 0px; line-height: normal; font-family: Verdana, Geneva, sans-serif; font-size: 10px;">' + dat + '</p></div>');
      this.ref.detectChanges();
    }
    else if (tinymce.activeEditor.getContent() === "") {
      this.len3 = 0;
      this.ref.detectChanges();
    }
    else {
      this.len3 = tinymce.activeEditor.getContent({ format: 'text' }).length;
      this.ref.detectChanges();
    }
  };
  getData2(editor: any) {
    this.len2 = 0;
    if (tinymce.activeEditor.getContent({ format: 'text' }).length > 50000) {
      let len2: any = tinymce.activeEditor.getContent({ format: 'text' }).length;
      let re = len2 - 50000;
      let data: any = tinymce.activeEditor.getContent({ format: 'text' });
      let dat = data.substring(0, 50000);
      tinymce.activeEditor.setContent('<div id="idTextPanel" class="jqDnR" style="margin: 0px; padding: 0px; position: relative; color: #666666; font-family: Verdana, Geneva, Helvetica, sans-serif; font-size: 11px;"><p style="margin: 0px 0px 10px; padding: 0px; line-height: normal; font-family: Verdana, Geneva, sans-serif; font-size: 10px;">' + dat + '</p></div>');
      this.ref.detectChanges();
    }
    else if (tinymce.activeEditor.getContent() === "") {
      this.len2 = 0;
      this.ref.detectChanges();
    }
    else {
      this.len2 = tinymce.activeEditor.getContent({ format: 'text' }).length;
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


  addUser(value: any) {
    this.title = "";
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.applicationUserDTO = new ApplicationUserDTO();
    if (value === 'appTechnicalManagers') {
      this.title = "Create Technical Managers";
      this.applicationUserDTO.role = "TECHNICAL MANAGER";
    }
    // else if (value === 'projectManager') {
    //   this.title = "Create Project Manager";
    //   this.applicationUserDTO.role = "PROJECT MANAGER";
    // }
    // else if (value === 'dataOwner') {
    //   this.title = "Create Data Owner";
    //   this.applicationUserDTO.role = "DATA OWNER";
    // }
    // else if (value === 'iso') {
    //   this.title = "Create Information Security officer";
    //   this.applicationUserDTO.role = "ISO";
    // }
    // else if (value === 'systemSiteOwner') {
    //   this.title = "Create Hosting System Site Owner";
    //   this.applicationUserDTO.role = "SYSTEM OWNER";
    // }
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


}
