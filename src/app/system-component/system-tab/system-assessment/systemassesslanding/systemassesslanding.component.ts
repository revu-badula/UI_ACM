import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-systemassesslanding',
  templateUrl: './systemassesslanding.component.html',
  styleUrls: ['./systemassesslanding.component.css']
})
export class SystemassesslandingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goToAudit() {
    this.router.navigate(['/system/tab2/assessment/sysassessoverview']);
  }

}
