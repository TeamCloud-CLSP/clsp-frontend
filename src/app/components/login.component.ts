import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Component({
    moduleId: module.id,
    templateUrl: '../templates/login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    loginErrors = "";
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // reset login status
        //this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.loginErrors = "";
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                user => {
                    console.log(user);
                    this.loading = false;
                },
                error =>  {
                    console.log(error);
                    this.loading = false;
                    this.loginErrors = error;
                }
            );
    }
}