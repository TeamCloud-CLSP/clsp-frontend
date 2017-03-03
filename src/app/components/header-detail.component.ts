import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { CourseService } from '../services/course.service';
import { Course, Unit } from '../models/course';
import { Router }   from '@angular/router';
import { Header } from '../models/modules/header'
import 'rxjs/add/operator/switchMap';
@Component({
    moduleId: module.id,
    selector: 'module-detail',
    templateUrl: '../templates/header-detail.component.html'
})
export class HeaderDetailComponent {
    constructor(
        private courseService: CourseService,
        private route: ActivatedRoute,
        private location: Location,
        private sanitizer: DomSanitizer,
        private router: Router
    ) { }


}
