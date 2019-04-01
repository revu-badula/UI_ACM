export class System {
  updatedTime: any;
  acronym: string;
  name: any;
  attachments: AttachmentDTO[] = [];
  createdBy: any;
  internalInterfaces: string;
  externalInterfaces: string;
  physicalLocation: string;
  updatedBy: any;
  businessOwnerNameDoe: string;
  systemOwnerNameDoe: string;
  systemSensitivity: number;
  applicationId: number;
  programmingLanguages: any;
  developer: any;
  tester: any;
  systemAdministrator: any;
  dataCustodian: any;
  businessAnalyst: any;
  technicalProjectManager: any;
  systemSensitivityName: string;
  technologiesDTOs: any;
  // databaseDTOs:DatabaseDTO[] = []; 
  applicationDatabaseDTOs: ApplicationDatabaseDTO[] = [];
  developers: ApplicationUserDTO[] = [];
  testers: ApplicationUserDTO[] = [];
  appDBAdmins: ApplicationUserDTO[] = [];
  appBusinessAnalysts: ApplicationUserDTO[] = [];
  appDataCustodians: ApplicationUserDTO[] = [];
  appSystemAdminsters: ApplicationUserDTO[] = [];
  appTechnicalManagers: ApplicationUserDTO[] = [];
  applicationServerDTOs: any;
  businessOwner: any;
  dataOwner: any;
  iso: any;
  projectManager: any;
  systemOwner: any;
  levelOfEffort: any;
  costType: any;
  description: any;
  estimatedCost: any


}

export class AttachmentDTO {
  fileType: string;
  fileName: string;
  content: string;
}
export class WorkHours {
  workHoursId: number = 0;
  day: string = "";
  openTm: any = "";
  closeTm: any = "";
  createdBy: string = "";
  createdTs: any = "";
  updatedBy: string = "";
  updatedTs: any = "";
}

export class applicationView {

  acronym: string;
  applicationId: number;
  name: string;
  updatedTs: any;
}
export class CertDocDTO {
  certDocId: number;
  fileName: string;
  fileLocation: string;
  section: string;
}

export class ApplicationUserDTO {
  firstName: any;
  lastName: any;
  title: any;
  userId: any;
  role: any;
  emailId: any;
  newEntry: any;
  active: any;
  applicationUserId: any;
}

export class TechnologiesDTO {
  technologyId: number;
  name: string;
  technologyVersion: string;
  newEntry: any;
  active: any;

}


export class ServerContactDTO {
  serverContactId: number;
  firstName: string;
  lastName: string;
  emailId: string;
  phoneNumber: string;
  isPrimary: any;
  divisionName: string;
  cost: string;
  createdBy: string;
  createdTs: any;
  updatedBy: string;
  updatedTs: any;
}


export class ApplicationDatabaseDTO {
  applicationDatabaseId: number;
  databaseName: string;
  administratorName: string;
  custodian: string;
  newEntry: any;
  databaseId: number;
  hostName: string;

}

export class ApplicationServerDTO {
  applicationServerId:any;
  name:any;
  assetTag:any;
  systemType:any;
  equipmentType:any;
  addressLine1:any;
  addressLine2:any;
  city:any;
  zipCode:any;
  newEntry:any;
  active:any;
  serverId:any;
}
