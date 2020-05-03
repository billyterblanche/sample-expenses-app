import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent {

  @Output() sidenavClose = new EventEmitter();
  @Output() logoutToggle = new EventEmitter();

  constructor() {}

  logout() {
    this.logoutToggle.emit();
    this.sidenavClose.emit();
  }

  onSidenavClose() {
    this.sidenavClose.emit();
  }
}