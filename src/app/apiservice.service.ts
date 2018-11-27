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


  getSolutionExtra(id) {
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

  getVendorExtra(id) {
    let url = APP_CONFIG.getVendor;
    return this._httpService.get(url + '?' + 'vendorId' + '=' + id)
      .map(res => <Response>res.json());
  }
  postVendorData(body) {
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

  updateAppSolution(data) {
    console.log(data);
    let url = APP_CONFIG.updateAppSolution;
    return this._httpService.post(url, data).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));


  }



  updateAppSolutionDevice(data) {
    console.log(data);
    let url = APP_CONFIG.updateAppSolutionDevice;
    return this._httpService.post(url, data).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));


  }




  updateMOU(data) {
    console.log(data);
    let url = APP_CONFIG.updateMOU;
    return this._httpService.post(url, data).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));


    //this.http.post(url, data);    

  }



  getSolutionTypes(id) {
    let url = APP_CONFIG.getSolutionTypes;
    return this._httpService.get(url + '?' + 'solutionID' + '=' + id)
      .map(res => <Response>res.json());
  }

  getSolutionsOnload() {
    let url = APP_CONFIG.getSolutionsOnload;
    return this._httpService.get(url)
      .map(res => <Response>res.json());
  }

  addSolutions(body) {
    console.log(body);
    let url = APP_CONFIG.addSolutions;
    return this._httpService.post(url, body).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getSolutionFile(id) {
    let url = APP_CONFIG.getSolutionFile;
    return this._httpService.get(url + '?' + 'fileId' + '=' + id)
      .map(res => <Response>res.json());
  }

  fetchPolicies(id) {
    let url = APP_CONFIG.fetchPolicies;
    return this._httpService.get(url + '?' + 'policyGrpId' + '=' + id)
      .map(res => <Response>res.json());
  }

  getAuditTypes() {
    let url = APP_CONFIG.getAuditTypes;
    return this._httpService.get(url)
      .map(res => <Response>res.json());
  }
  getPolicyGroup(auditId) {
    let url = APP_CONFIG.getPolicyGroup;
    return this._httpService.get(url + '?' + 'auditTypeId' + '=' + auditId)
      .map(res => <Response>res.json());
  }

  addPolicyGroup(formData) {

    let url = APP_CONFIG.addPolicyGroup;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._httpService.post(url, formData, options).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  addLocality(data) {
    let url = APP_CONFIG.addLocality;
    console.log("data 95", data);
    return this._httpService.post(url, data).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));


  }

  viewApplication(name) {
    let url = APP_CONFIG.viewApplication;
    return this._httpService.get(url + '?' + 'acronym' + '=' + name)
      .map(res => <Response>res.json());
  }
  getSolutionsOnType(id, pid) {
    let url = APP_CONFIG.getSolutionsOnType;
    return this._httpService.get(url + '?' + 'systemTypeId' + '=' + id + '&' + 'precinctTypeId' + '=' + pid)
      .map(res => <Response>res.json());
  }
  getSolution(id) {
    let url = APP_CONFIG.getSolution;
    return this._httpService.get(url + '?' + 'solutionID' + '=' + id)
      .map(res => <Response>res.json());
  }
  getPolicy(id) {
    const url = APP_CONFIG.getPolicy;
    return this._httpService.get(url + '?' + 'policyId' + '=' + id)
      .map(res => res.json() as Solution);

  }
  saveMOU(data) {
    let url = APP_CONFIG.saveMOU;

    return this._httpService.post(url, data).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }
  getAppSolution(id) {
    let url = APP_CONFIG.getAppSolution;
    return this._httpService.get(url + '?' + 'solutionId' + '=' + id)
      .map(res => <Response>res.json());
  }

  getAppMOUs(id) {
    let url = APP_CONFIG.getAppMOUs;
    return this._httpService.get(url + '?' + 'applicationID' + '=' + id)
      .map(res => <Response>res.json())

  }
  saveAppSolution(data) {
    let url = APP_CONFIG.saveAppSolution;

    return this._httpService.post(url, data).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  saveDBServerInfo(data) {
    console.log(data);
    let url = APP_CONFIG.saveDBServerInfo;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._httpService.post(url, data, options).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));


  }

  getDBServer(id) {
    let url = APP_CONFIG.getDBServer;
    return this._httpService.get(url + '?' + 'a' + '=' + id)
      .map(res => <Response>res.json())

  }
  saveAppAuditInfo(data) {
    let url = APP_CONFIG.saveAppAuditInfo;
    return this._httpService.post(url, data).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));


  }

  comparePolicyFile(data) {
    let url = APP_CONFIG.comparePolicyFile;
    return this._httpService.post(url, data).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));


  }

  getAppAcronyms() {

    let url = APP_CONFIG.getAppAcronyms;
    return this._httpService.get(url)
      .map(res => <Response>res.json());


  }

  assignReviewers(data) {
    let url = APP_CONFIG.assignReviewers;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._httpService.post(url, data, options).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  getPolicyReviewDetails(id) {
    let url = APP_CONFIG.getPolicyReviewDetails;
    return this._httpService.get(url + '?' + 'id' + '=' + id)
      .map(res => <Response>res.json());
  }

  getUseronName(name) {
    let url = APP_CONFIG.getUseronName;
    return this._httpService.get(url + '?' + 'userName' + '=' + name)
      .map(res => <Response>res.json());
  }

  getUsers() {
    let url = APP_CONFIG.getUsers;
    return this._httpService.get(url)
      .map(res => <Response>res.json());
  }

  updatePolicyGrp(data) {
    console.log(data);
    let url = APP_CONFIG.updatePolicyGrp;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._httpService.post(url, data, options).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));


  }

  fetchPolicyGroup(id) {
    let url = APP_CONFIG.fetchPolicyGroup;
    return this._httpService.get(url + '?' + 'auditTypeId' + '=' + id)
      .map(res => <Response>res.json());
  }

  getAssessData(id) {
    let url = APP_CONFIG.getAssessData;
    return this._httpService.get(url + '?' + 'assessmentID' + '=' + id)
      .map(res => <Response>res.json())
  }

  addAuditType(body) {
    console.log("body", body);
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

  getSolOnTypeForReports(systemTypeId) {
    let url = APP_CONFIG.getSolOnTypeForReports;
    return this._httpService.get(url + '?' + 'systemTypeId' + '=' + systemTypeId)
      .map(res => <Response>res.json())

  }


  getLocOnTypeForSystem(solutionId) {
    let url = APP_CONFIG.getLocOnTypeForSystem;
    return this._httpService.get(url + '?' + 'solutionId' + '=' + solutionId)
      .map(res => <Response>res.json())
  }
  getSolOnTypeForPrecinct(precinctTypeId) {
    let url = APP_CONFIG.getSolOnTypeForPrecinct;
    return this._httpService.get(url + '?' + 'precinctTypeId' + '=' + precinctTypeId)
      .map(res => <Response>res.json())
  }

  getLocForDevices() {
    let url = APP_CONFIG.getLocForDevices;
    return this._httpService.get(url)
      .map(res => <Response>res.json())
  }


  getLocOnVendors(vendorId) {
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
  getFamilies(id) {
    let url = APP_CONFIG.fetchFamilies;
    return this._httpService.get(url + '?' + 'policyGrpId' + '=' +id)
      .map(res => <Response>res.json());
  }

  getPoliciesByFam(value) {
    let url = APP_CONFIG.getPoliciesByFam;
    return this._httpService.get(url + '?' + 'familyName' + '=' + value)
      .map(res => <Response>res.json())
  }
}
