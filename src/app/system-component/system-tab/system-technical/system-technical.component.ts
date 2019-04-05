import { Component, OnInit, ChangeDetectorRef, ViewChild, TemplateRef } from '@angular/core';
import { APP_CONFIG } from '../../../app.config';
import { ApiserviceService } from '../../../apiservice.service';
import { System, TechnologiesDTO, ApplicationDatabaseDTO, ApplicationServerDTO } from '../../../data_model_system';
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
  applicationDatabase: ApplicationDatabaseDTO;
  applicationServer: ApplicationDatabaseDTO;
  applicationTechManager: ApplicationUserDTO;
  public title: any;
  public acronym: any;
  technologiesDTOs: TechnologiesDTO;
  public updatedBy: any;
  public sysName: any;
  public updatedTime: any;
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
  public datac: any;
  public base: any;
  app: any;
  public templist: any = [];
  public tester: any;
  public showTableTech: boolean = false;
  public showTableBase: boolean = false;
  public showTableServer: boolean = false;
  public showTableManager: boolean = false;
  public showTableSysAdmin: boolean = false;
  public showTableBusiness: boolean = false;
  public showTableDBAdmin: boolean = false;
  public showTableDeveloper: boolean = false;
  public showTableData: boolean = false;
  public showTableTest: boolean = false;
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
  public showEdit: boolean = true;
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
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
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

  getTesters(value: any) {
    if (value === "Choose...") {

    }
    else {
      for (let i = 0; i < this.tester.length; i++) {
        if (this.tester[i].userId === +value) {
          this.applicationTechManager = new ApplicationUserDTO();
          this.applicationTechManager.userId = this.tester[i].userId;
          this.applicationTechManager.firstName = this.tester[i].firstName;
          this.applicationTechManager.lastName = this.tester[i].lastName;
          this.applicationTechManager.applicationUserId = this.tester[i].applicationUserId;
          this.applicationTechManager.active = true;
          this.applicationTechManager.newEntry = true;
          if (this.system.testers != undefined && this.system.testers.length > 0) {
            this.system.testers.push(this.applicationTechManager);
          }
          else {
            this.system.testers = [];
            this.system.testers.push(this.applicationTechManager);
          }
          this.tester.splice(i, 1);
          this.showTableTest = true;
        }
      }

    }
  }
  deleteTest(value: any) {
    for (let i = 0; i < this.system.testers.length; i++) {
      if (this.system.testers[i].userId === value) {
        if (this.system.testers[i].active) {
          this.system.testers[i].active = false;
          this.system.testers[i].newEntry = false;
          this.tester.push(this.system.testers[i]);
          if (this.system.testers[i].applicationUserId === 0)
            this.system.testers.splice(i, 1);
        }
      }
    }
  }

  getDataCustodian(value: any) {
    if (value === "Choose...") {

    }
    else {
      for (let i = 0; i < this.datac.length; i++) {
        if (this.datac[i].userId === +value) {
          this.applicationTechManager = new ApplicationUserDTO();
          this.applicationTechManager.userId = this.datac[i].userId;
          this.applicationTechManager.firstName = this.datac[i].firstName;
          this.applicationTechManager.lastName = this.datac[i].lastName;
          this.applicationTechManager.applicationUserId = this.datac[i].applicationUserId;
          this.applicationTechManager.active = true;
          this.applicationTechManager.newEntry = true;
          if (this.system.appDataCustodians != undefined && this.system.appDataCustodians.length > 0) {
            this.system.appDataCustodians.push(this.applicationTechManager);
          }
          else {
            this.system.appDataCustodians = [];
            this.system.appDataCustodians.push(this.applicationTechManager);
          }
          this.datac.splice(i, 1);
          this.showTableData = true;
        }
      }
    }
  }

  deleteCustodian(value: any) {
    for (let i = 0; i < this.system.appDataCustodians.length; i++) {
      if (this.system.appDataCustodians[i].userId === value) {
        if (this.system.appDataCustodians[i].active) {
          this.system.appDataCustodians[i].active = false;
          this.system.appDataCustodians[i].newEntry = false;
          this.datac.push(this.system.appDataCustodians[i]);
          if (this.system.appDataCustodians[i].applicationUserId === 0)
            this.system.appDataCustodians.splice(i, 1);
        }
      }
    }
  }


  getDevelopers(value: any) {
    if (value === "Choose...") {

    }
    else {
      for (let i = 0; i < this.developer.length; i++) {
        if (this.developer[i].userId === +value) {
          this.applicationTechManager = new ApplicationUserDTO();
          this.applicationTechManager.userId = this.developer[i].userId;
          this.applicationTechManager.firstName = this.developer[i].firstName;
          this.applicationTechManager.lastName = this.developer[i].lastName;
          this.applicationTechManager.applicationUserId = this.developer[i].applicationUserId;
          this.applicationTechManager.active = true;
          this.applicationTechManager.newEntry = true;
          if (this.system.developers != undefined && this.system.developers.length > 0) {
            this.system.developers.push(this.applicationTechManager);
          }
          else {
            this.system.developers = [];
            this.system.developers.push(this.applicationTechManager);
          }
          this.developer.splice(i, 1);
          this.showTableDeveloper = true;
        }
      }
    }
  }
  deleteDeveloper(value: any) {
    for (let i = 0; i < this.system.developers.length; i++) {
      if (this.system.developers[i].userId === value) {
        if (this.system.developers[i].active) {
          this.system.developers[i].active = false;
          this.system.developers[i].newEntry = false;
          this.developer.push(this.system.developers[i]);
          if (this.system.developers[i].applicationUserId === 0)
            this.system.developers.splice(i, 1);
        }
      }
    }
  }

  getDbAdmin(value: any) {
    if (value === "Choose...") {

    }
    else {

      for (let i = 0; i < this.admin.length; i++) {
        if (this.admin[i].userId === +value) {
          this.applicationTechManager = new ApplicationUserDTO();
          this.applicationTechManager.userId = this.admin[i].userId;
          this.applicationTechManager.firstName = this.admin[i].firstName;
          this.applicationTechManager.lastName = this.admin[i].lastName;
          this.applicationTechManager.applicationUserId = this.admin[i].applicationUserId;
          this.applicationTechManager.active = true;
          this.applicationTechManager.newEntry = true;
          if (this.system.appDBAdmins != undefined && this.system.appDBAdmins.length > 0) {
            this.system.appDBAdmins.push(this.applicationTechManager);
          }
          else {
            this.system.appDBAdmins = [];
            this.system.appDBAdmins.push(this.applicationTechManager);
          }
          this.admin.splice(i, 1);
          this.showTableDBAdmin = true;
        }
      }

    }
  }

  deleteDbAdmin(value: any) {
    for (let i = 0; i < this.system.appDBAdmins.length; i++) {
      if (this.system.appDBAdmins[i].userId === value) {
        if (this.system.appDBAdmins[i].active) {
          this.system.appDBAdmins[i].active = false;
          this.system.appDBAdmins[i].newEntry = false;
          this.admin.push(this.system.appDBAdmins[i]);
          if (this.system.appDBAdmins[i].applicationUserId === 0)
            this.system.appDBAdmins.splice(i, 1);
        }
      }
    }
  }

  getBusiness(value: any) {
    if (value === "Choose...") {

    }
    else {

      for (let i = 0; i < this.business.length; i++) {
        if (this.business[i].userId === +value) {
          this.applicationTechManager = new ApplicationUserDTO();
          this.applicationTechManager.userId = this.business[i].userId;
          this.applicationTechManager.firstName = this.business[i].firstName;
          this.applicationTechManager.lastName = this.business[i].lastName;
          this.applicationTechManager.applicationUserId = this.business[i].applicationUserId;
          this.applicationTechManager.active = true;
          this.applicationTechManager.newEntry = true;
          if (this.system.appBusinessAnalysts != undefined && this.system.appBusinessAnalysts.length > 0) {
            this.system.appBusinessAnalysts.push(this.applicationTechManager);
          }
          else {
            this.system.appBusinessAnalysts = [];
            this.system.appBusinessAnalysts.push(this.applicationTechManager);
          }
          this.business.splice(i, 1);
          this.showTableBusiness = true;
        }
      }

    }
  }

  deleteBusiness(value: any) {
    for (let i = 0; i < this.system.appBusinessAnalysts.length; i++) {
      if (this.system.appBusinessAnalysts[i].userId === value) {
        if (this.system.appBusinessAnalysts[i].active) {
          this.system.appBusinessAnalysts[i].active = false;
          this.system.appBusinessAnalysts[i].newEntry = false;
          this.business.push(this.system.appBusinessAnalysts[i]);
          if (this.system.appBusinessAnalysts[i].applicationUserId === 0)
            this.system.appBusinessAnalysts.splice(i, 1);
        }
      }
    }
  }

  getSystemAdmin(value: any) {
    if (value === "Choose...") {

    }
    else {
      for (let i = 0; i < this.system1.length; i++) {
        if (this.system1[i].userId === +value) {
          this.applicationTechManager = new ApplicationUserDTO();
          this.applicationTechManager.userId = this.system1[i].userId;
          this.applicationTechManager.firstName = this.system1[i].firstName;
          this.applicationTechManager.lastName = this.system1[i].lastName;
          this.applicationTechManager.applicationUserId = this.system1[i].applicationUserId;
          this.applicationTechManager.active = true;
          this.applicationTechManager.newEntry = true;
          if (this.system.appSystemAdminsters != undefined && this.system.appSystemAdminsters.length > 0) {
            this.system.appSystemAdminsters.push(this.applicationTechManager);
          }
          else {
            this.system.appSystemAdminsters = [];
            this.system.appSystemAdminsters.push(this.applicationTechManager);
          }
          this.system1.splice(i, 1);
          this.showTableSysAdmin = true;
        }
      }
    }
  }

  deleteSystemAdmin(value: any) {
    for (let i = 0; i < this.system.appSystemAdminsters.length; i++) {
      if (this.system.appSystemAdminsters[i].userId === value) {
        if (this.system.appSystemAdminsters[i].active) {
          this.system.appSystemAdminsters[i].active = false;
          this.system.appSystemAdminsters[i].newEntry = false;
          this.system1.push(this.system.appSystemAdminsters[i]);
          if (this.system.appSystemAdminsters[i].applicationUserId === 0)
            this.system.appSystemAdminsters.splice(i, 1);
        }
      }
    }
  }

  getTechManager(value: any) {
    if (value === "Choose...") {

    }
    else {
      for (let i = 0; i < this.manager.length; i++) {
        if (this.manager[i].userId === +value) {
          this.applicationTechManager = new ApplicationUserDTO();
          this.applicationTechManager.userId = this.manager[i].userId;
          this.applicationTechManager.firstName = this.manager[i].firstName;
          this.applicationTechManager.lastName = this.manager[i].lastName;
          this.applicationTechManager.applicationUserId = this.manager[i].applicationUserId;
          this.applicationTechManager.active = true;
          this.applicationTechManager.newEntry = true;
          if (this.system.appTechnicalManagers != undefined && this.system.appTechnicalManagers.length > 0) {
            this.system.appTechnicalManagers.push(this.applicationTechManager);
          }
          else {
            this.system.appTechnicalManagers = [];
            this.system.appTechnicalManagers.push(this.applicationTechManager);
          }
          this.manager.splice(i, 1);
          this.showTableManager = true;
        }
      }
    }
  }

  deleteTechManager(value: any) {
    for (let i = 0; i < this.system.appTechnicalManagers.length; i++) {
      if (this.system.appTechnicalManagers[i].userId === value) {
        if (this.system.appTechnicalManagers[i].active) {
          this.system.appTechnicalManagers[i].active = false;
          this.system.appTechnicalManagers[i].newEntry = false;
          this.manager.push(this.system.appTechnicalManagers[i]);
          if (this.system.appTechnicalManagers[i].applicationUserId === 0)
            this.system.appTechnicalManagers.splice(i, 1);
        }
      }
    }
  }

  getServers(value: any) {
    if (value === "Choose...") {

    }
    else {
      for (let i = 0; i < this.app.length; i++) {
        if (this.app[i].databaseId === +value) {
          this.applicationServer = new ApplicationDatabaseDTO();
          this.applicationServer.databaseId = this.app[i].databaseId;
          this.applicationServer.hostName = this.app[i].hostName;
          this.applicationServer.active = true;
          this.applicationServer.newEntry = true;
          if (this.system.applicationServerDTOs != undefined && this.system.applicationServerDTOs.length > 0) {
            this.system.applicationServerDTOs.push(this.applicationServer);
          }
          else {
            this.system.applicationServerDTOs = [];
            this.system.applicationServerDTOs.push(this.applicationServer);
          }
          this.app.splice(i, 1);
          this.showTableServer = true;
        }
      }
    }
  }

  deleteServer(value: any) {
    for (let i = 0; i < this.system.applicationServerDTOs.length; i++) {
      if (this.system.applicationServerDTOs[i].databaseId === value) {
        if (this.system.applicationServerDTOs[i].active) {
          this.system.applicationServerDTOs[i].active = false;
          this.system.applicationServerDTOs[i].newEntry = false;
          this.app.push(this.system.applicationServerDTOs[i]);
        }
      }
    }
  }

  getDatabase(value: any) {
    if (value === "Choose...") {

    }
    else {
      for (let i = 0; i < this.base.length; i++) {
        if (this.base[i].databaseId === +value) {
          this.applicationDatabase = new ApplicationDatabaseDTO();
          this.applicationDatabase.databaseId = this.base[i].databaseId;
          this.applicationDatabase.hostName = this.base[i].hostName;
          this.applicationDatabase.active = true;
          this.applicationDatabase.newEntry = true;
          if (this.system.applicationDatabaseDTOs != undefined && this.system.applicationDatabaseDTOs.length > 0) {
            this.system.applicationDatabaseDTOs.push(this.applicationDatabase);
          }
          else {
            this.system.applicationDatabaseDTOs = [];
            this.system.applicationDatabaseDTOs.push(this.applicationDatabase);
          }
          this.base.splice(i, 1);
          this.showTableBase = true;
        }
      }
    }
  }

  deleteBase(value: any) {
    for (let i = 0; i < this.system.applicationDatabaseDTOs.length; i++) {
      if (this.system.applicationDatabaseDTOs[i].databaseId === value) {
        if (this.system.applicationDatabaseDTOs[i].active) {
          this.system.applicationDatabaseDTOs[i].active = false;
          this.system.applicationDatabaseDTOs[i].newEntry = false;
          this.base.push(this.system.applicationDatabaseDTOs[i]);
        }
      }
    }
  }




  setTrue(value: any) {

    if (value === "Choose...") {

    }
    else {
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
          this.showTableTech = true;
        }
      }
    }
  }




  hideMinus(value: any) {

    for (let i = 0; i < this.system.technologiesDTOs.length; i++) {
      if (this.system.technologiesDTOs[i].technologyId === +value) {
        if (this.system.technologiesDTOs[i].active) {
          this.system.technologiesDTOs[i].active = false;
          this.system.technologiesDTOs[i].newEntry = false;
          this.tech.push(this.system.technologiesDTOs[i]);
        }
        //this.system.technologiesDTOs.splice(i, 1);
      }
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

        if (data.applicationViewDTO.testers != undefined && data.applicationViewDTO.testers.length > 0) {
          this.system.testers = data.applicationViewDTO.testers;
          this.showTableTest = true;
        }
        else {
          this.system.testers = [];
        }


        if (data.applicationViewDTO.appDataCustodians != undefined && data.applicationViewDTO.appDataCustodians.length > 0) {
          this.system.appDataCustodians = data.applicationViewDTO.appDataCustodians;
          this.showTableData = true;
        }
        else {
          this.system.appDataCustodians = [];
        }

        if (data.applicationViewDTO.developers != undefined && data.applicationViewDTO.developers.length > 0) {
          this.system.developers = data.applicationViewDTO.developers;
          this.showTableDeveloper = true;
        }
        else {
          this.system.developers = [];
        }


        if (data.applicationViewDTO.appDBAdmins != undefined && data.applicationViewDTO.appDBAdmins.length > 0) {
          this.system.appDBAdmins = data.applicationViewDTO.appDBAdmins;
          this.showTableDBAdmin = true;
        }
        else {
          this.system.appDBAdmins = [];
        }

        if (data.applicationViewDTO.appBusinessAnalysts != undefined && data.applicationViewDTO.appBusinessAnalysts.length > 0) {
          this.system.appBusinessAnalysts = data.applicationViewDTO.appBusinessAnalysts;
          this.showTableBusiness = true;
        }
        else {
          this.system.appBusinessAnalysts = [];
        }

        if (data.applicationViewDTO.appSystemAdminsters != undefined && data.applicationViewDTO.appSystemAdminsters.length > 0) {
          this.system.appSystemAdminsters = data.applicationViewDTO.appSystemAdminsters;
          this.showTableSysAdmin = true;
        }
        else {
          this.system.appSystemAdminsters = [];
        }

        if (data.applicationViewDTO.appTechnicalManagers != undefined && data.applicationViewDTO.appTechnicalManagers.length > 0) {
          this.system.appTechnicalManagers = data.applicationViewDTO.appTechnicalManagers;
          this.showTableManager = true;
        }
        else {
          this.system.appTechnicalManagers = [];
        }

        if (data.applicationViewDTO.applicationServerDTOs != undefined && data.applicationViewDTO.applicationServerDTOs.length > 0) {
          this.system.applicationServerDTOs = data.applicationViewDTO.applicationServerDTOs;
          this.showTableServer = true;
        }
        else {
          this.system.applicationServerDTOs = [];
        }

        if (data.applicationViewDTO.technologies != undefined && data.applicationViewDTO.technologies.length > 0) {
          this.system.technologiesDTOs = data.applicationViewDTO.technologies;
          this.showTableTech = true;
        }
        else {
          this.system.technologiesDTOs = [];
        }

        if (data.applicationViewDTO.applicationDatabaseDTOs != undefined && data.applicationViewDTO.applicationDatabaseDTOs.length > 0) {
          this.system.applicationDatabaseDTOs = data.applicationViewDTO.applicationDatabaseDTOs;
          this.showTableBase = true;
        }
        else {
          this.system.applicationDatabaseDTOs = [];
        }
        if (this.system.physicalLocation != undefined) {
          let des = this.system.physicalLocation.replace(/<[^>]+>/gm, '');
          this.len = des.length;
        }
        if (this.system.technologyStatus != undefined) {
          let des = this.system.technologyStatus.replace(/<[^>]+>/gm, '');
          this.len3 = des.length;
        }
        if (this.system.internalInterfaces != undefined) {
          let des = this.system.internalInterfaces.replace(/<[^>]+>/gm, '');
          this.len1 = des.length;
        }
        if (this.system.externalInterfaces != undefined) {
          let des = this.system.externalInterfaces.replace(/<[^>]+>/gm, '');
          this.len2 = des.length;
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
      //this.business = data[0];
      //this.datac = data[1];
      //this.tester = data[2];
      //this.admin = data[3];
      //this.system1 = data[4];
      //this.manager = data[5];
      //this.developer = data[6];
      //this.app = data[7];

      //this.base = data[9];

      this.tester= [];
      if (this.system.testers != undefined && this.system.testers.length > 0) {
        let tester = data[2];
        for (let i = 0; i < this.system.testers.length; i++) {
          for (let j = 0; j < tester.length; j++) {
            if (this.system.testers[i].userId === tester[j].userId) {
              tester.splice(j, 1);
            }

          }
        }
        this.tester = tester;
      }
      else {
        this.tester = data[2];
      }


      this.datac = [];
      if (this.system.appDataCustodians != undefined && this.system.appDataCustodians.length > 0) {
        let datac = data[1];
        for (let i = 0; i < this.system.appDataCustodians.length; i++) {
          for (let j = 0; j < datac.length; j++) {
            if (this.system.appDataCustodians[i].userId === datac[j].userId) {
              datac.splice(j, 1);
            }

          }
        }
        this.datac = datac;
      }
      else {
        this.datac = data[1];
      }


      this.developer = [];
      if (this.system.developers != undefined && this.system.developers.length > 0) {
        let developer = data[6];
        for (let i = 0; i < this.system.developers.length; i++) {
          for (let j = 0; j < developer.length; j++) {
            if (this.system.developers[i].userId === developer[j].userId) {
              developer.splice(j, 1);
            }

          }
        }
        this.developer = developer;
      }
      else {
        this.developer = data[6];
      }



      this.admin = [];
      if (this.system.appDBAdmins != undefined && this.system.appDBAdmins.length > 0) {
        let admin = data[3];
        for (let i = 0; i < this.system.appDBAdmins.length; i++) {
          for (let j = 0; j < admin.length; j++) {
            if (this.system.appDBAdmins[i].userId === admin[j].userId) {
              admin.splice(j, 1);
            }

          }
        }
        this.admin = admin;
      }
      else {
        this.admin = data[3];
      }


      this.business = [];
      if (this.system.appBusinessAnalysts != undefined && this.system.appBusinessAnalysts.length > 0) {
        let business = data[0];
        for (let i = 0; i < this.system.appBusinessAnalysts.length; i++) {
          for (let j = 0; j < business.length; j++) {
            if (this.system.appBusinessAnalysts[i].userId === business[j].userId) {
              business.splice(j, 1);
            }

          }
        }
        this.business = business;
      }
      else {
        this.business = data[0];
      }


      this.system1 = [];
      if (this.system.appSystemAdminsters != undefined && this.system.appSystemAdminsters.length > 0) {
        let system1 = data[4];
        for (let i = 0; i < this.system.appSystemAdminsters.length; i++) {
          for (let j = 0; j < system1.length; j++) {
            if (this.system.appSystemAdminsters[i].userId === system1[j].userId) {
              system1.splice(j, 1);
            }

          }
        }
        this.system1 = system1;
      }
      else {
        this.system1 = data[4];
      }



      this.manager = [];
      if (this.system.appTechnicalManagers != undefined && this.system.appTechnicalManagers.length > 0) {
        let manager = data[5];
        for (let i = 0; i < this.system.appTechnicalManagers.length; i++) {
          for (let j = 0; j < manager.length; j++) {
            if (this.system.appTechnicalManagers[i].userId === manager[j].userId) {
              manager.splice(j, 1);
            }

          }
        }
        this.manager = manager;
      }
      else {
        this.manager = data[5];
      }


      this.app = [];
      if (this.system.applicationServerDTOs != undefined && this.system.applicationServerDTOs.length > 0) {
        let app = data[7];
        for (let i = 0; i < this.system.applicationServerDTOs.length; i++) {
          for (let j = 0; j < app.length; j++) {
            if (this.system.applicationServerDTOs[i].databaseId === app[j].databaseId) {
              app.splice(j, 1);
            }

          }
        }
        this.app = app;
      }
      else {
        this.app = data[7];
      }




      this.tech = [];
      if (this.system.technologiesDTOs != undefined && this.system.technologiesDTOs.length > 0) {
        let tech = data[8];
        for (let i = 0; i < this.system.technologiesDTOs.length; i++) {
          for (let j = 0; j < tech.length; j++) {
            if (this.system.technologiesDTOs[i].technologyId === tech[j].technologyId) {
              tech.splice(j, 1);
            }

          }
        }
        this.tech = tech;
      }
      else {
        this.tech = data[8];
      }

      this.base = [];
      if (this.system.applicationDatabaseDTOs != undefined && this.system.applicationDatabaseDTOs.length > 0) {
        let base = data[9];
        for (let i = 0; i < this.system.applicationDatabaseDTOs.length; i++) {
          for (let j = 0; j < base.length; j++) {
            if (this.system.applicationDatabaseDTOs[i].databaseId === base[j].databaseId) {
              base.splice(j, 1);
            }

          }
        }
        this.base = base;
      }
      else {
        this.base = data[9];
      }
    }, error => {
      this.loading = false;
      console.log(error);
    });
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


  editClick() {
    this.showEdit = false;
  }
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
      this.title = "Create Technical Manager";
      this.applicationUserDTO.role = "TECHPROJECT MANAGER";
    }
    else if (value === 'dbAdministrator') {
      this.title = "Create DBAdministrator Manager";
      this.applicationUserDTO.role = "DB ADMINISTRATOR";
    }
    else if (value === 'developer') {
      this.title = "Create Developer";
      this.applicationUserDTO.role = "DEVELOPER";
    }
    else if (value === 'tester') {
      this.title = "Create Tester";
      this.applicationUserDTO.role = "TESTER";
    }
    else if (value === 'systemadmin') {
      this.title = "Create System Administrator";
      this.applicationUserDTO.role = "SYSTEM ADMINISTRATOR";
    }
    else if (value === 'businessanalyst') {
      this.title = "Create Business Analyst";
      this.applicationUserDTO.role = "BUSINESS ANALYST";
    }
    else if (value === 'datacustodian') {
      this.title = "Create Data Custodian";
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
