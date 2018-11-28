import { ApiserviceService } from '../../apiservice.service';
import { Component, OnInit } from '@angular/core';
import { FilterPipe } from '../../convertDate.pipe';
import { Router } from '@angular/router';
@Component({
  selector: 'app-solution-table',
  templateUrl: './solution-table.component.html',
  styleUrls: ['./solution-table.component.css'],
  providers: [ApiserviceService]
})
export class SolutionTableComponent implements OnInit {
  public solutions: any;
  public desc: boolean = false;
  public des: boolean = false;
  public signed:boolean=false;
  public rendt:boolean=false;
  public updt:boolean=false;
  public updtBy:boolean=false;
  public dec: boolean = false;
  public de: boolean = false;
  public loading: boolean = false;
  public p: number = 1;

  constructor(private _apiservice: ApiserviceService, private router:Router) { }

  ngOnInit() {
    this.getSolutions();
  }

  goTo(id)
  {
    //let url="/editSolutions/{{ solution.solutionId }}" 
    this.router.navigateByUrl("/editSolutions/"+id);
  }

  getSolutions() {
    this.loading=true;
    this._apiservice.getSolutions()
      .subscribe((data: any) => {
        this.loading = false;
        this.solutions = data.solutionsDTOs;
        

      }, error => {
        this.loading=false;
        console.log(error);
      });
  }

  handleSort() {

    if (!this.desc) {
      this.solutions.sort(this.doAsc);
      this.desc = true;
    }
    else {
      this.solutions.sort(this.doDsc);
      this.desc = false;
    }

  }

  doAsc(a, b) {

    if (a.name > b.name) {
      return -1;
    } else if (a.name < b.name) {
      return 1;
    }
    return 0;
  }

  doDsc(a, b) {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    }
    return 0;
  }


handleSorta() {

    if (!this.des) {
      this.solutions.sort(this.doAs);
      this.des = true;
    }
    else {
      this.solutions.sort(this.doDs);
      this.des = false;
    }

  }

  doAs(a, b) {

    if (a.vendor.name > b.vendor.name) {
      return -1;
    } else if (a.vendor.name < b.vendor.name) {
      return 1;
    }
    return 0;
  }

  doDs(a, b) {
    if (a.vendor.name < b.vendor.name) {
      return -1;
    } else if (a.vendor.name > b.vendor.name) {
      return 1;
    }
    return 0;
  }
  
  
  
  
  handleSortb() {

    if (!this.dec) {
      this.solutions.sort(this.doA);
      this.dec = true;
    }
    else {
      this.solutions.sort(this.doD);
      this.dec = false;
    }

  }

  doA(a, b) {

    if (a.solutionTypeName > b.solutionTypeName) {
      return -1;
    } else if (a.solutionTypeName < b.solutionTypeName) {
      return 1;
    }
    return 0;
  }

  doD(a, b) {
    if (a.solutionTypeName < b.solutionTypeName) {
      return -1;
    } else if (a.solutionTypeName > b.solutionTypeName) {
      return 1;
    }
    return 0;
  }
  
  
  
  handleSortc() {

    if (!this.de) {
      this.solutions.sort(this.doAc);
      this.de = true;
    }
    else {
      this.solutions.sort(this.doDc);
      this.de = false;
    }

  }

  doAc(a, b) {

    if (a.systemTypeDTO.name > b.systemTypeDTO.name) {
      return -1;
    } else if (a.systemTypeDTO.name < b.systemTypeDTO.name) {
      return 1;
    }
    return 0;
  }

  doDc(a, b) {
    if (a.systemTypeDTO.name < b.systemTypeDTO.name) {
      return -1;
    } else if (a.systemTypeDTO.name > b.systemTypeDTO.name) {
      return 1;
    }
    return 0;
  }

  

  handleSort1(value) {
  
    if (!this.signed) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.solutions.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.signed = true;
    }
    else {
      let orderByValue = value;
      this.solutions.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.signed = false;
    }


  }


  
  handleSort2(value) {
  
    if (!this.rendt) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.solutions.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.rendt = true;
    }
    else {
      let orderByValue = value;
      this.solutions.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.rendt = false;
    }


  }





  handleSort3(value) {
  
    if (!this.updtBy) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.solutions.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.updtBy = true;
    }
    else {
      let orderByValue = value;
      this.solutions.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.updtBy = false;
    }


  }


  
  handleSort4(value) {
  
    if (!this.updt) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.solutions.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.updt = true;
    }
    else {
      let orderByValue = value;
      this.solutions.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.updt = false;
    }


  }

  
  
  
  
  
  
  
  
  























}
