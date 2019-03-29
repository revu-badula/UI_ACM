import { Component, OnInit, ChangeDetectorRef, ViewChild, TemplateRef } from '@angular/core';
import { APP_CONFIG } from '../../../app.config';
import { ApiserviceService } from '../../../apiservice.service';
import { System, TechnologiesDTO, ApplicationDatabaseDTO, applicationView, WorkHours } from '../../../data_model_system';
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
  public applicationDatabaseDTOs: ApplicationDatabaseDTO;
  public applicationUserDTOdeveloper: ApplicationUserDTO;
  public applicationUserDTOList: Array<ApplicationUserDTO> = [];
  public applicationUserDTOList1: Array<ApplicationUserDTO> = [];
  public applicationUserDTOList2: Array<ApplicationUserDTO> = [];
  public applicationUserDTOList3: Array<ApplicationUserDTO> = [];
  public applicationUserDTOList4: Array<ApplicationUserDTO> = [];
  public applicationUserDTOList5: Array<ApplicationUserDTO> = [];
  public applicationUserDTOList6: Array<ApplicationUserDTO> = [];
  public applicationUserDTOList7: Array<ApplicationUserDTO> = [];
  public title: any;
  public acronym: any;
  technologiesDTOs: TechnologiesDTO;
  public updatedBy: any;
  public sysName: any;
  public updatedTime: any;
  public Bo: any;
  public Do: any;
  public Iso: any;
  public Pm: any;
  public So: any;
  public Ao: any;
  public Co: any;
  databaseServer: any;
  applicationUserDTOdb: ApplicationUserDTO;
  public loading: boolean = false;
  public len: any = 0;
  public len1: any = 0;
  public len2: any = 0;
  public len3: any = 0;
  public manager: any;
  public tech: any;
  public business: any;
  public admin: any;
  public developer: any;
  public data: any;
  public base: any;
  app: any;
  public tester: any;
  applicationUserDTOsystem: ApplicationUserDTO;
  applicationUserDTObusiness: ApplicationUserDTO;
  applicationUserDTOdata: ApplicationUserDTO;
  testID: any;
  system1: any;
  developerID: any;
  techID: any;
  sysID: any;
  businessID: any;
  dbID: any;
  dataID: any;
  public programmingLanguage: any;
  public programmingLanguageList: any = [];
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
  applicationUserDTOtest: ApplicationUserDTO;
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
  constructor(private ref: ChangeDetectorRef, private dialog: DialogService, private httpClient: HttpClient, private _apiservice: ApiserviceService, private modalService: NgbModal) {
    this.getTechnologies();
    this.getTechProjectManager();
    this.getBusinessAnalyst();
    this.getSystemAdministrator();
    this.getDbAdmin();
    this.getDevelopers();
    this.getDevelopers();
    this.getDataCustodian();
    this.getApplicationServers();
    this.getDatabases();
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
  refresh() {
    this.getDevelopers();
  }
  selectDeveloper() {
    for (let i = 0; i < this.developer.length; i++) {
      if (this.developer[i].userId === this.developerID) {
        this.applicationUserDTO = this.developer[i];
      }
    }
  }

  selectTech() {
    for (let i = 0; i < this.manager.length; i++) {
      if (this.manager[i].userId === this.techID) {
        this.applicationUserDTOdeveloper = this.manager[i];
      }
    }
  }

  storeLanguage() {
    for (let i = 0; i < this.tech.length; i++) {
      if (this.tech[i].technologyID === this.programmingLanguage) {
        this.programmingLanguage = this.tech[i];
      }
    }
  }

  selectSys() {
    for (let i = 0; i < this.system1.length; i++) {
      if (this.system1[i] != null) {
        if (this.system1[i].userId === this.sysID) {
          this.applicationUserDTOsystem = this.system1[i];
        }
      }
    }
  }

  selectBusiness() {

    for (let i = 0; i < this.business.length; i++) {
      if (this.business[i].userId === this.businessID) {
        this.applicationUserDTObusiness = this.business[i];
      }
    }
  }

  selectDb() {
    for (let i = 0; i < this.admin.length; i++) {
      if (this.admin[i].userId === this.dbID) {
        this.applicationUserDTOdb = this.admin[i];
      }
    }
  }

  selectData() {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].userId === this.dataID) {
        this.applicationUserDTOdata = this.data[i];
      }
    }
  }
  selectTester() {
    for (let i = 0; i < this.tester.length; i++) {
      if (this.tester[i].userId === this.testID) {
        this.applicationUserDTOtest = this.tester[i];
      }
    }
  }

  getDatabases() {
    this._apiservice.getDatabases()
      .subscribe((data: any) => {
        this.base = data;
        console.log(this.base);

      }, error => console.log(error));
  }
  getTechnologies() {
    this._apiservice.getTechnologies()
      .subscribe((data: any) => {
        this.tech = data;
        console.log(this.tech);

      }, error => console.log(error));
  }
  getTechProjectManager() {
    this._apiservice.getTechProjectManager()
      .subscribe((data: any) => {
        this.manager = data;
        console.log(this.manager);

      }, error => console.log(error));
  }


  getApplicationServers() {
    this._apiservice.getApplicationServers()
      .subscribe((data: any) => {
        this.app = data;
        console.log(this.app);

      }, error => console.log(error));
  }
  getSystemAdministrator() {
    this._apiservice.getTechProjectManager()
      .subscribe((data: any) => {
        this.system1 = data;
        console.log(this.system1);

      }, error => console.log(error));
  }
  getDbAdmin() {
    this._apiservice.getDbAdmin()
      .subscribe((data: any) => {
        this.admin = data;
        console.log(this.admin);

      }, error => console.log(error));
  }
  getTesters() {
    this._apiservice.getTesters()
      .subscribe((data: any) => {
        this.tester = data;
        console.log(this.tester);

      }, error => console.log(error));
  }
  getDataCustodian() {
    this._apiservice.getDataCustodian()
      .subscribe((data: any) => {
        this.data = data;
        console.log(this.data);

      }, error => console.log(error));
  }
  getBusinessAnalyst() {
    this._apiservice.getBusinessAnalyst()
      .subscribe((data: any) => {
        this.business = data;
        console.log(this.business);

      }, error => console.log(error));
  }

  checkvalue(value){
    console.log(value);
  }
  checkvalue1(value){
    console.log(value);
  }
  onDatabaseSelection(value:any) {
    console.log(this.databaseServer);
    console.log(value);
    let applicationDto = new ApplicationDatabaseDTO();
    console.log(value.hostName);
    applicationDto.hostName=value.hostName;
    let applicationList: Array<ApplicationDatabaseDTO> = [];
    applicationList.push(applicationDto);
    console.log(applicationList);
    this.system.applicationDatabaseDTOs=applicationList;
    // console.log(this.databaseServer);
    // let appliactionDto = new ApplicationDatabaseDTO();
    // let data = this.databaseServer;

    // appliactionDto.hostName = data.hostName;
    // let applicationList: Array<ApplicationDatabaseDTO> = [];
    // applicationList.push(appliactionDto);
    // this.system.applicationDatabaseDTOs = applicationList;
    // console.log(this.system.applicationDatabaseDTOs);
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
      }, error => {
        this.loading = false;
        console.log(error);
      });
  }


  getBusinessOwner() {
    this.loading = true;
    let url = APP_CONFIG.getBusinessAnalyst;
    let url1 = APP_CONFIG.getDataCustodian;
    let url2 = APP_CONFIG.getTesters;
    let url3 = APP_CONFIG.getDbAdmin;
    let url4 = APP_CONFIG.getSystemAdministrator;
    let url5 = APP_CONFIG.getTechProjectManager;
    let url6 = APP_CONFIG.getDevelopers;
    Observable.forkJoin(
      this.httpClient.get(url),
      this.httpClient.get(url1),
      this.httpClient.get(url2),
      this.httpClient.get(url3),
      this.httpClient.get(url4),
      this.httpClient.get(url5),
      this.httpClient.get(url6),
    ).subscribe((data: any) => {
      this.loading = false;
      this.Bo = data[0];
      this.Do = data[1];
      this.Pm = data[2];
      this.Iso = data[3];
      this.So = data[4];
      this.Ao = data[5];
      this.Co = data[6];

    }, error => {
      this.loading = false;
      console.log(error);
    });
  }


  getDevelopers() {
    this._apiservice.getDevelopers()
      .subscribe((data: any) => {
        this.developer = data;
        console.log(this.developer);

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
    if (value === 'appTechnicalManagers9') {
      this.title = "Create Technical Managers";
      this.applicationUserDTO.role = "TECHPROJECT MANAGER";
    }
    else if (value === 'dbAdministrator') {
      this.title = "Create dbAdministrator Manager";
      this.applicationUserDTO.role = "DB ADMINISTRATOR";
    }
    else if (value === 'developer') {
      this.title = "Create developer";
      this.applicationUserDTO.role = "DEVELOPER";
    }
    else if (value === 'tester') {
      this.title = "Create Information Security officer";
      this.applicationUserDTO.role = "TESTER";
    }
    else if (value === 'systemadmin') {
      this.title = "Create system administrator";
      this.applicationUserDTO.role = "SYSTEM ADMINISTRATOR";
    }
    else if (value === 'businessanalyst') {
      this.title = "Create business analyst";
      this.applicationUserDTO.role = "BUSINESS ANALYST";
    }
    else if (value === 'datacustodian') {
      this.title = "Create data custodian";
      this.applicationUserDTO.role = "DATA CUSTODIAN";
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


}
