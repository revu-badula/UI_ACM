export class Device {

  databaseId: number;
  hostName: string;
  platform: string;
  dbVersion: string;
  hardware: string;
  updateLevel: string;
  addressLength: string;
  clockFrequency: string;
  memorySize: string;
  localDiskSpace: string;
  cpuCount: number;
  physicalCpuCount: number;
  purpose: any;
  operatingSystem: any;
  controlName: any;
  logicalCpuCount: number;
  ipAddress: string;
  dbServer: string;
  createdTs: any;
  updatedTs: any;
  serverName: string;
  archiveLogMode: string;
  sizeGb: string;
  osVersion: string;
  createdBy: string;
  updatedBy: string;
  systemTag: string;
  newEntry: boolean;
  active: boolean;
  licenseStartDt: any;
  licenseEndDt: any;
  licenseRenewDt: any;
  vendorName: string;
  productName: string;
  serverContactDTOs: any = [];
  serverTypeId: any;
  serverTypeName: any;
  serverEnvName: any;
  serverEnvId: any;
}

export class Server {
  serverContactId: number;
  firstName: string;
  lastName: string;
  emailId: string;
  phoneNumber: string;
  isPrimary: boolean;
  divisionName: string;
  cost: string;
  createdBy: string;
  createdTs: any;
  updatedBy: string;
  updatedTs: any;
}