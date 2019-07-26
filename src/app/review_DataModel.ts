export class Review {
  policyReview: number;
  policyGrpId: number;
  policyGrpName: string;
  assignedTo: string;
  comments: string;
  createdBy: string;
  createdTs: any;
  updatedBy: string;
  updatedTs: any;
  status: string;
  dueDate: any;
}

export class RMFApplicationDTO {
  rmfAppId: any;
  name: any;
  reviewDate: any;
  nextReviewDate: any;
  status: any;
  createdBy: any;
  createdTs: any;
  updatedBy: any;
  updTs: any;
  typeOfFindings: any;
  overallRiskLevel: any;
  findingComments: any;
  responsibleParty: any;
  recomendedBy: any;
  estimatedCompletionDt: any;
  responseBy: any;
  responseDt: any;
  actionPlanStartDt: any;
  actionPlanEndDt: any;
  actionPlanAssignedTo: any;
  actionPlanSummary: any;
  actionPlanTasks: any;
  actionPlanCloseoutComments: any;
  policyGrpId: any;
  budgetDescriptionhtml: any;
  lessonsLearnedDescription: any;
  lessonsEnteredBy: any;
  lessonsEntered: any;
  nonCov: any;
  artifacts: any;
  overallScore: any;
  riskLevel: any;
  rmfGrpId: any;
  applicationId: any;
  rmfTypeName: any;
  summary: any;
  businessRisks: any;
  securityRisks: any;
  budget: any;
  appAuditFileDTOs: any;
  lessonsEnteredDate: any;
}

export  class InfraStructureDTO {
  renewalExpiredCount: any;
  renewalCount: any;
  highIncidentsCount: any;
  medIncidentsCount: any;
  lowIncidentsCount: any;
  highComplianceCheck: any;
  lowComplianceCheck: any;
  highTestResultsCount: any;
  medTestResultsCount: any;
  lowTestResultsCount: any;
  servers: any;
}