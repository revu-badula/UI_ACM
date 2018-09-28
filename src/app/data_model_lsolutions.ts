export class ApplicationSolution {
	appSolutionId: number;
	activeFlag: boolean;
	createdBy: string;
	createdTs: any;
	updatedBy: string;
	updatedTs: any;
	appSolutionDevices: any[] = [];
	applicationID: number;
	solutionId: number;
	notes: string;
	solutionsDTO: SolutionsDTO;
	noOfUnits: number;
	hostingTypeId: number;
	hostingType: HostingType;

}
export class SolutionsDTO {

	solutionId: number;
	certDt: any;
	certStadard: String;
	certRenewalDueDt: any;
	name: string;
	versionNumber: string;
	patches: string;
	notes: string;
	solutionType: number;
	vendorId: number;
	createdBy: string;
	createdTs: any;
	updatedBy: string;
	updatedTs: any;
	vendor: Vendor;
	hostingTypeDTO: HostingType;
	systemTypeDTO: SystemType;
	solutionTypeName: string;
	labVendorId: number;
	hostingTypeNotes: string;
	precinctTypeId: number;
	precinctTypeName: string;

}
export class Device {

	appSolutionDevice: number;
	modelNumber: any;
	serialNumber: any;
	appSolutionId: number;
   createdBy:string;
   updatedBy:string;
	activeFlag: boolean;

	//	  firstName:string;
	//	 lastName:string;
	street1: string;
	street2: string;
	city: string;
	state: string;
	zipCode: string;

	nextScanningDt: any;
	overallStatus: string;
	notes: string;
	deviceDocDTO: any = [];

}


export class DeviceDocDTO {
	deviceDocId: number;
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
export class Vendor {
	vendorId: number;
	name: string;
	createdBy: string;
	//createdTs: any;
	//updatedBy: string;
	//updatedTs: any;
	vendorAddress: any;
	vendorContact: any;
}

export class HostingType {
	name: string;
	hostingTypeId: number;
}
export class SystemType {
	 systemTypeId: number;
	 name: string;
	 //description: string;
}