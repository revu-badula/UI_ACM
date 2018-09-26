import { ApiserviceService } from '../../apiservice.service';
import { Component, OnInit } from '@angular/core';
import { FilterPipe } from '../../convertDate.pipe';
@Component({
  selector: 'app-solution-table',
  templateUrl: './solution-table.component.html',
  styleUrls: ['./solution-table.component.css'],
  providers: [ApiserviceService]
})
export class SolutionTableComponent implements OnInit {
  public solutions: any;
  public desc: boolean = false;
  public loading: boolean = false;
  public p: number = 1;

  constructor(private _apiservice: ApiserviceService) { }

  ngOnInit() {
    this.getSolutions();
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

}
