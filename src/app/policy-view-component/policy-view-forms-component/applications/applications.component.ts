import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../../apiservice.service';
import { Router} from '@angular/router';
import { UtilService } from 'app/util.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css'],
   providers: [ApiserviceService]
})
export class ApplicationsComponent implements OnInit {
   public loading: boolean = false;
  pendingApplications:any;
  public showPagination:boolean=true;
  public p: number = 1;
  public desc: boolean = false;
  public businessOwner: boolean = false;
  public systemOwner: boolean = false;

  constructor(private _apiservice: ApiserviceService,private router: Router,private utilService: UtilService) { 
    sessionStorage.removeItem("systemName");
    sessionStorage.removeItem("localityName");
  }

  ngOnInit() {
     this.getPendingApplications();
  }

  
  viewApplication(system:any,id:any) {
  
    if(id === 1)
    {
      sessionStorage.setItem('localityName', system);
      this.router.navigate(['/locality/tab/info']);
    }
    else{
      sessionStorage.setItem('systemName', system);
    this.router.navigate(['/system/tab2/info']);
    }
  }
  
  
   getPendingApplications() {
    // this.loading = true;
    // this._apiservice.getPendingApplications()
    //   .subscribe((data: any) => {
    //     this.loading = false;
    //     if (data.length === 0) {
    //       this.pendingApplications = [];
    //       this.showPagination = false;
    //     }
    //     else {
    //       this.pendingApplications = data;
    //     }
    //   }, error => {
    //     this.loading = false;
    //     console.log(error);
    //   });

    this.loading=true;
    this._apiservice.fetchPolicies(+sessionStorage.getItem("policyGrpId"))
      .subscribe((data: any) => {
        this.loading = false;
        this.pendingApplications = data.applicationDTOs;
      },error => {
        this.loading = false;
        console.log(error);
      });

  }
  
  
  
   handleSort(value) {
    if (!this.desc) {

      let orderByValue = value;
      this.pendingApplications.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.desc = true;
    }
    else {
      let orderByValue = value;
      this.pendingApplications.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.desc = false;
    }


  }

  handleSort1(value) {
    if (!this.businessOwner) {
      let orderByValue = value;
      this.pendingApplications.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.businessOwner = true;
    }
    else {
      let orderByValue = value;
      this.pendingApplications.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.businessOwner = false;
    }


  }



  handleSort2(value) {
    if (!this.systemOwner) {

      let orderByValue = value;
      this.pendingApplications.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.systemOwner = true;
    }
    else {
      let orderByValue = value;
      this.pendingApplications.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.systemOwner = false;
    }


  }
  
  
  
  
  
  
}
