import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../../../../app.config';
import { Router } from '@angular/router';
import { RMFApplicationDTO } from '../../../../review_DataModel';
import { DialogService } from '../../../../dialog.service';
import { Cookie } from 'ng2-cookies';
import { AppAuditFileDTO } from '../../../../data.model.auditDTO';

@Component({
  selector: 'app-systemrmfattachments',
  templateUrl: './systemrmfattachments.component.html',
  styleUrls: ['./systemrmfattachments.component.css']
})
export class SystemrmfattachmentsComponent implements OnInit {

  public loading: boolean;
  public showEdit: boolean=true;
  public rmfApplicationDTO: RMFApplicationDTO;
  appAuditFileDTO: AppAuditFileDTO;
  public givenfile: boolean = false;
  @ViewChild('fileInput') inputEl: ElementRef;

  constructor(private httpClient: HttpClient, private router: Router,
    private dialog: DialogService) {
      this.rmfApplicationDTO = new RMFApplicationDTO();

     }

  ngOnInit() {
    this.getAppId();
  }

  getAppId() {
    this.loading = true;
    let url = APP_CONFIG.viewApplication;
    this.httpClient.get(url + "?" + "acronym=" + sessionStorage.getItem('systemName')
    ).subscribe((data: any) => {
      this.loading = false;
      this.rmfApplicationDTO.applicationId = data.applicationViewDTO.applicationId;
      this.showOnPageLoad();
    }, error => {
      this.loading = false;
      console.log(error);
    });

  }

  showRmf() {
    this.router.navigate(['/system/tab2/rmf']);
  }
  valueChanged() {
    this.showEdit = false;
  }

  showOnPageLoad() {

    this.loading = true;
    let id = sessionStorage.getItem('systemRmfId');
    let rmfid = +id;
    let url = APP_CONFIG.getAppRMF;
   
      this.httpClient.get(url + "?" + "rmfAppId=" + rmfid)
      .subscribe((data: any) => {
      this.loading = false;
      this.rmfApplicationDTO = data
     
      


    }, error => {
      this.loading = false;
      console.log(error);
    });

  }


  saveRmf() {
    this.loading = true;
    let url = APP_CONFIG.updateAppRMF;
    this.rmfApplicationDTO.updatedBy = Cookie.get('userName');
    this.httpClient.post(url, this.rmfApplicationDTO)
      .subscribe((data: any) => {
        this.loading = false;
        this.dialog.open("Info", "Rmf has been updated.", false, "OK", "OK")
          .then((result: any) => {
            if (result) {

            }
          }, error => {
            console.log(error);
          })
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
      if (this.rmfApplicationDTO.appAuditFileDTOs === undefined || this.rmfApplicationDTO.appAuditFileDTOs === null) {
        this.givenfile = true;
        this.rmfApplicationDTO.appAuditFileDTOs = [];
        this.appAuditFileDTO = new AppAuditFileDTO();
        this.appAuditFileDTO.fileName = fileInput.target.files[0].name;
        this.appAuditFileDTO.status = true;
        this.getFileContent(fileInput.target.files[0])
          .then(
            data =>
              this.appAuditFileDTO.fileContent = data);
        this.rmfApplicationDTO.appAuditFileDTOs.push(this.appAuditFileDTO);
        this.inputEl.nativeElement.value = "";
      }
      else {
        this.givenfile = true;
        this.appAuditFileDTO = new AppAuditFileDTO();
        this.appAuditFileDTO.fileName = fileInput.target.files[0].name;
        this.appAuditFileDTO.status = true;
        this.getFileContent(fileInput.target.files[0])
          .then(
            data =>
              this.appAuditFileDTO.fileContent = data);
        this.rmfApplicationDTO.appAuditFileDTOs.push(this.appAuditFileDTO);
        this.inputEl.nativeElement.value = "";

      }
    }

  }

  deleteFile(id:any, index:any) {
    this.dialog.open("Info", " Do you want to delete the file?", true, "Yes", "No")
      .then((result: any) => {
        if (result) {
          if (id === undefined) {
            let length = this.rmfApplicationDTO.appAuditFileDTOs.length;
            if (length === 1) {
              this.givenfile = false;
              this.rmfApplicationDTO.appAuditFileDTOs = [];
            }
            else {
              this.givenfile = false;
              for (let i = index; i < length; i++) {
                this.rmfApplicationDTO.appAuditFileDTOs[i] = this.rmfApplicationDTO.appAuditFileDTOs[i + 1];
              }
              this.rmfApplicationDTO.appAuditFileDTOs.splice(length - 1, 1);
            }

          }
          else {
            this.givenfile = true;
            for (let i = 0; i < this.rmfApplicationDTO.appAuditFileDTOs.length; i++) {
              if (this.rmfApplicationDTO.appAuditFileDTOs[i].appAuditFileId === id) {
                this.rmfApplicationDTO.appAuditFileDTOs[i].status = false;
                this.saveRmf();
              }
            }
          }
        }
      }, error => {
        console.log(error);
      });



  }

  getFileContent(file:any) {
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



}
