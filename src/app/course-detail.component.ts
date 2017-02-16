import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { CourseService } from './course.service';
import { Course } from './course';
import 'rxjs/add/operator/switchMap';

@Component({
    moduleId: module.id,
    selector: 'course-detail',
    templateUrl: './templates/course-detail.component.html'
})

export class CourseDetailComponent implements OnInit{
    @Input() course: Course;

    constructor(
        private courseService: CourseService,
        private route: ActivatedRoute,
        private Location: Location
    ) {}

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.courseService.getCourse(+params['id']))
            .subscribe(course => this.course = course);
    }

    goBack(): void {
        this.location.back();
    }
}
