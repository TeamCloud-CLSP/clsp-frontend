import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course';
import 'rxjs/add/operator/switchMap';

@Component({
    moduleId: module.id,
    selector: 'course-detail',
    templateUrl: '../templates/course-detail.component.html'
})

export class CourseDetailComponent implements OnInit {
    @Input() course: Course;

    constructor(
        private courseService: CourseService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.courseService.getCourse(+params['id']))
            .subscribe(course => this.course = course);
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.courseService.update(this.course)
            .then(() => this.goBack());
    }
}
