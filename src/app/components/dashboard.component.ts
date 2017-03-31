import { Component, OnInit } from '@angular/core'
import { Course } from '../models/course';
import { CourseService } from '../services/course.service';
import {Router} from "@angular/router";
import {User} from "../models/user";
import {AccountService} from "../services/account.service";

@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: '../templates/dashboard.component.html'
})

export class DashboardComponent implements OnInit {
    courses: Course[] = [];
    user: User;
    constructor(private accountService : AccountService,
                private courseService: CourseService, private router: Router) { }

    ngOnInit(): void {
        this.accountService.getAccount().then(account => {
            this.user = account;
            if (account.is_student) {
                this.router.navigate(['./student']);
            } else if (account.is_professor || account.is_designer) {
                this.courseService.getCourses().then(courses => this.courses = courses.slice(0, 2));
            }
        });
    }
}
