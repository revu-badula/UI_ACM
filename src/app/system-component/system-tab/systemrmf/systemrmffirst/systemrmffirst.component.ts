import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../../../../app.config';
import { Router } from '@angular/router';
import { RMFApplicationDTO } from '../../../../review_DataModel';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { IMyDpOptions } from 'mydatepicker';
import { Observable } from 'rxjs';
import { DialogService } from '../../../../dialog.service';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-systemrmffirst',
  templateUrl: './systemrmffirst.component.html',
  styleUrls: ['./systemrmffirst.component.css']
})
export class SystemrmffirstComponent implements OnInit {
  @ViewChild('myForm') myForm: FormGroup;
  public loading: boolean;
  public RMF: any;
  public rmfSrcId: any;
  public RMFGroup: any;
  public rmfGrpId: any;
  public name: any;
  public nextReviewDate: any;
  public reviewDate: any;
  public showEdit:boolean=true;
  public showCreate:boolean=true;
  myDatePickerOptions: IMyDpOptions = {
    disableUntil: { year: 0, month: 0, day: 0 },
    showTodayBtn: false

  };
  public rmfApplicationDTO: RMFApplicationDTO;
  constructor(private httpClient: HttpClient, private router: Router,
    private datepipe: DatePipe, private dialog: DialogService) {
    this.rmfApplicationDTO = new RMFApplicationDTO();
  }

  ngOnInit() {
    //this.getDropdown();
    this.getAppId();
  }


  getAppId() {
    this.loading = true;
    let url = APP_CONFIG.viewApplication;
    let url1 = APP_CONFIG.getRMFSrc;
    Observable.forkJoin(
      this.httpClient.get(url + "?" + "acronym=" + sessionStorage.getItem('systemName')),
      this.httpClient.get(url1)
    ).subscribe((data: any) => {
      this.loading = false;
      this.rmfApplicationDTO.applicationId = data[0].applicationViewDTO.applicationId;
      this.RMF = data[1];
      this.showOnPageLoad();

    }, error => {
      this.loading = false;
      console.log(error);
    });

  }

  getDropdown() {

    let url = APP_CONFIG.getRMFSrc;
    this.loading = true;
    this.httpClient.get(url)
      .subscribe((data: any) => {
        this.loading = false;
        this.RMF = data;
      }, error => {
        this.loading = false;
        console.log(error);
      })
  }

  selectDefinitive(value: any) {
    if (value === "") {
      this.RMFGroup = [];
    }
    else {
      let url = APP_CONFIG.getRMFGrps;
      this.loading = true;
      this.httpClient.get(url + "?" + "rmfSrcId=" + value)
        .subscribe((data: any) => {
          this.loading = false;
          this.RMFGroup = data;
        }, error => {
          this.loading = false;
          console.log(error);
        })
    }
  }
  showRmf()
  {
    this.router.navigate(['/system/tab2/rmf']);
  }
  valueChanged()
  {
    this.showEdit=false;
  }

  selectType(value: any) {
    if (value === "") {
      this.rmfApplicationDTO.rmfGrpId = null;
    }
    else {
      this.rmfApplicationDTO.rmfGrpId = +value;

    }
  }

  showOnPageLoad() {
    if (sessionStorage.getItem('systemRmfId') === null) {
      this.myForm.controls['nextReviewDate'].disable();
      this.showEdit=false;
    }
    else {
      this.loading = true;
      let id = sessionStorage.getItem('systemRmfId');
      let rmfid = +id;
      let url = APP_CONFIG.getAppRMF;
      sessionStorage.setItem("rmfActive","true")
      this.httpClient.get(url + "?" + "rmfAppId=" + rmfid)
        .subscribe((data: any) => {
          this.loading = false;
          this.rmfApplicationDTO = data;
          this.showCreate=false;
          let d = new Date(this.rmfApplicationDTO.reviewDate);
          let day = d.getDate();
          let month = d.getMonth() + 1;
          let year = d.getFullYear();
          this.reviewDate = { date: { year: year, month: month, day: day } };
          let d1 = new Date(this.rmfApplicationDTO.nextReviewDate);
          let day1 = d1.getDate();
          let month1 = d1.getMonth() + 1;
          let year1 = d1.getFullYear();
          this.nextReviewDate = { date: { year: year1, month: month1, day: day1 } };
          this.myDatePickerOptions.disableUntil.day = day;
          this.myDatePickerOptions.disableUntil.month = month;
          this.myDatePickerOptions.disableUntil.year = year;
          this.myDatePickerOptions.showTodayBtn = false;
        }, error => {
          this.loading = false;
          console.log(error);
        });

    }
  }

  getReviewDate(value: any) {
    this.myForm.controls['nextReviewDate'].disable();
    this.nextReviewDate = null;
    if (value.formatted === "") {

    }
    else {
      this.nextReviewDate = null;
      let latest_date = this.datepipe.transform(value.formatted, 'yyyy-MM-dd');
      this.rmfApplicationDTO.reviewDate = moment(latest_date).format();
      let d = new Date(value.formatted);
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate();
      this.myDatePickerOptions.disableUntil.day = day;
      this.myDatePickerOptions.disableUntil.month = month;
      this.myDatePickerOptions.disableUntil.year = year;
      this.myDatePickerOptions.showTodayBtn = false;

      this.myForm.controls['nextReviewDate'].enable();


    }
  }
  getNextReviewDate(value: any) {

    if (value.formatted === "") {
      this.rmfApplicationDTO.nextReviewDate = null;
    }
    else {

      let latest_date = this.datepipe.transform(value.formatted, 'yyyy-MM-dd');
      this.rmfApplicationDTO.nextReviewDate = moment(latest_date).format();

    }

  }

  saveRmf() {
    if (this.rmfApplicationDTO.rmfAppId === undefined) {
      this.loading = true;
      let url = APP_CONFIG.createAppRMF;
      this.rmfApplicationDTO.createdBy=Cookie.get('userName');
      this.httpClient.post(url, this.rmfApplicationDTO)
        .subscribe((data: any) => {
          this.loading = false;
          this.dialog.open("Info", "Rmf has been created.", false, "OK", "OK")
            .then((result: any) => {
              if (result) {
                this.router.navigate(['/system/tab2/rmf']);
              }
            }, error => {
              console.log(error);
            })
        }, error => {
          this.loading = false;
          console.log(error);
        });
    }
    else {

        this.loading = true;
        let url = APP_CONFIG.updateAppRMF;
        this.rmfApplicationDTO.updBy=Cookie.get('userName');
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
  }




}
