import { environment } from '../environments/environment';

//const baseUrl = 'http://localhost:8080/ApplicationPortfolioManager/services/';

//const baseUrl = 'http://ec2-54-86-177-206.compute-1.amazonaws.com/ApplicationPortfolioManager/services/';


//const baseUrl='http://172.24.16.56:8080/ApplicationPortfolioManager/services/';

//const baseUrl = 'http://23.96.86.203:8080/ApplicationPortfolioManager/services/';

const apiBaseUrl = environment.url;


export const APP_CONFIG = {

  getVendors: apiBaseUrl + 'getVendors',
  getSolutions: apiBaseUrl + 'getSolutions',
  getSolution: apiBaseUrl + 'getSolution',
  getVendor: apiBaseUrl + 'getVendor',
  postVendor: apiBaseUrl + 'addNewVendor',
  postSolution: apiBaseUrl + 'updateSolution',
  getSolutionTypes: apiBaseUrl + 'getSolutionOnType',
  getSolutionsOnload: apiBaseUrl + 'getSolutionsOnload',
  addSolutions: apiBaseUrl + 'registerSolution',
  getSolutionFile: apiBaseUrl + 'getSolutionFile',
  fetchPolicies: apiBaseUrl + 'fetchPolicies',
  getAuditTypes: apiBaseUrl + 'getAuditTypes',
  getPolicyGroup: apiBaseUrl + 'fetchPolicyGroup',///
  addPolicyGroup: apiBaseUrl + 'addPolicyGrp',
  addLocality: apiBaseUrl + 'createApplication',
  addSystem: apiBaseUrl + 'createApplication',
  viewApplication: apiBaseUrl + 'viewApplication',
  updateLocality: apiBaseUrl + 'updateApplication',
  updateSystem: apiBaseUrl + 'updateApplication',
  getSolutionsOnType: apiBaseUrl + 'getSolutionsOnType',
  getPolicy: apiBaseUrl + 'getPolicy',
  saveAppSolution: apiBaseUrl + 'saveAppSolution',
  saveMOU: apiBaseUrl + 'saveMOU',
  getAppSolution: apiBaseUrl + 'getAppSolution',
  getAppMOUs: apiBaseUrl + 'getAppMOUs',
  updateMOU: apiBaseUrl + 'updateMOU',
  getMOUFile: apiBaseUrl + 'getMOUFile',
  updateAppSolution: apiBaseUrl + 'updateAppSolution',
  updateAppSolutionDevice: apiBaseUrl + 'updateAppSolutionDevice',
  updatePolicy: apiBaseUrl + 'updatePolicy',
  uploadPolicyDocuments: apiBaseUrl + 'uploadPolicyDocuments',
  uploadPolicyFile: apiBaseUrl + 'uploadPolicyFile',
  generatePolicyFile: apiBaseUrl + 'generatePolicyFile',
  savePolicy: apiBaseUrl + 'savePolicy',
  saveDBServerInfo: apiBaseUrl + 'saveDBServerInfo',
  getDBServer: apiBaseUrl + 'getDBServer',
  updateDBServerInfo: apiBaseUrl + 'updateDBServerInfo',
  saveAppAuditInfo: apiBaseUrl + 'saveAppAuditInfo',
  updateAppAuditInfo: apiBaseUrl + 'updateAppAuditInfo',
  getAppAuditFile: apiBaseUrl + 'getAppAuditFile',
  comparePolicyFile: apiBaseUrl + 'comparePolicyFile',
  saveAppAssessment: apiBaseUrl + 'saveAppAssessment',
  updateAppAssessment: apiBaseUrl + 'updateAppAssessment',
  getAppAcronyms: apiBaseUrl + 'getAppAcronyms',
  getUsers: apiBaseUrl + 'getUsers',
  getUseronName: apiBaseUrl + 'getUseronName',
  assignReviewers: apiBaseUrl + 'assignReviewers',
  getPolicyReviewDetails: apiBaseUrl + 'getPolicyReviewDetails',
  updatePolicyGrp: apiBaseUrl + 'updatePolicyGrp',
  addPolicyGrp: apiBaseUrl + 'addPolicyGrp',
  fetchPolicyGroup: apiBaseUrl + 'fetchPolicyGroup',
  fetchPolicyGroupForAA: apiBaseUrl + 'fetchPolicyGroupForAA',
  getAssessData: apiBaseUrl + 'getAppAssessment',
  getAssessmentFile: apiBaseUrl + 'getAssessmentFile',
  addAuditType: apiBaseUrl + 'addAuditType',
  saveAppSolutionDevices: apiBaseUrl + 'saveAppSolutionDevices',
  getDevices: apiBaseUrl + 'getAppSolution',
  getBusinessOwner: apiBaseUrl + 'getBusinessOwnerNameDoe',
  getSystemAdministrator: apiBaseUrl + 'getSystemAdministrator',
  getDbAdmin: apiBaseUrl + 'getDbAdmin',
  getDevelopers: apiBaseUrl + 'getDevelopers',
  getDataCustodian: apiBaseUrl + 'getDataCustodian',
  getTesters: apiBaseUrl + 'getTesters',
  getBusinessAnalyst: apiBaseUrl + 'getBusinessAnalyst',
  getDeviceFile: apiBaseUrl + 'getDeviceFile',
  getPolicyDocumentAttch: apiBaseUrl + 'getPolicyDocumentAttch',
  getDatabases: apiBaseUrl + 'getDatabases',
  getLocalityAcronyms: apiBaseUrl + 'getLocalityAcrnonyms',
  getLocalityTotal: apiBaseUrl + 'getLocalityTotal',
  getPendingApplications: apiBaseUrl + 'getPendingApplications',
  getLocalityForView: apiBaseUrl + 'getLocalityForView',
  getAllMOUs: apiBaseUrl + 'getAllMOUs',
  getSolOnTypeForReports: apiBaseUrl + 'getSolOnTypeForReports',
  getLocOnTypeForSystem: apiBaseUrl + 'getLocOnTypeForSystem',
  getSolOnTypeForPrecinct: apiBaseUrl + 'getSolOnTypeForPrecinct',
  getLocOnVendors: apiBaseUrl + 'getLocOnVendors',
  getLocForDevices: apiBaseUrl + 'getLocForDevices',
  getAllTotals: apiBaseUrl + 'getAllTotals',
  getLocForMous: apiBaseUrl + 'getLocForMous',
  getSysForMous: apiBaseUrl + 'getSysForMous',
  fetchFamilies: apiBaseUrl + 'fetchFamilies',
  getPoliciesByFam: apiBaseUrl + 'getPoliciesByFam',
  getAppPolicy: apiBaseUrl + 'getAppAuditPolicyDetails',
  updateAppPolicy: apiBaseUrl + 'updateAppAuditPolicyDetails',
  getFile: apiBaseUrl + 'getfile',
  getAssessmentPolicyDetails: apiBaseUrl + 'getAssessmentPolicyDetails',
  updateAssessmentPolicyDetails: apiBaseUrl + 'updateAssessmentPolicyDetails',
  archiveAppSolution: apiBaseUrl + 'archiveAppSolution',
  savePolicyReview: apiBaseUrl + 'savePolicyReview',
  getDataOwner: apiBaseUrl + 'getDataOwner',
  getBusinessOwnerB: apiBaseUrl + 'getBusinessOwner',
  getSystem_Site_Data_Owner: apiBaseUrl + 'getSystem_Site_Data_Owner',
  getProjectManager: apiBaseUrl + 'getProjectManager',
  getISO: apiBaseUrl + 'getISO',
  addUser: apiBaseUrl + 'addUser',
  appAudit: apiBaseUrl + 'appAudit',
  getTechnologies: apiBaseUrl + 'getTechnologies',
  getTechProjectManager: apiBaseUrl + 'getTechProjectManager',
  auditFamilyGroup: apiBaseUrl + 'auditFamilyGroup',
  getPolicyFamilyDetails: apiBaseUrl + 'getPolicyFamilyDetails',
  getServerTypes: apiBaseUrl + 'getServerTypes',
  getUserRoles: apiBaseUrl + 'getUserRoles',
  getUsersonRole: apiBaseUrl + 'getUsersonRole',
  getUserApps: apiBaseUrl + 'getUserApps',
  getApplicationServers: apiBaseUrl + 'getApplicationServers',
  getDatabaseReport: apiBaseUrl + 'getDatabaseReport',
  getServerReport: apiBaseUrl + 'getServerReport',
  getTechReport: apiBaseUrl + 'getTechReport',
  familyOverride: apiBaseUrl + 'familyOverride',
  fetchPolicyFamily: apiBaseUrl + 'fetchPolicyFamily',
  fetchPoliciesWithFamily: apiBaseUrl + 'fetchPoliciesWithFamily',
  overridePolicyFamily: apiBaseUrl + 'overridePolicyFamily',
  upComingAudits: apiBaseUrl + 'upComingAudits',
  getServers: apiBaseUrl + 'getServers',
  getLocalityGraphDetails: apiBaseUrl + 'getLocalityGraphDetails',

}


