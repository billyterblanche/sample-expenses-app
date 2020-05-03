import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output() sidenavToggle = new EventEmitter();
  @Output() logoutToggle = new EventEmitter();
  
  constructor() {}

  logout() {
    this.logoutToggle.emit();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}