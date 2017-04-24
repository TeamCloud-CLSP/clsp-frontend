import { Component } from '@angular/core';

import { User } from '../models/user';
import 'rxjs/add/operator/switchMap';
import { AuthenticationService } from '../services/authentication.service';

@Component ({
    selector: 'app-account-dashboard',
    templateUrl: '../templates/account-dashboard.component.html'
})

export class AccountDashboardComponent {

    account: User;

    constructor(
        private authService: AuthenticationService
    ) {
        this.account = authService.getAccount();
    }

    getRoles(): string {
        let stuff = '';
        if (this.account.is_designer) {
            stuff += 'ROLE_DESIGNER, ';
        }
        if (this.account.is_student) {
            stuff += 'ROLE_STUDENT, ';
        }
        if (this.account.is_administrator) {
            stuff += 'ROLE_ADMIN, ';
        }
        if (this.account.is_professor) {
            stuff += 'ROLE_PROFESSOR, ';
        }
        return stuff;
    }
}