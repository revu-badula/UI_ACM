/**
 * New typescript file
 */

import { IMyDate } from 'mydatepicker';

export class Solution {
  solutionId: number;
  certDt: any;
  certStadard: string;
  certRenewalDueDt:any;
  name: string;
  versionNumber: string;
  patches: string;
  notes: string; 
  solutionType: number;
  vendorId: number;
  createdBy: string;
  createdTs;
  updatedBy: string;
  updatedTs: string
  vendor :Vendor;
  solutionTypeName: string;
  labVendorId: number;
  labVendorsDTO : LabVendors;
  systemTypeDTO: SystemType;
  precinctTypeId:number;
  precinctTypeName:string;
  hostingTypeDTO: HostingType;
  hostingTypeNotes:string;
  certDocDTOs: Array<CertDocDTO> = [];
}

export class SystemType {
  name: string;
  systemTypeId: any;
}
export class HostingType {
  name: string;
  hostingTypeId: any;
}

export class LabVendors {
  labVendorId: number;
  name: string;
  firstName: string;
  lastName: string;
  suffix: string;
  emailId: string;
  streetName: string;
  city: string;
  state: string;
  zipcode: string;
  phoneNumber: string;
}

export class Vendor {
  vendorId: number;
  name: string;
  createdBy: string;
  vendorAddress: Address;
  vendorContact: VendorContact;
}

export class Address {
  addressId: number;
  streetName: string;
  city: string;
  state: string;
  zipcode: string;
}

export class VendorContact {
  contactId: number;
  firstName: string;
  lastName: string;
  middleName: string;
  suffix: string;
  emailId: string;
  phoneNumber: string;
}

export class CertDocDTO {
   certDocId: number;
  fileName: string;
   fileLocation: string;
  section:string;
}