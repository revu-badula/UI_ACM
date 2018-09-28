export class Device{
  
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
 
  
  logicalCpuCount: number;
  ipAddress: string;
  dbServer: string;
  createdTs:any;
  updatedTs:any;
  serverName: string;
  archiveLogMode: string;
  sizeGb: string;
  //private byte[] purpose;
  osVersion: string;
  createdBy: string;
  //private Date createdTs;
  updatedBy: string;
  //private Date updatedTs;
  systemTag: string;
  newEntry: boolean;
  active: boolean;
  licenseStartDt: any;
  licenseEndDt: any;
  licenseRenewDt: any;
  vendorName: string;
  productName: string;
  serverContactDTOs: any = [];
}

export class Server{
serverContactId:number;
	//serverEntity:ServerEntity;
	firstName:string;
	lastName:string;
	emailId:string;
	phoneNumber:string;
	isPrimary:string;
	divisionName:string;
	cost:string;
	createdBy:string;
	createdTs:any;
	updatedBy:string;
	updatedTs:any;
}