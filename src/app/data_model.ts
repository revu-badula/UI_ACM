export class Solution {
  solutionId: number;
  certDt: any;
  certStadard: string;
  certRenewalDueDt: any;
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
  vendor: Vendor;
  solutionTypeName: string;
  labVendorId: number;
  labVendorsDTO: LabVendors;
  systemTypeDTO: SystemType;
  precinctTypeId: number;
  precinctTypeName: string;
  hostingTypeDTO: HostingType;
  hostingTypeNotes: string;
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
  section: string;
  activeFlag: any;
}
export class infrastructureDashboardDTO {
  appServers: number;
  dBServers: number;
  otherServers: number;
  expired: number;
  notExpired: number;
  highIncident: number;
  mediumIncident: number;
  lowIncident: number;
  vendorNumbers: any;
  typesOfIncident: any;


}

export class inciDashboardDTO {
  criticalHighInci: number;
  criticalMediumInci: number;
  criticalLowInci: number;
  openIncident: number;
  closedIncident: number;
  highIncident: number;
  mediumIncident: number;
  lowIncident: number;
  businessesImpacted: number;
  systemsImpacted: number;
  typesOfIncident: any;
}

export class systemDashboardDTO {
  systemToAudit: any;
  sysName: any;
  auditHigh: any;
  auditMed: any;
  auditLow: any;
  assessHigh: any;
  assessMed: any;
  assessLow: any;
  incidentHigh: any;
  incidentMed: any;
  incidentLow: any;
  infraHigh: any;
  infraMed: any;
  infraLow: any;
}