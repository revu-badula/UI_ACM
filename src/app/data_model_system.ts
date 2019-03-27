export class System {
  updatedTime: any;
  acronym: string;
  name: any;
  createdBy: any;
  updatedBy: any;
  businessOwnerNameDoe: string;
  systemOwnerNameDoe: string;
  systemSensitivity: number;
  applicationId: number;
  systemSensitivityName: string;
  businessOwner: any;
  dataOwner: any;
  iso: any;
  projectManager: any;
  systemOwner: any;
  levelOfEffort:any;
  costType:any;
  description:any;
  estimatedCost:any


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