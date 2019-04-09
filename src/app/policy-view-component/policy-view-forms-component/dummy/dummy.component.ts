import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { UtilService } from 'app/util.service';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css']
})
export class DummyComponent implements OnInit {
  public previousUrl: string;
  public policyFamilyID:any;
  constructor(private router: Router, private route: ActivatedRoute) {
   
      //this.router.navigate(['policyView/policyDetails']);
      this.route.params.subscribe(params => {
        this.policyFamilyID = params['id'];
        this.router.navigate(['spolicy/scontrol/'+this.policyFamilyID]);
      });
    
  }

  ngOnInit() {
  }

}
