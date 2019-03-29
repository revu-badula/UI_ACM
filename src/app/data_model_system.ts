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
  technologiesDTOs: TechnologiesDTO[] = [];
  // databaseDTOs:DatabaseDTO[] = []; 
  applicationDatabaseDTOs: ApplicationDatabaseDTO[] = [];
  developers: ApplicationUserDTO[] = [];
  testers: ApplicationUserDTO[] = [];
  appDBAdmins: ApplicationUserDTO[] = [];
  appBusinessAnalysts: ApplicationUserDTO[] = [];
  appDataCustodians: ApplicationUserDTO[] = [];
  appSystemAdminsters: ApplicationUserDTO[] = [];
  appTechnicalManagers: ApplicationUserDTO[] = [];
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

// export class DatabaseDTO{
//   databaseId: number;
//         hostName: string;
//         platform: string;
//         dbVersion: string;
//         hardware: string;
//         updateLevel: string;
//         addressLength: string;
//         clockFrequency: string;
//         memorySize: string;
//         localDiskSpace: string;
//         cpuCount: number;
//         physicalCpuCount: number;
//         logicalCpuCount: number;
//         ipAddress: string;
//         dbServer: string;
//         serverName: string;
//         archiveLogMode: string;
//         sizeGb: string;
//         purpose: string;
//         osVersion: string;
//         createdBy: string;
//         createdTs: any;
//         updatedBy: string;
//         updatedTs: any;
//         systemTag: string;
//         newEntry: any;
//         active: any;
//         licenseStartDt: any;
//         licenseEndDt:any;
//         licenseRenewDt: any;
//         vendorName: string;
//         productName: string;
//         serverContactDTOs:ServerContactDTO;
//         operatingSystem: string;
//         controlName: string;
//         serverTypeId: number;
//         serverTypeName: string;
// }

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
  //	private UserTbl userTbl;
  hostName: string;

}
