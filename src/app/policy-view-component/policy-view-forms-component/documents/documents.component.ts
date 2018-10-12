import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Policy, PolicyDocumentsDTO, PolicyGrp } from '../../../data_modelPolicy';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { APP_CONFIG } from '../../../app.config';
import { UtilService } from '../../../util.service';
import { ApiserviceService } from '../../../apiservice.service';
declare var swal: any; ''
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  @ViewChild('fileInput') inputEl: ElementRef;
  plus = true;
  policyDocumentDTO: PolicyDocumentsDTO[];
  files: File[] = [];
  policyGrpData: PolicyGrp;
  policyDocumentDTOobj: any;
  showDocument: boolean;
  public fetchPolicyDocuments: any;
  public loading: boolean = false;

  constructor(private modalService: NgbModal, private http: Http, private utilservice: UtilService, private _apiservice: ApiserviceService) {
    this.policyGrpData = new PolicyGrp();
    this.policyDocumentDTO = [];
    this.files = [] as File[];
   

  }

  open(content) {
    this.modalService.open(content);
  }

  changeButton() {
    this.plus = false;
  }

  close() {
    this.plus = true;
  }

  display(upload) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    const modalRef = this.modalService.open(upload, ngbModalOptions);
    // modalRef.result.then((result) => {

    // });

  }

  ngOnInit() {
    this.fetchPolicies(UtilService.policyGrpId);
    this.loading = true;
  }

  fetchPolicies(id) {
    this._apiservice.fetchPolicies(id)
      .subscribe((data: any) => {
        this.loading = false;
        this.fetchPolicyDocuments = data.policyDocumentsDTOs;
      }, error => console.log(error));

  }

  createPolicyDocumentDTO(fileInput: any) {

    this.policyDocumentDTOobj = new PolicyDocumentsDTO();

    this.policyDocumentDTOobj.documentName = fileInput.target.files[0].name;
    this.policyDocumentDTOobj.activeFlag=true;
    this.files.push(fileInput.target.files[0]);
    if (this.policyDocumentDTO == null) {
      this.policyDocumentDTO = [];
    }

    this.policyDocumentDTO.push(this.policyDocumentDTOobj);
   
  
    
  }



  confirm(title = 'Are you sure?', text, confirmButtonText, cancelButtonText, showCancelButton = true) {
    return new Promise((resolve, reject) => {
      swal({
        title: title,
        text: text,
        type: 'warning',
        showCancelButton: showCancelButton,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        resolve(result);
      }, error => reject(error));
    });




  }






  deleteFile(id, index) {
    this.confirm('Are You Sure?', 'delete the file', 'YES', 'NO')
      .then((result: any) => {
        if (result.value !== undefined && result.value) {
          if (id === undefined) {
            let length = this.fetchPolicyDocuments.length;
            if (length === 1) {
              this.fetchPolicyDocuments = []; //a,b,c,d,f = [2] =[3]
            }
            else {
              for (let i = index; i < length; i++) {
                this.fetchPolicyDocuments[i] = this.fetchPolicyDocuments[i + 1];
              }
              this.fetchPolicyDocuments.splice(length - 1, 1);
            }

          }
          else {
            for (let i = 0; i < this.fetchPolicyDocuments.length; i++) {
              if (this.fetchPolicyDocuments[i].policyDocId === id) {
                this.fetchPolicyDocuments[i].activeFlag = false;
              }
            }
          }

        }
      }, error => {
        console.log(error);
      });
  }









  getPolicyDocumentAttch(id) {
    window.open(APP_CONFIG.getPolicyDocumentAttch + '?' + 'policyDocId' + '=' + id)
  }




  transferDocument() {
    this.showDocument = true;
    //let data =JSON.stringify(this.policyDocumentDTO);
    this.fetchPolicyDocuments.push(this.policyDocumentDTOobj);
    //console.log(this.fetchPolicyDocuments);
  }







  submitDocument() {

    this.policyGrpData.policyGrpId = UtilService.policyGrpId;
    let url = APP_CONFIG.uploadPolicyDocuments;
    let policyDocumentsData = new FormData();

    for (let i = 0; i < this.files.length; i++) {
      policyDocumentsData.append('files', this.files[i]);

    }
    policyDocumentsData.append('policy', JSON.stringify(this.policyGrpData));

    this.http.post(url, policyDocumentsData).subscribe((data: any) => {
    }, error => console.log(error));
  }

}
