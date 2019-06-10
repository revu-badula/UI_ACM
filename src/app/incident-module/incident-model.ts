export class IncidentManagementDTO {

    incidentId: number;
    applicationDTOs: any;
    databaseDTOs: any;
    incidentProgressId: any;
    incidentProgressDTO: IncidentProgressDTO;
    shortDescription: any;
    longDescription: any;
    severity: any;
    status: any;
    reportedBy: any;
    userId: number;
    technicalImpact: any;
    businessImpact: any;
    businessResolutionDescription: any;
    itResolutionDescription: any;
    businessSecurityRisk: any;
    itSecurityRisk: any;
    createdBy: any;
    updatedBy: any;
    typeOfIncident: any;
}
export class IncidentProgressDTO {

    incidentProgressId: number;
    name: any;
    incidentManagementDTOs: any
}
export class IMBusinessRiskDTO {
    id: any;
    submittedBy: any;
    submittedOn: any;
    summary: any;
    incidentManagementId: any;
}
export class IMResolutionDTO {
    id:any;
    submittedBy:any;
    submittedOn:any;
    summary:any;
    comment:any;
    incidentManagementId:any;
}