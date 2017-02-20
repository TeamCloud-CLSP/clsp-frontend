import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
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
    media: string;
    edited: boolean;
    url: SafeResourceUrl;

    constructor(
        private courseService: CourseService,
        private route: ActivatedRoute,
        private location: Location,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.courseService.getCourse(+params['id']))
            .subscribe(course => this.course = course);
        this.edited = false;
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.courseService.update(this.course)
            .then(() => this.goBack());
    }

    addMedia(): void {
        console.log(this.url)
        this.edited = true;
    }

    getSafeURL() {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.media);
    }

    removeMedia(): void {
        this.media = null;
        this.edited = false;
    }
}
