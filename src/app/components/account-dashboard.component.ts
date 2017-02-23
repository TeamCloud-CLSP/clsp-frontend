import { Component } from '@angular/core';

import { User } from '../models/user';
import 'rxjs/add/operator/switchMap';
import {AccountService} from '../services/account.service'

@Component ({
    moduleId: module.id,
    selector: 'account-dashboard',
    templateUrl: '../templates/account-dashboard.component.html'
})

export class AccountDashboardComponent {

    account: User;

    constructor(
        private accountService: AccountService
    ) {
        this.account = accountService.getEmptyAccount();
        this.getAccount();
    }

    getAccount(): void {
        this.accountService.getAccount().then(account => this.account = account);
    }
}