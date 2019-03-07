import { Component, OnInit } from '@angular/core';
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
  menuItems: any[];
  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

}
