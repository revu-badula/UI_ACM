import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-audit-landing',
  templateUrl: './audit-landing.component.html',
  styleUrls: ['./audit-landing.component.css']
})
export class AuditLandingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToAudit()
  {
    this.router.navigate(['/locality/tab/Audit/auditOverview']);
  }

}
