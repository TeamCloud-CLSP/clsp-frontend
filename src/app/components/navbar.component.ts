import { Component } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    selector: 'app-navbar',
    templateUrl: '../templates/navbar.component.html'
})

export class NavbarComponent {
    private account: User;

    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) {
        this.account = authService.getAccount();
    }

    logout() {
        // console.log('Logging user out');
        this.authService.logout();
        // console.log('Logging user out 2');
        this.account = this.authService.getAccount();
    }
}
