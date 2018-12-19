
export class AssessmentPolicyDTO {

    assessmentPolicyId: any
    defaultVal: string
    status: string
    createdBy: any;
    createdTs: any;
    updatedBy: any;
    updatedTs: any;
    policyId: number;
    policyDTO: Policy;
    description: string;
    priority: string;
    procedures: string;
    guidelines: string;
    assignedTo: string;
    assignedBy: string;
	startDate: any;
	controlNumber:string;
	 controlName:string;
    endDate: any;
    artifacts: string;
    nonCov: string;
    securityPlan: string;
	appParentPolicyId:any
	//private AppAuditPolicyDTO appAuditParentPolicyDTO;
	assessmentPolicies:any=[];
	policyDocumentsDTOs:any;



}

export class Policy {
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
	subPolicyDTOs: any = [];
	linkType: string;
	isDesignDocument: string;
	configBaseline: string;
	auditRecords: string;
	artifacts: string;
	nonCov: string;
	securityPlan: string;
	isConfigSettings: string;

	policyGrpId: number;
	comments: string;

	//linkedPolicies:any[] = [];
	linkedPolicies: any = [];
	//linkedPolicies: Array<PolicyDTO> = [];

	linkedPoliciesString: string;

	//policyDocumentsDTOs: any;
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


