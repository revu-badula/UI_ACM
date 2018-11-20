import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-systemauditlanding',
  templateUrl: './systemauditlanding.component.html',
  styleUrls: ['./systemauditlanding.component.css']
})
export class SystemauditlandingComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  goToAudit()
  {
    this.router.navigate(['/system/tab2/Audit/sysauditoverview']);
  }

}
