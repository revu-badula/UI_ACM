export class Mou {

	mouId: number;
	name: string;
	signed: boolean;
	recertificationDt: any;
	createdBy: string;
	createdTs: any;
	updatedBy: string;
	updatedTs: any;
	mouDocDTOs: any = [];
	applicationID: number;
	receiptDt: any;

}
export class MOUDocDTO {
	mouDocId: number;
	createdBy: string;
	createdTs: any;
	updatedBy: string;
	updatedTs: any;
	location: string;
	fileName: string;
	fileContent: string;
	status: boolean;
	newFile: boolean;
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

export class UserReportRequest {
	userId: any;
	appRoleId: any;
}