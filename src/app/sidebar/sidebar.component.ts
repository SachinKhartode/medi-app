import { Component, OnInit } from '@angular/core';
import { DataService } from "../Shared/data.service";

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'employee-registration', title: 'Employee Registration',  icon:'pe-7s-user', class: '' },
    { path: 'employee-list', title: 'Employee List',  icon:'pe-7s-note2', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  public isUserLoggedIn: boolean;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);

    this.data.currentMessage.subscribe(isUserLoggedIn => this.isUserLoggedIn = isUserLoggedIn)
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
