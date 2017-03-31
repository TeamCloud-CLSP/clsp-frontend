import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AccountService } from '../services/account.service'
import { Router } from '@angular/router'

@Component({
    moduleId: module.id,
    selector: 'site-navbar',
    templateUrl: '../templates/navbar.component.html'
})

export class NavbarComponent {
    private account: User;

    constructor(
        private accountService: AccountService,
        private router: Router
    ) {
        accountService.getAccount().then(account => {
            this.account = account;
        });
    }
}
