import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

import { User } from '../models/user';
import 'rxjs/add/operator/switchMap';
import {AdminService} from '../services/admin.service'

@Component ({
    moduleId: module.id,
    selector: 'admin-dashboard',
    templateUrl: '../templates/admin-dashboard.component.html'
})

export class AdminDashboardComponent implements OnInit {
    newDesigner: User;
    students: User[];
    professors: User[];
    designers: User[];

    constructor(
        private adminService: AdminService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers(): void {
        this.adminService.getUsers().then(users => {
            this.students = users.filter(u => u.is_student == true);
            this.professors = users.filter(u => u.is_professor == true);
            this.designers = users.filter(u => u.is_designer == true);
            console.log(users);
        });
    }

    delete(user: User): void {
        this.adminService
            .deleteUser(user.id)
            .then(() => {
                this.students = this.students.filter(u => u !== user);
                this.professors = this.professors.filter(u => u !== user);
                this.designers = this.designers.filter(u => u !== user);
            });
    }

    createDesigner(): void {
        this.newDesigner = new User();
    }

    submitDesigner(): void {
        this.adminService.addDesigner(this.newDesigner)
            .then(designer => {
                this.newDesigner = null;
                this.designers.push(designer);
            })
    }
}