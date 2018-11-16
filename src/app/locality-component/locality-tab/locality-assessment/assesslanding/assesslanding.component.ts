import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assesslanding',
  templateUrl: './assesslanding.component.html',
  styleUrls: ['./assesslanding.component.css']
})
export class AssesslandingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goToAudit() {
    this.router.navigate(['/locality/tab/assessment/assessmentOverview']);
  }

}
