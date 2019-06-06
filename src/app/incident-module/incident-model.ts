import { Device } from '../data_modelDeviceInventory';
import { System } from '../data_model_system';
export class IncidentManagementDTO {

    incidentId: number;
    applicationDTOs: any;
    databaseDTOs: any;
    incidentProgressId: any;
    incidentProgressDTO: IncidentProgressDTO;
    shortDescription: any;
    longDescription: any;
    serverity: any;
    status: any;
    reportedBy: any;
    userId:number;
    technicalImpact: any;
    businessImpact: any;
    businessResolutionDescription: any;
    itResolutionDescription: any;
    businessSecurityRisk: any;
    itSecurityRisk: any;
    createdBy:any;
    updatedBy:any;
    typeOfIncident:any;
}
export class IncidentProgressDTO {

    incidentProgressId: number;
    name: any;
    incidentManagementDTOs: any
}