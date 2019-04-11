interface solution {
    name: string;
    versionNumber: string;
    systemType: string;
    solutionTypeName: string;
    vendor: string;
    hostingType: string;
    labVendor: string;
    fisrtName: string;
    lastName: string;
    emailId: string;
    phoneNumber: number;
}

export class appSolutionReport {
    appSolutionId: any;
    activeFlag: any;
    createdBy: any;
    createdTs: any;
    updatedBy: any;
    updatedTs: any;
    appSolutionDevices: any;
    applicationID: any;
    solutionId: any;
    notes: any;
    hostingType: any;
    solutionsDTO: any;
    hostingTypeId: any;
    applicationName: any;
    noOfUnits: any;
    systemType: any;
    precinctType: any;
    solutionName: any;
    vendorName: any;
    versionNumber: any;
    archived: any;
    vendorFirstName: any;
    vendorLastName: any;
    solutionVersionName: any;
    vendorId: any;
}

export class RMFDetailDTO {
    rmfDtlId: any;
    taskId: any;
    shortDescription: any;
    outcomes: any;
    potentialInputs: any;
    discussion: any;
    expectedOutputs: any;
    createdBy: any;
    createdTs: any;
    updatedBy: any;
    updatedTs: any;
    assignedTo: any;
    assignedOn: any;
    standards: any;
    procedures: any;
    guidelines: any;
    references: any;
    rmfPrimaryResponsibilityDTOs: any;
    rmfSupportingRolesDTOs: any;
}
export class RMFPrimaryResponsibilityDTO {

    rmfPrimaryResponsibilityId: any;
    rmfRoleId: any;
    name: any;
    activeStatus: any;
}
export class RMFSupportingRolesDTO {
    rmfSupportingRolesId: any;
    rmfRoleId: any;
    name: any;
    activeStatus: any;
}