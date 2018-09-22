import { Component, OnInit, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { ApiserviceService } from '../../../../apiservice.service';
import { UtilService } from '../../../../util.service';
import { AppAudit } from '../../../../data.model.auditDTO';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { APP_CONFIG } from '../../../../app.config';
import { IMyDate, IMyDpOptions } from 'mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { FormsModule, NgForm, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Cookie } from 'ng2-cookies';

declare var swal: any; ''
import { AppAssess, AssessmentPolicyDTO, Policy, AssessmentFileDTO } from '../../../../data.model.assessmentDTO';
interface Window {
  chrome: any;
  StyleMedia: any;
  URL: any;
  webkitURL: any;
  navigator: any;
  open: any;
}
interface Document {
  documentMode: any;
  createElement: any;
  body: any;
}
declare let window: Window;
declare let document: Document;

@Component({
  selector: 'app-assess-attachments',
  templateUrl: './assess-attachments.component.html',
  styleUrls: ['./assess-attachments.component.css']
})
export class AssessAttachmentsComponent implements OnInit {
  @ViewChild('content') content: TemplateRef<any>;
  @ViewChild('myForm') myForm: FormGroup;
  appAssess: AppAssess;
  assessmentFileDTO: AssessmentFileDTO;
  public loading: boolean = false;
  public info: any;
  public showSave: boolean = false;
  public editData: any;
  public givenfile: boolean = false;
  public showEdit: boolean = false;
  public showForm: boolean = true;
  constructor(private _apiservice: ApiserviceService,
    private utilService: UtilService, private http: Http, private route: ActivatedRoute,
    private router: Router, private modalService: NgbModal, private datepipe: DatePipe) {
    this.appAssess = new AppAssess();
    this.getAppId();
  }

  ngOnInit() {
  }


  getAppId() {
    this.loading = true;
    this._apiservice.viewApplication(localStorage.getItem('localityName'))
      .subscribe((data: any) => {
        this.loading = false;
        this.appAssess.applicationID = data.applicationViewDTO.applicationId;
        this.showOnPageLoad();
      }, error => {
        this.loading = false;
        console.log(error);
      });
  }

  showOnPageLoad() {
    if (localStorage.getItem('assesId') === null) {
      console.log('Not edit mode');
    }
    else {
      let id = localStorage.getItem('assesId');
      let auid = +id;
      this.showEdit = true;
      this.loading = true;
      this._apiservice.getAssessData(auid)
        .subscribe((data: any) => {
          this.loading = false;
          this.appAssess = data;
        }, error => {
          this.loading = false;
          console.log(error);
        });

    }

  }

  saveAttachments() {
    this.loading = true;
    //  let inputEl: HTMLInputElement = this.inputEl.nativeElement;
    //  var formData = new FormData();

    //   //formData.append('',inputEl.files.item(0));
    //   this.appAudit.appAuditFileDTOs.file
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let url_update = APP_CONFIG.updateAppAssessment;
    this.appAssess.updatedBy=Cookie.get('userName');
    let data = JSON.stringify(this.appAssess);
    this.http.post(url_update, data, options)
      .subscribe((data: any) => {
        this.loading = false;
        //const { myForm: { value: formValueSnap } } = this;
        this.givenfile = false;
        this.myForm.reset();
        this.info = "Attachments has been updated.";
        this.modalService.open(this.content, ngbModalOptions);
      }, error => {
        this.loading = false;
        console.log(error);
      });
  }


  createMOUDTO(fileInput: any) {
    let files = fileInput.target.files[0];
    if (files === undefined) {

    }
    else {
      if (this.appAssess.assessmentFileDTOs === null) {
        this.givenfile=true;
        this.appAssess.assessmentFileDTOs = [];
        this.assessmentFileDTO = new AssessmentFileDTO();
        this.assessmentFileDTO.fileName = fileInput.target.files[0].name;
        //this.appAuditFileDTO.fileContent  = fileInput.target.files[0];
        this.assessmentFileDTO.status = true;
        this.getFileContent(fileInput.target.files[0])
          .then(
            data =>
              this.assessmentFileDTO.fileContent = data);
        //this.files.push(fileInput.target.files[0]);
        this.appAssess.assessmentFileDTOs.push(this.assessmentFileDTO);
      }
      else {
        //this.myForm.controls.file.markAsDirty();
        this.givenfile = true;
        this.assessmentFileDTO = new AssessmentFileDTO();
        this.assessmentFileDTO.fileName = fileInput.target.files[0].name;
        //this.appAuditFileDTO.fileContent  = fileInput.target.files[0];
        this.assessmentFileDTO.status = true;
        this.getFileContent(fileInput.target.files[0])
          .then(
            data =>
              this.assessmentFileDTO.fileContent = data);
        //this.files.push(fileInput.target.files[0]);
        this.appAssess.assessmentFileDTOs.push(this.assessmentFileDTO);

      }
    }

  }

  deleteFile(id, index) {

    this.confirm('Are You Sure?', 'delete the file', 'YES', 'NO')
      .then((result: any) => {
        if (result.value !== undefined && result.value) {
          if (id === undefined) {
            let length = this.appAssess.assessmentFileDTOs.length;
            if (length === 1) {
              this.givenfile=false;
              this.appAssess.assessmentFileDTOs = [];
            }
            else {
              this.givenfile=false;
              for (let i = index; i < length; i++) {
                this.appAssess.assessmentFileDTOs[i] = this.appAssess.assessmentFileDTOs[i + 1];
              }
              this.appAssess.assessmentFileDTOs.splice(length - 1, 1);
            }

          }
          else {
            this.givenfile = true;
            for (let i = 0; i < this.appAssess.assessmentFileDTOs.length; i++) {
              if (this.appAssess.assessmentFileDTOs[i].assessmentFileId === id) {
                this.appAssess.assessmentFileDTOs[i].status = false;
                this.saveAttachments();
              }
            }
          }
        }
      }, error => {
        console.log(error);
      });

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
  getFile(id) {

    window.open(APP_CONFIG.getAssessmentFile + '?' + 'id' + '=' + id);

    // if (id === undefined) {

    // }
    // else {
    //   this.loading = true;
    //   this.http.get(APP_CONFIG.getAssessmentFile + '?' + 'id' + '=' + id)
    //     .map((res: any) => {
    //       return res.json();
    //     })
    //     .subscribe((res: any) => {
    //       this.loading = false;
    //       let isChrome = !!window.chrome && !!window.chrome.webstore;
    //       let isIE = /*@cc_on!@*/false || !!document.documentMode;
    //       let isEdge = !isIE && !!window.StyleMedia;
    //       let url = window.URL || window.webkitURL;
    //       let file;
    //       if (isChrome) {

    //         let url = window.URL || window.webkitURL;
    //         var link = document.createElement("a");
    //         if (res.fileName.includes(".doc") || res.fileName.includes(".docx")) {
    //           link.href = "data:" + "application/msword" + ";base64," + res.fileContent;
    //         }
    //         else {
    //           link.href = "data:" + "application/pdf" + ";base64," + res.fileContent;
    //         }
    //         link.download = res.fileName;
    //         link.click();
    //       }
    //       else if (isEdge || isIE) {
    //         var byteCharacters = atob(res.fileContent);
    //         var byteNumbers = new Array(byteCharacters.length);
    //         for (var i = 0; i < byteCharacters.length; i++) {
    //           byteNumbers[i] = byteCharacters.charCodeAt(i);
    //         }
    //         var byteArray = new Uint8Array(byteNumbers);

    //         if (res.fileName.includes(".doc") || res.fileName.includes(".docx")) {
    //           file = new Blob([byteArray], { type: 'application/msword' });
    //           window.navigator.msSaveOrOpenBlob(file, res.fileName);
    //         }
    //         else {
    //           file = new Blob([byteArray], { type: 'application/pdf' });
    //           window.navigator.msSaveOrOpenBlob(file, res.fileName);
    //         }

    //       }
    //       else {
    //         var link = document.createElement('a');
    //         if (res.fileName.includes(".doc") || res.fileName.includes(".docx")) {
    //           link.href = "data:" + "application/msword" + ";base64," + res.fileContent;
    //         }
    //         else {
    //           link.href = "data:" + "application/pdf" + ";base64," + res.fileContent;
    //         }
    //         link.setAttribute('download', res.fileName);
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);
    //       }


    //     },
    //       error => { 
    //         this.loading = false;
    //         console.log(error) });

    // }
  }

  valueChanged() {
    this.showForm = false;
    this.showSave = true;
    this.showEdit = false;
  }

  showLeft() {
    this.router.navigate(['locality/tab/assessment']);
  }



  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    //console.log(this.myForm);
    // console.log(this.myForm.dirty);
    //if (this.myForm.classList[3] === 'ng-touched' || this.myForm.nativeElement.classList[3] === 'ng-dirty') {
    if (this.givenfile) {
      //return this.dialogService.confirm('Discard changes for Budget?');
      //const modal=this.modalService.open(this.content1, ngbModalOptions);

      return this.confirm1('Do you want to save changes?', 'for attachments', 'YES', 'NO');


    }

    return true;

  }




  confirm1(title = 'Are you sure?', text, confirmButtonText, cancelButtonText, showCancelButton = true) {
    return new Promise<boolean>((resolve, reject) => {
      swal({
        title: title,
        text: text,
        type: 'warning',
        showCancelButton: showCancelButton,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        allowOutsideClick: false
      }).then((result) => {
        if (result.value !== undefined && result.value) {
          this.saveAttachments();
          resolve(false);
        }
        else {
          resolve(true);
        }
      }, error => reject(error));
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

  @HostListener('window:onbeforeunload', ['$event'])
  onBeforeUnload() {
    Cookie.delete('access_token');
    localStorage.clear();
  }



}
