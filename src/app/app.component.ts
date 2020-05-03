import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, TaxService } from './services';
import { User } from './models/user';
import { Tax } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;
  tax: Tax;
  userLoggedIn: boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private taxService: TaxService) {
      this.authenticationService.currentUser.subscribe(user => {
        if (!user) {
          return;
        }

        this.currentUser = user;
        this.userLoggedIn = true;
      
        this.taxService.get().subscribe();
      });
    }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    this.userLoggedIn = false;
  }
}