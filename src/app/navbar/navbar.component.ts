import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
  { path: '/dashboard', title: 'Localities',  icon:'person', class: '' },
  { path: '/dashboard', title: 'Certified Vendors',  icon:'content_paste', class: '' },
  { path: '/dashboard', title: 'Certified Solutions',  icon:'library_books', class: '' },
  { path: '/dashboard', title: 'Audit',  icon:'bubble_chart', class: '' },
  { path: '/dashboard', title: 'Assessmemt',  icon:'location_on', class: '' },
  { path: '/dashboard', title: 'Reports',  icon:'notifications', class: '' },
  { path: '/dashboard', title: 'Systems',  icon:'notifications', class: '' },
  { path: '/dashboard', title: 'policies',  icon:'notifications', class: '' },
  { path: '/dashboard', title: 'Device Inventory',  icon:'notifications', class: '' }
];
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('content') content: TemplateRef<any>;

  menuItems: any[];
  constructor(private modalService: NgbModal,private router:Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  getOpen()
  {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(this.content,ngbModalOptions);

  }

  showLocal()
  {
    this.router.navigate(['/locality/map']);

  }

  showSys() {
    this.router.navigate(['/system/map']);
  }

}
