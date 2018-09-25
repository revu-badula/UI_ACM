import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { MOUDocDTO, Mou } from '../../../../data_model_legal';
import { ApiserviceService } from '../../../../apiservice.service';
import { APP_CONFIG } from '../../../../app.config';
import { IMyDate, IMyDpOptions } from 'mydatepicker';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../../../../util.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { FormsModule, NgForm, FormGroup } from '@angular/forms';
declare var swal: any; '';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-legalform',
  templateUrl: './system-legalform.component.html',
  styleUrls: ['./system-legalform.component.css']
})
export class SystemLegalformComponent implements OnInit {
  @ViewChild('fileInput') inputEl: ElementRef;
  @ViewChild('myForm') myForm: FormGroup;
  @ViewChild('content') content:TemplateRef<any>;

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'mm/dd/yyyy'
  };
  public appId: any;
  mou: Mou;
  mouDocDTO: MOUDocDTO;
  appMOUs: Mou;
  public files = [] as File[];
  public info:any;
  public moureceiptdt: any;
  public mrcdt: any;
  public mrdt: any;
  public mouId: any;
  public showButton:boolean = false;
  public mourecertdt: any;
  public acronym: any;
  public updatedTime: any;
  public showLegal: boolean = false;
  public showSigned: boolean = false;
  public certify: any;
  public recipt: any;
  public loading: boolean = false;
  public showLegalBox: boolean = true;
  public moudtos: any;
  constructor(private _apiservice: ApiserviceService,
    private http: Http, private modalService: NgbModal, private utilservice: UtilService,
    private router: Router) {
    this.mou = new Mou();
    this.getAppId();
  }

  ngOnInit() {
  }


  getAppId() {
    this.loading = true;
    this._apiservice.viewApplication(localStorage.getItem('systemName'))
      .subscribe((data: any) => {
        this.loading = false;
        this.acronym = data.applicationViewDTO.acronym;
        this.moudtos = data.applicationViewDTO.moudtos;
        let d = new Date(data.applicationViewDTO.updatedTime);
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        this.updatedTime = month + "/" + day + "/" + year;
        this.appId = data.applicationViewDTO.applicationId;
        this.mou.applicationID = data.applicationViewDTO.applicationId;
        this.showPageOnLoad();
      }, error => {
        this.loading = false;
        console.log(error);
      });
  }

  showPageOnLoad() {
    if (localStorage.getItem('systemMouId') === null) {
      this.showLegalBox = false;
    }
    else {
      //this.getAppMOUs(data.applicationViewDTO.applicationId);
      let id = localStorage.getItem('systemMouId');
      let appMouid = +id;
      let moudata = this.moudtos.filter(item => item.mouId === appMouid);
      for (let i = 0; i < moudata.length; i++) {
        this.getAppMOU(moudata[i]);
      }
      this.showButton=true;
    }
  }

  saveMOU() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false
      };
    let inputEl: HTMLInputElement = this.inputEl.nativeElement;
    var formData = new FormData();
    this.mou.applicationID = this.appId;
    this.loading = true;
    if (this.mou.mouId === undefined) {
      //formData.append('attachments', inputEl.files.item(0));
      this.mou.createdBy=Cookie.get('userName');
      for (let i = 0; i < this.files.length; i++) {
        formData.append('attachments', this.files[i]);

      }
      formData.append('mou', JSON.stringify(this.mou));
      let url_update = APP_CONFIG.saveMOU;
      this.http.post(url_update, formData).subscribe((data: any) => {
        this.loading = false;
        this.info="Legal has been Created";
        this.modalService.open(this.content,ngbModalOptions);


      }, error => {
        this.loading = false;
        console.log(error);
      });

    }
    else {
      //formData.append('attachments', inputEl.files.item(0));
      this.mou.updatedBy=Cookie.get('userName');
      for (let i = 0; i < this.files.length; i++) {
        formData.append('attachments', this.files[i]);

      }
      formData.append('mou', JSON.stringify(this.mou));
      let url_update = APP_CONFIG.updateMOU;
      this.http.post(url_update, formData).subscribe((data: any) => {
        this.loading = false;
        this.info="Legal has been updated";
        this.modalService.open(this.content,ngbModalOptions);
      }, error => {
        this.loading = false;
        console.log(error);
      });
    }
  }

  getAppMOUs(id) {

    this._apiservice.getAppMOUs(id)
      .subscribe((data: any) => {
        let id = localStorage.getItem('systemMouId');
        let appMouid = +id;
        let moudata = data.filter(item => item.mouId === appMouid);
        for (let i = 0; i < moudata.length; i++) {
          this.getAppMOU(moudata[i]);
        }
      }, error => console.log(error));
  }



  createMOUDTO(fileInput: any) {
    let files = fileInput.target.files[0];
    if (files === undefined) { }
    else {
      if (this.mou.mouDocDTOs === null) {
        this.mou.mouDocDTOs = [];
        this.mouDocDTO = new MOUDocDTO();
        this.mouDocDTO.fileName = fileInput.target.files[0].name;
        this.mouDocDTO.status = true;
        this.mouDocDTO.newFile = true;
        this.files.push(fileInput.target.files[0]);
        this.mou.mouDocDTOs.push(this.mouDocDTO);
      }
      else {
        this.mouDocDTO = new MOUDocDTO();
        this.mouDocDTO.fileName = fileInput.target.files[0].name;
        this.mouDocDTO.status = true;
        this.mouDocDTO.newFile = true;
        this.files.push(fileInput.target.files[0]);
        this.mou.mouDocDTOs.push(this.mouDocDTO);


      }
    }
  }



  getAppMOU(appsolution) {
    this.certify = appsolution.recertificationDt;
    let dt = new Date(this.certify);

    let year2 = dt.getFullYear();
    let month2 = dt.getMonth() + 1;
    let day2 = dt.getDate();

    this.recipt = appsolution.receiptDt;
    let moudrt = new Date(this.recipt);

    let year1 = moudrt.getFullYear();
    let month1 = moudrt.getMonth() + 1;
    let day1 = moudrt.getDate();
    this.mou.name = appsolution.name;
    this.mou.signed = appsolution.signed;
    this.mou.recertificationDt = this.certify;

    this.mou.receiptDt = this.recipt;//when not changed

    this.mourecertdt = { date: { year: year2, month: month2, day: day2 } };
    this.moureceiptdt = { date: { year: year1, month: month1, day: day1 } };
    this.mou.mouId = appsolution.mouId;
    this.mou.mouDocDTOs = appsolution.mouDocDTOs;


  }

  getDate(value) {
    this.mou.receiptDt = Date.parse(value.formatted);


  }

  getNextDate(value) {
    this.mou.recertificationDt = Date.parse(value.formatted);
  }
  getFile(id) {
    window.open(APP_CONFIG.getMOUFile + '?' + 'mouDocId' + '=' + id)
  }
  deleteFile(id, index) {
    this.confirm('Are You Sure?', 'delete the file', 'YES', 'NO')
      .then((result: any) => {
        if (result.value !== undefined && result.value) {
          if (id === undefined) {
            let length = this.mou.mouDocDTOs.length;
            if (length === 1) {
              this.mou.mouDocDTOs = [];
            }
            else {
              for (let i = index; i < length; i++) {
                this.mou.mouDocDTOs[i] = this.mou.mouDocDTOs[i + 1];
              }
              this.mou.mouDocDTOs.splice(length - 1, 1);
            }

          }
          else {
            for (let i = 0; i < this.mou.mouDocDTOs.length; i++) {
              if (this.mou.mouDocDTOs[i].mouDocId === id) {
                this.mou.mouDocDTOs[i].status = false;
              }
            }
          }
        }
      }, error => {
        console.log(error);
      });

  }

  editClick() {
    this.showLegalBox = false;
  }

  goBack() {
    this.router.navigate(['/system/tab2/legal']);
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

  redirect()
 {
  this.router.navigate(['/system/tab2/legal']);
 }




}
