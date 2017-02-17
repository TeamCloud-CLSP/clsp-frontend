import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { ProfRegistration} from '../models/profregistration'
import { CourseService } from '../services/course.service'
import { Router }   from '@angular/router';
import { Course } from '../models/course';
@Component({
    moduleId: module.id,
    selector: 'prof-registrations',
    templateUrl: '../templates/prof-registrations.component.html'
})

export class ProfRegistrationsComponent implements OnInit {
    courseId: number;
    profRegistrations: ProfRegistration[];
    course: Course;
    constructor(
        private courseService: CourseService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.courseService.getProfRegistrationsByCourse(+params['id']))
            .subscribe(registrations => this.profRegistrations = registrations);
        this.route.params
            .switchMap((params: Params) => this.courseService.getCourse(+params['id']))
            .subscribe(course => this.course = course);
    }

    getProfRegistrationsByCourse(): void {
        this.courseService.getProfRegistrationsByCourse(this.courseId)
            .then(registrations => this.profRegistrations = registrations);
    }

}
