
export class PolicyGrp {
	policyGrpId: number;
	policyGrpName: string;
	description: string;
	createdBy: string;
	createdTs: any;
	auditTypeId: number;
	reviewDate: any;
	status: string;
	auditTypeName: string;
	definitiveSource: string;
	owner: string;
	policyReviewTerm: string;
	policyReviewTermId: number;
	policyReviewDate: any;
	lastReviewDate: any;
	updatedBy: string;
	updatedTs: any;
	resourceLinks: string;
	policyDTOs: Policy;
}


export class Policy {
	parentPolicyId: any;
	policyId: number;
	controlNumber: string;
	policyName: string;
	description: string;
	policyVal: string;
	createdBy: string;
	createdTs: any;
	updatedBy: string;
	updatedTs: any;
	priority: string;
	procedures: string;
	guidelines: string;
	familyName: string;
	classType: string;
	assignedTo: string;
	assignedBy: string;
	startDate: any;
	endDate: any;
	reviewDate: any;
	status: boolean;
	linked: boolean;
	subpolicies: any = [];
	evidenceRequired :any;
	linkType: string;
	weightage:any;
	
	isDesignDocument: string;
	configBaseline: string;
	auditRecords: string;
	artifacts: string;
	nonCov: string;
	securityPlan: string;
	isConfigSettings: string;

	policyGrpId: number;
	comments: string;
	linkedPolicies: any = [];
	linkedPoliciesString: string;
	policyDocumentsDTOs: Array<PolicyDocumentsDTO> = [];

}

export class PolicyDocumentsDTO {

	policyDocId: number;
	documentName: string;
	documentPath: string;
	activeFlag: boolean;
	createdBy: string;
	createdTs: any;
	updatedBy: string;
	updatedTs: any;
	policyGrpId: any;
	fileContent: any;
}

export class PolicyReviewTerm {
	policyReviewTermId: number;
	policyReviewTerm: string;
}

export class subControl {

	subPolicyId: number;
	subControlNumber: any;
	subPolicyName: any;
	assignedTo: any;
	endDate: any;
	subprocedure: any;
	guidelines: any;
	substatus: any;

}

export class policyRevieDTO {
	policyReview: any;
	policyGrpId: any;
	policyGrpName: any;
	assignedTo: any;
	comments: any;
	createdBy: any;
	createdTs: any;
	updatedBy:any;
	updatedTs:any;
	status:any;
	dueDate:any;
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