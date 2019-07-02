import { APP_CONFIG } from './app.config';
import { HttpService } from './core/http.service';
import { Solution } from './data_model';
import { Injectable } from '@angular/core';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

@Injectable()
export class ApiserviceService {
  public subject = new BehaviorSubject<any>(false);
  constructor(private _httpService: HttpService, private http: Http) { }

  getVendors() {
    let url = APP_CONFIG.getVendors;
    return this._httpService.get(url)
      .map(res => <Response>res.json());
  }

  getSolutions() {
    let url = APP_CONFIG.getSolutions;
    return this._httpService.get(url)
      .map(res => <Response>res.json());
  }

  getDatabases() {
    let url = APP_CONFIG.getDatabases;
    return this._httpService.get(url)
      .map(res => <Response>res.json());
  }


  getSolutionExtra(id: any) {
    const url = APP_CONFIG.getSolution;
    return this._httpService.get(url + '?' + 'solutionID' + '=' + id)
      .map(res => res.json() as Solution);
  }

  /*getSolution()
 {
   let url = APP_CONFIG.getSolution;
   return this._httpService.get(url)
   .map(res =><Response>res.json());
 }*/

  getVendorExtra(id: any) {
    let url = APP_CONFIG.getVendor;
    return this._httpService.get(url + '?' + 'vendorId' + '=' + id)
      .map(res => <Response>res.json());
  }
  postVendorData(body: any) {
    let url = APP_CONFIG.postVendor;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._httpService.post(url, body, options).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateSolution(body) {
    console.log(body);
    let url = APP_CONFIG.postSolution;
    let headers = new Headers({ 'Content-Type': 'multipart/form-data' });
    const options = new RequestOptions({ headers: headers });


    this.http.post(url, body);
    //return this.http.post(url, body).map((res: Response) => res.json())
    //.catch((error : any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateAppSolution(data: any) {
    let url = APP_CONFIG.updateAppSolution;
    return this._httpService.post(url, data).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));


  }



  updateAppSolutionDevice(data: any) {
    let url = APP_CONFIG.updateAppSolutionDevice;
    return this._httpService.post(url, data).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));


  }




  updateMOU(data: any) {
    let url = APP_CONFIG.updateMOU;
    return this._httpService.post(url, data).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));


    //this.http.post(url, data);    

  }



  getSolutionTypes(id: any) {
    let url = APP_CONFIG.getSolutionTypes;
    return this._httpService.get(url + '?' + 'solutionID' + '=' + id)
      .map(res => <Response>res.json());
  }

  getSolutionsOnload() {
    let url = APP_CONFIG.getSolutionsOnload;
    return this._httpService.get(url)
      .map(res => <Response>res.json());
  }
  getMonthOfAuditAssessment(){
    let url = APP_CONFIG.getMonthOfAuditAssessment;
    return this._httpService.get(url)
      .map(res => <Response>res.json());
    
  }

  getAllAuditRiskLevels(){
    let url = APP_CONFIG.getAllAuditRiskLevels;
    return this._httpService.get(url)
      .map(res => <Response>res.json());
    
  }

  addSolutions(body: any) {
    let url = APP_CONFIG.addSolutions;
    return this._httpService.post(url, body).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getSolutionFile(id) {
    let url = APP_CONFIG.getSolutionFile;
    return this._httpService.get(url + '?' + 'fileId' + '=' + id)
      .map(res => <Response>res.json());
  }

  fetchPolicies(id: any) {
    let url = APP_CONFIG.fetchPolicies;
    return this._httpService.get(url + '?' + 'policyGrpId' + '=' + id)
      .map(res => <Response>res.json());
  }

  getAuditTypes() {
    let url = APP_CONFIG.getAuditTypes;
    return this._httpService.get(url)
      .map(res => <Response>res.json());
  }
  getServerTypes() {
    let url = APP_CONFIG.getServerTypes;
    return this._httpService.get(url)
      .map(res => <Response>res.json());
  }
  getPolicyGroup(auditId) {
    let url = APP_CONFIG.getPolicyGroup;
    return this._httpService.get(url + '?' + 'auditTypeId' + '=' + auditId)
      .map(res => <Response>res.json());
  }

  addPolicyGroup(formData: any) {

    let url = APP_CONFIG.addPolicyGroup;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._httpService.post(url, formData, options).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  addLocality(data: any) {
    let url = APP_CONFIG.addLocality;
    return this._httpService.post(url, data).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));


  }

  viewApplication(name: any) {
    let url = APP_CONFIG.viewApplication;
    return this._httpService.get(url + '?' + 'acronym' + '=' + name)
      .map(res => <Response>res.json());
  }
  getSolutionsOnType(id: any, pid: any) {
    let url = APP_CONFIG.getSolutionsOnType;
    return this._httpService.get(url + '?' + 'systemTypeId' + '=' + id + '&' + 'precinctTypeId' + '=' + pid)
      .map(res => <Response>res.json());
  }
  getSolution(id: any) {
    let url = APP_CONFIG.getSolution;
    return this._httpService.get(url + '?' + 'solutionID' + '=' + id)
      .map(res => <Response>res.json());
  }
  getPolicy(id) {
    const url = APP_CONFIG.getPolicy;
    return this._httpService.get(url + '?' + 'policyId' + '=' + id)
      .map(res => res.json() as Solution);

  }
  saveMOU(data: any) {
    let url = APP_CONFIG.saveMOU;

    return this._httpService.post(url, data).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }
  getAppSolution(id: any) {
    let url = APP_CONFIG.getAppSolution;
    return this._httpService.get(url + '?' + 'solutionId' + '=' + id)
      .map(res => <Response>res.json());
  }

  getAppMOUs(id: any) {
    let url = APP_CONFIG.getAppMOUs;
    return this._httpService.get(url + '?' + 'applicationID' + '=' + id)
      .map(res => <Response>res.json())

  }
  saveAppSolution(data: any) {
    let url = APP_CONFIG.saveAppSolution;

    return this._httpService.post(url, data).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  saveDBServerInfo(data: any) {
    let url = APP_CONFIG.saveDBServerInfo;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._httpService.post(url, data, options).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));


  }

  getDBServer(id: any) {
    let url = APP_CONFIG.getDBServer;
    return this._httpService.get(url + '?' + 'a' + '=' + id)
      .map(res => <Response>res.json())

  }
  saveAppAuditInfo(data: any) {
    let url = APP_CONFIG.saveAppAuditInfo;
    return this._httpService.post(url, data).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));


  }

  comparePolicyFile(data: any) {
    let url = APP_CONFIG.comparePolicyFile;
    return this._httpService.post(url, data).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));


  }

  getAppAcronyms() {

    let url = APP_CONFIG.getAppAcronyms;
    return this._httpService.get(url)
      .map(res => <Response>res.json());


  }

  assignReviewers(data: any) {
    let url = APP_CONFIG.assignReviewers;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._httpService.post(url, data, options).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  getPolicyReviewDetails(id: any) {
    let url = APP_CONFIG.getPolicyReviewDetails;
    return this._httpService.get(url + '?' + 'id' + '=' + id)
      .map(res => <Response>res.json());
  }

  getUseronName(name: any) {
    let url = APP_CONFIG.getUseronName;
    return this._httpService.get(url + '?' + 'userName' + '=' + name)
      .map(res => <Response>res.json());
  }

  getUsers() {
    let url = APP_CONFIG.getUsers;
    return this._httpService.get(url)
      .map(res => <Response>res.json());
  }
  getTechnologies() {
    let url = APP_CONFIG.getTechnologies;
    return this._httpService.get(url)
      .map(res => <Response>res.json());
  }

  getTechProjectManager() {
    let url = APP_CONFIG.getTechProjectManager;
    return this._httpService.get(url)
      .map(res => <Response>res.json());
  }
  updatePolicyGrp(data: any) {
    let url = APP_CONFIG.updatePolicyGrp;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._httpService.post(url, data, options).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));


  }

  fetchPolicyGroup(id: any) {
    let url = APP_CONFIG.fetchPolicyGroup;
    return this._httpService.get(url + '?' + 'auditTypeId' + '=' + id)
      .map(res => <Response>res.json());
  }

  fetchPolicyGroupForAA(id: any) {
    let url = APP_CONFIG.fetchPolicyGroupForAA;
    return this._httpService.get(url + '?' + 'auditTypeId' + '=' + id)
      .map(res => <Response>res.json());
  }

  getAssessData(id: any) {
    let url = APP_CONFIG.getAssessData;
    return this._httpService.get(url + '?' + 'assessmentID' + '=' + id)
      .map(res => <Response>res.json())
  }

  addAuditType(body: any) {
    let url = APP_CONFIG.addAuditType;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._httpService.post(url, body, options).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  saveAppSolutionDevices(data) {
    let url = APP_CONFIG.saveAppSolutionDevices;

    return this._httpService.post(url, data).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  getBusinessOwner() {
    let url = APP_CONFIG.getBusinessOwner;
    return this._httpService.get(url)
      .map(res => <Response>res.json());
  }

  getDbAdmin() {
    let url = APP_CONFIG.getDbAdmin;
    return this._httpService.get(url)
      .map(res => <Response>res.json());
  }
  getTesters() {
    let url = APP_CONFIG.getTesters;
    return this._httpService.get(url)
      .map(res => <Response>res.json());
  }
  getDataCustodian() {
    let url = APP_CONFIG.getDataCustodian;
    return this._httpService.get(url)
      .map(res => <Response>res.json());
  }
  getDevelopers() {
    let url = APP_CONFIG.getDevelopers;
    return this._httpService.get(url)
      .map(res => <Response>res.json());
  }
  getBusinessAnalyst() {
    let url = APP_CONFIG.getBusinessAnalyst;
    return this._httpService.get(url)
      .map(res => <Response>res.json());
  }
  getSystemAdministrator() {
    let url = APP_CONFIG.getSystemAdministrator;
    return this._httpService.get(url)
      .map(res => <Response>res.json());
  }
  getAllTotals() {
    let url = APP_CONFIG.getAllTotals;
    return this._httpService.get(url)
      .map(res => <Response>res.json());
  }

  getLocalityTotal() {
    let url = APP_CONFIG.getLocalityTotal;
    return this._httpService.get(url)
      .map(res => <Response>res.json());
  }

  getLocalityAcronyms() {
    let url = APP_CONFIG.getLocalityAcronyms;
    return this._httpService.get(url)
      .map(res => <Response>res.json());
  }

  getPendingApplications() {
    let url = APP_CONFIG.getPendingApplications;
    return this._httpService.get(url)
      .map(res => <Response>res.json());
  }


  getLocalityForView() {
    let url = APP_CONFIG.getLocalityForView;
    return this._httpService.get(url)
      .map(res => <Response>res.json());
  }

  getAllMOUs() {
    let url = APP_CONFIG.getAllMOUs;
    return this._httpService.get(url)
      .map(res => <Response>res.json());
  }

  getSolOnTypeForReports(systemTypeId: any) {
    let url = APP_CONFIG.getSolOnTypeForReports;
    return this._httpService.get(url + '?' + 'systemTypeId' + '=' + systemTypeId)
      .map(res => <Response>res.json())

  }


  getLocOnTypeForSystem(solutionId: any) {
    let url = APP_CONFIG.getLocOnTypeForSystem;
    return this._httpService.get(url + '?' + 'solutionId' + '=' + solutionId)
      .map(res => <Response>res.json())
  }
  getSolOnTypeForPrecinct(precinctTypeId: any) {
    let url = APP_CONFIG.getSolOnTypeForPrecinct;
    return this._httpService.get(url + '?' + 'precinctTypeId' + '=' + precinctTypeId)
      .map(res => <Response>res.json())
  }

  getLocForDevices() {
    let url = APP_CONFIG.getLocForDevices;
    return this._httpService.get(url)
      .map(res => <Response>res.json())
  }


  getApplicationServers() {
    let url = APP_CONFIG.getApplicationServers;
    return this._httpService.get(url)
      .map(res => <Response>res.json())
  }
  getLocOnVendors(vendorId: any) {
    let url = APP_CONFIG.getLocOnVendors;
    return this._httpService.get(url + '?' + 'vendorId' + '=' + vendorId)
      .map(res => <Response>res.json())
  }
  getLocForMous() {
    let url = APP_CONFIG.getLocForMous;
    return this._httpService.get(url)
      .map(res => <Response>res.json());
  }

  getSysForMous() {
    let url = APP_CONFIG.getSysForMous;
    return this._httpService.get(url)
      .map(res => <Response>res.json());
  }
  getFamilies(id: any) {
    let url = APP_CONFIG.fetchFamilies;
    return this._httpService.get(url + '?' + 'policyGrpId' + '=' + id)
      .map(res => <Response>res.json());
  }

  getPoliciesByFam(value:any) {
    let url = APP_CONFIG.getPoliciesByFamId;
    return this._httpService.get(url + '?' + 'policiesByFamId' + '=' + value)
      .map(res => <Response>res.json())
  }

  getAppPolicies(id: any) {
    let url = APP_CONFIG.getAppPolicy;
    return this._httpService.get(url + '?' + 'appAuditPolicyId' + '=' + id)
      .map(res => <Response>res.json())
  }

  updateAppPolicies(data: any) {
    let url = APP_CONFIG.updateAppPolicy

    return this._httpService.post(url, data).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  getAssessmentPolicyDetails(id: any) {
    let url = APP_CONFIG.getAssessmentPolicyDetails;
    return this._httpService.get(url + '?' + 'assessmentPolicyId' + '=' + id)
      .map(res => <Response>res.json())
  }

  updateAssessmentPolicyDetails(data: any) {
    let url = APP_CONFIG.updateAssessmentPolicyDetails;
    return this._httpService.post(url, data).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  archiveAppSolution(data: any) {
    let url = APP_CONFIG.archiveAppSolution;
    return this._httpService.post(url, data).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  appAudit(id: any) {
    let url = APP_CONFIG.appAudit;
    return this._httpService.get(url + '?' + 'auditId' + '=' + id)
      .map(res => <Response>res.json())
  }


  fetchPolicyFamily(id: any) {
    let url = APP_CONFIG.fetchPolicyFamily;
    return this._httpService.get(url + '?' + 'policyGrpId' + '=' + id)
      .map(res => <Response>res.json());
  }

  getServers() {
    let url = APP_CONFIG.getServers;
    return this._httpService.get(url)
      .map(res => <Response>res.json());
  }

}
