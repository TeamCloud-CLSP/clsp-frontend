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
    newRegistration: ProfRegistration;
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
        this.courseService.getProfRegistrationsByCourse(this.course.id)
            .then(registrations => this.profRegistrations = registrations);
    }

    newCode(): void {
        this.newRegistration = new ProfRegistration();
    }

    onSubmit(): void {
        this.newRegistration.date_start = new Date(this.newRegistration.date_start).getTime() / 1000;
        this.newRegistration.date_end = new Date(this.newRegistration.date_end).getTime() / 1000;
        this.newRegistration.course_id = +this.course.id;
        this.courseService.createProfessorRegistration(this.newRegistration)
            .then(() => {
                this.newRegistration = null;
                this.getProfRegistrationsByCourse();
            })
    }

}
