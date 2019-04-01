import { Component, OnInit, ChangeDetectorRef, ViewChild, TemplateRef } from '@angular/core';
import { APP_CONFIG } from '../../../app.config';
import { ApiserviceService } from '../../../apiservice.service';
import { System, TechnologiesDTO, ApplicationDatabaseDTO, applicationView, WorkHours, ApplicationServerDTO } from '../../../data_model_system';
import { Cookie } from 'ng2-cookies';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DialogService } from '../../../dialog.service';
import { ApplicationUserDTO } from '../../../data_model_legal';
import { JSDocCommentStmt } from '@angular/compiler';
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
  public templist: any = [];
  public tester: any;
  applicationUserDTOsystem: ApplicationUserDTO;
  applicationUserDTObusiness: ApplicationUserDTO;
  applicationUserDTOdata: ApplicationUserDTO;
  applicationServerDTO: ApplicationDatabaseDTO;
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
    this.applicationUserDTO = new ApplicationUserDTO();
    this.applicationServerDTO = new ApplicationDatabaseDTO();
    this.technologiesDTOs = new TechnologiesDTO();
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

  getServers(value: any) {
    console.log(value);
    if (value === "") {

    }
    else {
      this.applicationServerDTO = new ApplicationDatabaseDTO();
      for (let i = 0; i < this.app.length; i++) {
        if (this.app[i].databaseId === +value) {
          this.applicationServerDTO = this.app[i];
          this.applicationServerDTO.newEntry = true;
        }
      }
      if (this.system.applicationServerDTOs != undefined && this.system.applicationServerDTOs.length > 0) {
        this.system.applicationServerDTOs.push(this.applicationServerDTO);
      }
      else {
        this.system.applicationServerDTOs = [];
        this.system.applicationServerDTOs.push(this.applicationServerDTO);
      }
    }
  }

  getDatabases() {
    this._apiservice.getDatabases()
      .subscribe((data: any) => {
        this.base = data;

      }, error => console.log(error));
  }
  getTechnologies() {
    this._apiservice.getTechnologies()
      .subscribe((data: any) => {
        this.tech = data;
        if (this.system.technologiesDTOs != undefined && this.system.technologiesDTOs.length > 0) {
          for (let i = 0; i < this.system.technologiesDTOs.length; i++) {
            for (let j = 0; j < this.tech.length; j++) {
              if (this.system.technologiesDTOs[i].technologyId === this.tech[i].technologyId) {
                this.tech.splice(i, 1);
              }
            }
          }
          // this.tech=tech;
        }
        else {
          this.tech = data;
        }

      }, error => console.log(error));
  }
  getTechProjectManager() {
    this._apiservice.getTechProjectManager()
      .subscribe((data: any) => {
        this.manager = data;


      }, error => console.log(error));
  }


  getApplicationServers() {
    this._apiservice.getApplicationServers()
      .subscribe((data: any) => {
        this.app = data;
      }, error => console.log(error));
  }
  getSystemAdministrator() {
    this._apiservice.getTechProjectManager()
      .subscribe((data: any) => {
        this.system1 = data;

      }, error => console.log(error));
  }
  getDbAdmin() {
    this._apiservice.getDbAdmin()
      .subscribe((data: any) => {
        this.admin = data;

      }, error => console.log(error));
  }
  getTesters() {
    this._apiservice.getTesters()
      .subscribe((data: any) => {
        this.tester = data;


      }, error => console.log(error));
  }
  getDataCustodian() {
    this._apiservice.getDataCustodian()
      .subscribe((data: any) => {
        this.data = data;


      }, error => console.log(error));
  }
  getBusinessAnalyst() {
    this._apiservice.getBusinessAnalyst()
      .subscribe((data: any) => {
        this.business = data;


      }, error => console.log(error));
  }

  checkvalue(value: any) {

  }
  checkvalue1(value: any) {

  }
  setTrue(value: any) {

    for (let i = 0; i < this.tech.length; i++) {

      if (this.tech[i].technologyId === +value) {
        this.technologiesDTOs = new TechnologiesDTO();
        this.technologiesDTOs.technologyId = this.tech[i].technologyId;
        this.technologiesDTOs.name = this.tech[i].name;
        this.technologiesDTOs.technologyVersion = this.tech[i].technologyVersion;
        this.technologiesDTOs.newEntry = true;
        this.technologiesDTOs.active = true;
        if (this.system.technologiesDTOs != undefined && this.system.technologiesDTOs.length > 0)
          this.system.technologiesDTOs.push(this.technologiesDTOs);
        else {
          this.system.technologiesDTOs = [];
          this.system.technologiesDTOs.push(this.technologiesDTOs);

        }
        this.tech.splice(i, 1);

      }
    }
  }




  hideMinus(value: any) {

    for (let i = 0; i < this.system.technologiesDTOs.length; i++) {
      if (this.system.technologiesDTOs[i].technologyId === +value) {
        this.system.technologiesDTOs[i].active = false;
        this.tech.push(this.system.technologiesDTOs[i]);
        this.system.technologiesDTOs.splice(i, 1);
      }
    }
  }

  spliceLang(index) {
    this.tech.splice(index, 1);
  }


  setT() {
    if (this.system.technologiesDTOs != null) {
      for (let i = 0; i < this.system.technologiesDTOs.length; i++) {
        this.system.technologiesDTOs[i].newEntry = true;
      }
    }
  }
  setTrue1() {
    if (this.system.appTechnicalManagers != null) {
      for (let i = 0; i < this.system.appTechnicalManagers.length; i++) {
        this.system.appTechnicalManagers[i].newEntry = true;
      }
    }
  }
  setTrue2() {
    if (this.system.appTechnicalManagers != null) {
      for (let i = 0; i < this.system.appSystemAdminsters.length; i++) {
        this.system.appSystemAdminsters[i].newEntry = true;
      }
    }
  }

  setTrue3() {
    if (this.system.appBusinessAnalysts != null) {
      for (let i = 0; i < this.system.appBusinessAnalysts.length; i++) {
        this.system.appBusinessAnalysts[i].newEntry = true;
      }
    }
  }

  setTrue4() {
    if (this.system.appDBAdmins != null) {
      for (let i = 0; i < this.system.appDBAdmins.length; i++) {
        this.system.appDBAdmins[i].newEntry = true;
      }
    }
  }

  setTrue5() {
    if (this.system.developers != null) {
      for (let i = 0; i < this.system.developers.length; i++) {
        this.system.developers[i].newEntry = true;
      }
    }
  }

  setTrue6() {
    if (this.system.appDataCustodians != null) {
      for (let i = 0; i < this.system.appDataCustodians.length; i++) {
        this.system.appDataCustodians[i].newEntry = true;
      }
    }

  }

  setTrue7() {
    if (this.system.testers != null) {
      for (let i = 0; i < this.system.testers.length; i++) {
        this.system.testers[i].newEntry = true;
      }
    }
  }

  onDatabaseSelection(value: any) {

    this.applicationDatabaseDTOs = new ApplicationDatabaseDTO();

    for (let i = 0; i < value.length; i++) {
      this.applicationDatabaseDTOs.databaseId = value[i].databaseId;
      this.applicationDatabaseDTOs.hostName = value[i].hostName;
      this.applicationDatabaseDTOs.newEntry = true;
    }
    if (this.system.applicationDatabaseDTOs != undefined && this.system.applicationDatabaseDTOs.length > 0) {
      this.system.applicationDatabaseDTOs.push(this.applicationDatabaseDTOs);
    }
    else {
      this.system.applicationDatabaseDTOs = [];
      this.system.applicationDatabaseDTOs.push(this.applicationDatabaseDTOs);
    }

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
        this.system.technologiesDTOs = data.applicationViewDTO.technologies;
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
    // this.getTechnologies();
    // this.getTechProjectManager();
    // this.getBusinessAnalyst();
    // this.getSystemAdministrator();
    // this.getDbAdmin();
    // this.getDevelopers();
    // this.getDataCustodian();
    // this.getApplicationServers();
    // this.getDatabases();
    // this.getTesters();
    this.loading = true;
    let url = APP_CONFIG.getBusinessAnalyst;
    let url1 = APP_CONFIG.getDataCustodian;
    let url2 = APP_CONFIG.getTesters;
    let url3 = APP_CONFIG.getDbAdmin;
    let url4 = APP_CONFIG.getSystemAdministrator;
    let url5 = APP_CONFIG.getTechProjectManager;
    let url6 = APP_CONFIG.getDevelopers;
    let url7 = APP_CONFIG.getApplicationServers;
    let url8 = APP_CONFIG.getTechnologies;
    let url9 = APP_CONFIG.getDatabases;
    Observable.forkJoin(
      this.httpClient.get(url),
      this.httpClient.get(url1),
      this.httpClient.get(url2),
      this.httpClient.get(url3),
      this.httpClient.get(url4),
      this.httpClient.get(url5),
      this.httpClient.get(url6),
      this.httpClient.get(url7),
      this.httpClient.get(url8),
      this.httpClient.get(url9),
    ).subscribe((data: any) => {
      this.loading = false;
      this.business = data[0];
      this.data = data[1];
      this.tester = data[2];
      this.admin = data[3];
      this.system1 = data[4];
      this.manager = data[5];
      this.developer = data[6];
      this.app = data[7];
      
      this.base = data[9];
      this.tech=[];
      if (this.system.technologiesDTOs != undefined && this.system.technologiesDTOs.length > 0) {
        let tech = data[8];
        for (let i = 0; i < this.system.technologiesDTOs.length; i++) {
          for (let j = 0; j < tech.length; j++) {
            if (this.system.technologiesDTOs[i].technologyId === tech[j].technologyId) {
              tech.splice(j, 1);
            }
           
          }
        }
        this.tech=tech;
      }
      else {
        this.tech = data[8];
      }
    }, error => {
      this.loading = false;
      console.log(error);
    });
  }


  getDevelopers() {
    this._apiservice.getDevelopers()
      .subscribe((data: any) => {
        this.developer = data;
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
