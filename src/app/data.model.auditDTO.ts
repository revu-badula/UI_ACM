export class AppAudit {
  public appAuditId: number;
  public auditName: string;
  public auditBy: string;
  public auditDate: any;
  public auditType: string;
  public auditDetails: string;
  public auditFindings: string;
  public recomendations: string;
  public actionPlan: string;
  public budget: any;
  public status: string;
  public nextAuditDate: any;
  public createdBy: string;
  public createdTs: any;
  public updBy: string;
  public upaTs: any;
  public managementReponse: string;
  public businessRisks: string;
  public securityRisks: string;
  public auditTypeName: string;
  public appAuditFileDTOs: any[] = [];
  public policyGrpId: number;
  public applicationID: number;
  public appAcronym: string;
  public typeOfFindings: string;
  public overallRiskLevel: string;
  public findingComments: string;
  public responsibleParty: string;
  public recomendedBy: string;
  public estimatedCompletionDt: any;
  public responseBy: string;
  public responseDt: any;
  public actionPlanStartDt: any;
  public actionPlanEndDt: any;
  public actionPlanAssignedTo: string;
  public actionPlanSummary: string;
  public actionPlanTasks: string;
  public actionPlanCloseoutComments: string;
  public budgetDescriptionHTML: string;
  public publicpolicyGrpId: number;
  public auditPolicyDTOs: any[] = [];
  public policyName: string;
  public lessonsEnteredBy: string;
  public lessonsEnteredDate: any;
  public lessonsLearnedDescription: string;
  public updatedBy: string;
  public overallScore: number;
  public evidenceNotSubmittedCount: number;
  public auditFindingsCount: number;
  public openCount: number;
  public closeCount: number;
  public scoreAbove89Count: number;
  public scoreAbove74Count: number;
  public scoreAbove50Count: number;

  public auditsAbove89: any[] = [];
  public auditsAbove74: any[] = [];
  public auditsAbove50: any[] = [];
  public closedAuditPolicies: any[]=[];
  public openAuditPolicies: any[] = [];
  public evnAuditPolicies: any[] = [];


}

export class Policy {

  policyId: number;
  controlNumber: string;
  policyName: string;
  description: string;
  policyVal: string;
  status: string;
  defaultVal: string;
  policyGrpId: number;
  appAuditPolicyId: number;
  priority: string;
  procedures: string;
  guidelines: string;
  familyName: string;
  classType: string;
}

export class AppAuditFileDTO {

  appAuditFileId: number;
  fileName: string;
  fileContent: any;
  status: boolean;
  createdBy: string;
  createdTs: any;
}
export class familyPOlicyDTO {
  assignedDt: any;
  startDate: any;
  endDate: any;
  priority: any;
  weightage: any;
  score: any;
  evidenceRequired:any
  createdBy: any;
  createdTs: any;
  updatedBy: any;
  updatedTs: any;
  policyFamilyID: any;
  familyName: any;
  assignedTo: any;
  appAuditId: any;
}