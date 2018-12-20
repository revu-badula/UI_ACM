import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { Policy, PolicyDocumentsDTO, PolicyGrp } from '../../../data_modelPolicy';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { APP_CONFIG } from '../../../app.config';
import { UtilService } from '../../../util.service';
import { ApiserviceService } from '../../../apiservice.service';
import { Cookie } from 'ng2-cookies';
declare var swal: any; '';
import { DialogService } from '../../../dialog.service';
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  @ViewChild('fileInput') inputEl: ElementRef;
  @ViewChild('content') content: TemplateRef<any>;
  plus = true;
  policyDocumentDTO: PolicyDocumentsDTO;
  policyDocumentsDTO: any;
  files: File[] = [];
  policyGrpData: PolicyGrp;
  policyDocumentDTOobj: any;
  showDocument: boolean;
  public fetchPolicyDocuments: any;
  public loading: boolean = false;

  constructor(private modalService: NgbModal, private http: Http, private utilservice: UtilService, 
    private _apiservice: ApiserviceService, private dialogService: DialogService) {
    this.policyGrpData = new PolicyGrp();
    this.files = [] as File[];
    this.policyDocumentDTO = new PolicyDocumentsDTO();


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
    this.policyDocumentDTO = new PolicyDocumentsDTO();
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
        this.policyDocumentsDTO = data.policyDocumentsDTOs;

      }, error => console.log(error));

  }

  createPolicyDocumentDTO(fileInput: any) {
    let files = fileInput.target.files[0];
    if (files === undefined) { }
    else {
      if (this.policyDocumentsDTO === null) {
        this.policyDocumentsDTO=[];
        this.policyDocumentDTO = new PolicyDocumentsDTO();
        this.policyDocumentDTO.documentName = fileInput.target.files[0].name;
        this.policyDocumentDTO.activeFlag = true;
        this.policyDocumentDTO.policyGrpId = UtilService.policyGrpId;
        this.policyDocumentDTO.createdBy = Cookie.get('userName');
        this.getFileContent(fileInput.target.files[0])
          .then(
            data =>
              this.policyDocumentDTO.fileContent = data);
        this.policyDocumentsDTO.push(this.policyDocumentDTO);
      }
      else{
        this.policyDocumentDTO = new PolicyDocumentsDTO();
        this.policyDocumentDTO.documentName = fileInput.target.files[0].name;
        this.policyDocumentDTO.activeFlag = true;
        this.policyDocumentDTO.policyGrpId = UtilService.policyGrpId;
        this.policyDocumentDTO.createdBy = Cookie.get('userName');
        this.getFileContent(fileInput.target.files[0])
          .then(
            data =>
              this.policyDocumentDTO.fileContent = data);
        this.policyDocumentsDTO.push(this.policyDocumentDTO);
      }
    }


  }


  getFileContent(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result)

      };
      reader.onerror = (error) => {
        reject(error);
      };
    });


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
    this.dialogService.open("Info", " Do you want to delete the file?", true, "Yes", "No")
      .then((result: any) => {
        if (result) {
          if (id === undefined) {
            let length = this.policyDocumentsDTO.length;
            if (length === 1) {
              this.policyDocumentsDTO = []; //a,b,c,d,f = [2] =[3]
            }
            else {
              for (let i = index; i < length; i++) {
                this.policyDocumentsDTO[i] = this.policyDocumentsDTO[i + 1];
              }
              this.policyDocumentsDTO.splice(length - 1, 1);
            }

          }
          else {
            for (let i = 0; i < this.policyDocumentsDTO.length; i++) {
              if (this.policyDocumentsDTO[i].policyDocId === id) {
                this.policyDocumentsDTO[i].activeFlag = false;
                this.policyDocumentsDTO[i].updatedBy = Cookie.get('userName');
                this.submitDocument();
              }
            }
          }

        }
      }, error => {
        console.log(error);
      });
  }


  getPolicyDocumentAttch(id) {
    //window.open(APP_CONFIG.getPolicyDocumentAttch + '?' + 'policyDocId' + '=' + id)
    this.utilservice.getFile(id);
  }




  transferDocument() {
    this.showDocument = true;
    //let data =JSON.stringify(this.policyDocumentDTO);
    //this.fetchPolicyDocuments.push(this.policyDocumentDTOobj);
    //console.log(this.fetchPolicyDocuments);
  }







  submitDocument() {
    this.loading=true;
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.policyGrpData.policyGrpId = UtilService.policyGrpId;
    let url = APP_CONFIG.uploadPolicyDocuments;
    // let policyDocumentsData = new FormData();

    // for (let i = 0; i < this.files.length; i++) {
    //   policyDocumentsData.append('files', this.files[i]);

    // }
    // // for (let i = 0; i < this.policyDocumentDTO.length; i++) {
    // policyDocumentsData.append('policy', JSON.stringify(this.policyDocumentDTO));
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = JSON.stringify(this.policyDocumentsDTO);
    this.http.post(url, data, options).subscribe((data: any) => {
      this.loading=false;
      this.modalService.open(this.content, ngbModalOptions)
    }, error => {
      this.loading=false;
      console.log(error);
    });
  }

}
