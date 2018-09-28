import { Component, OnInit, ViewChild, ElementRef, TemplateRef, } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApiserviceService } from '../../apiservice.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../../util.service';
@Component({
  selector: 'app-system-add-component',
  templateUrl: './system-add-component.component.html',
  styleUrls: ['./system-add-component.component.css'],
  providers: [ApiserviceService]
})
export class SystemAddComponentComponent implements OnInit {

  public showForm: string;
  public titus: string;
  public system: any;
  public acronyms: any;
  public businessOwners: any;
  public systemOwners: any;
  public loading: boolean = false;
  public desc:boolean=false;
  public businessOwner:boolean=false;
  public systemOwner:boolean=false;
  @ViewChild('content') content: TemplateRef<any>;
  constructor(private router: Router, private _apiservice: ApiserviceService, private modalService: NgbModal, private utilService: UtilService) {
    localStorage.removeItem('systemName');
    localStorage.removeItem('systemActive');

  }

  ngOnInit() {

    this.getAppAcronyms();
    this.getBusinessOwners();
    this.getSystemOwners();
  }

  //   selectLocal(system){
  //   if(system === 'Choose...'){

  //   }
  //   else{
  //   this.system = system;
  //   let ngbModalOptions: NgbModalOptions = {
  // 	      backdrop : 'static',
  // 	      keyboard : false
  // 	      };
  //     this._apiservice.viewApplication(system)
  //       .subscribe((data: any) => {
  //       console.log(data);
  //       if(data.applicationViewDTO === null){
  //         this.modalService.open(this.content, ngbModalOptions);
  //       }
  //       else{
  //       this.router.navigate(['/system/tab/info/' + system]);

  //       }},error => {console.log(error);});
  //       }


  // }



  // redirect(condition) {

  //   if (condition === 'yes') {
  //     this.router.navigate(['/system/tab2/info/' + this.system]);
  //   }

  //   else {

  //     this.router.navigate(['/system/map']);

  //   }

  // }

  // fetchSystem(system) {
  //   this.system = system;
  //   let ngbModalOptions: NgbModalOptions = {
  //     backdrop: 'static',
  //     keyboard: false
  //   };
  //   this._apiservice.viewApplication(system)
  //     .subscribe((data: any) => {
  //       console.log(data);
  //       if (data.applicationViewDTO === null) {
  //         this.modalService.open(this.content, ngbModalOptions);
  //       }
  //       else {
  //         this.router.navigate(['/system/tab2/info/' + system]);

  //       }
  //     }, error => { console.log(error); });
  // }


  getAppAcronyms() {
    this.loading=true;
    this._apiservice.getAppAcronyms()
      .subscribe((data: any) => {
        this.acronyms = data;
        this.loading=false;
      }, error => {
        this.loading=false;
        console.log(error); });

  }

  getBusinessOwners() {
    this.loading=true;
    this._apiservice.getBusinessOwner()
      .subscribe((data: any) => {
        this.loading=false;
        this.businessOwners = data;

      }, error => { 
        this.loading=false;
        console.log(error); });

  }


  getSystemOwners() {
    this.loading=true;
    this._apiservice.getSystemAdministrator()
      .subscribe((data: any) => {
        this.loading=false;
        this.systemOwners = data;

      }, error => { 
        this.loading=false;
        console.log(error); });

  }

  viewApplication(system) {
    localStorage.setItem('systemName', system);
    this.router.navigate(['/system/tab2/info']);
  }

  createSystem()
  {
    this.router.navigate(['/system/tab2/info']);
  }


  handleSort(value) {
    if (!this.desc) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.acronyms.sort((a: any, b: any) => {
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
      this.acronyms.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.desc = false;
    }


  }

  handleSort1(value) {
    if (!this.businessOwner) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.businessOwners.sort((a: any, b: any) => {
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
      this.businessOwners.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.businessOwner = false;
    }


  }



  handleSort2(value) {
    if (!this.systemOwner) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.systemOwners.sort((a: any, b: any) => {
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
      this.systemOwners.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.systemOwner = false;
    }


  }


  
}
