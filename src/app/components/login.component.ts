import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Component({
    templateUrl: '../templates/login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    loginErrors = '';
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthenticationService) { }

    ngOnInit() {
        // reset login status
        // this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.loginErrors = '';
        this.authService.login(this.model.username, this.model.password)
            .subscribe(
                user => {
//                    console.log(user);
                    this.loading = false;
                    if (this.authService.redirectUrl) {
                        this.router.navigate([this.authService.redirectUrl]);
                    } else {
                        this.router.navigate(['./dashboard']);
                    }
                },
                error =>  {
                    console.log(error);
                    this.loading = false;
                    this.loginErrors = error;
                }
            );
    }
}
