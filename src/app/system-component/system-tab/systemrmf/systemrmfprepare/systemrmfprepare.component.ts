import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from 'app/app.config';
@Component({
  selector: 'app-systemrmfprepare',
  templateUrl: './systemrmfprepare.component.html',
  styleUrls: ['./systemrmfprepare.component.css']
})
export class SystemrmfprepareComponent implements OnInit {

  public rmfProcessID:any;
  public loading: boolean = false;
  public outcomes:any;
  public purpose:any;
  public name:any;
  public col1:any;
  public col2:any;
  public col3:any;
  public col4:any;
  public col5:any;
  public col6:any;
  public openCount:any;
  public closeCount:any;
  constructor(private router: Router, private httpClient: HttpClient,private route: ActivatedRoute) { 
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.route.params.subscribe(params => {
      this.rmfProcessID = params['id'];
      this.getData();
    });
  }

  ngOnInit() {
  }

  getData() {
    this.loading = true;
    let url = APP_CONFIG.getAppRMFDetailsonProcess;
    this.httpClient.get(url+"?"+"rmfProcessId="+this.rmfProcessID+"&rmfAppId="+sessionStorage.getItem('systemRmfId'))
      .subscribe((data: any) => {
        this.loading = false;
        this.purpose=data.purpose;
        this.name=data.name;
        this.outcomes=data.rmfApplicationDetailDTOs;
      }, error => {
        this.loading = false;
        console.log(error);
      })
  }

  goTo(id:any)
  {
    this.router.navigate(['system/tab2/rmf/tabrmf/rmftask/'+id]);
  }
  handleSort1(value:any) {

    if (!this.col1) {
      let orderByValue = value;
      this.outcomes.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.col1 = true;
    }
    else {
      let orderByValue = value;
      this.outcomes.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.col1 = false;
    }
}


handleSort2(value:any) {

  if (!this.col2) {
    let orderByValue = value;
    this.outcomes.sort((a: any, b: any) => {
      if (a[orderByValue] > b[orderByValue]) {
        return -1;
      } else if (a[orderByValue] < b[orderByValue]) {
        return 1;
      } else {
        return 0;
      }
    });
    this.col2 = true;
  }
  else {
    let orderByValue = value;
    this.outcomes.sort((a: any, b: any) => {
      if (a[orderByValue] < b[orderByValue]) {
        return -1;
      } else if (a[orderByValue] > b[orderByValue]) {
        return 1;
      } else {
        return 0;
      }
    });
    this.col2 = false;
  }


}

handleSort3(value:any) {

  if (!this.col3) {
    let orderByValue = value;
    this.outcomes.sort((a: any, b: any) => {
      if (a[orderByValue] > b[orderByValue]) {
        return -1;
      } else if (a[orderByValue] < b[orderByValue]) {
        return 1;
      } else {
        return 0;
      }
    });
    this.col3 = true;
  }
  else {
    let orderByValue = value;
    this.outcomes.sort((a: any, b: any) => {
      if (a[orderByValue] < b[orderByValue]) {
        return -1;
      } else if (a[orderByValue] > b[orderByValue]) {
        return 1;
      } else {
        return 0;
      }
    });
    this.col3 = false;
  }


}


handleSort4(value:any) {

  if (!this.col4) {
    let orderByValue = value;
    this.outcomes.sort((a: any, b: any) => {
      if (a[orderByValue] > b[orderByValue]) {
        return -1;
      } else if (a[orderByValue] < b[orderByValue]) {
        return 1;
      } else {
        return 0;
      }
    });
    this.col4 = true;
  }
  else {
    let orderByValue = value;
    this.outcomes.sort((a: any, b: any) => {
      if (a[orderByValue] < b[orderByValue]) {
        return -1;
      } else if (a[orderByValue] > b[orderByValue]) {
        return 1;
      } else {
        return 0;
      }
    });
    this.col4 = false;
  }


}

handleSort5(value:any) {

  if (!this.col5) {
    let orderByValue = value;
    this.outcomes.sort((a: any, b: any) => {
      if (a[orderByValue] > b[orderByValue]) {
        return -1;
      } else if (a[orderByValue] < b[orderByValue]) {
        return 1;
      } else {
        return 0;
      }
    });
    this.col5 = true;
  }
  else {
    let orderByValue = value;
    this.outcomes.sort((a: any, b: any) => {
      if (a[orderByValue] < b[orderByValue]) {
        return -1;
      } else if (a[orderByValue] > b[orderByValue]) {
        return 1;
      } else {
        return 0;
      }
    });
    this.col5 = false;
  }


}

handleSort6(value:any) {

  if (!this.col6) {
    let orderByValue = value;
    this.outcomes.sort((a: any, b: any) => {
      if (a[orderByValue] > b[orderByValue]) {
        return -1;
      } else if (a[orderByValue] < b[orderByValue]) {
        return 1;
      } else {
        return 0;
      }
    });
    this.col6 = true;
  }
  else {
    let orderByValue = value;
    this.outcomes.sort((a: any, b: any) => {
      if (a[orderByValue] < b[orderByValue]) {
        return -1;
      } else if (a[orderByValue] > b[orderByValue]) {
        return 1;
      } else {
        return 0;
      }
    });
    this.col6 = false;
  }


}

}
