import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params}   from '@angular/router';
import {Location}                 from '@angular/common';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {CourseService} from '../../services/course.service';
import {Course, Unit, Song, Module} from '../../models/course';
import {Router}   from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
    moduleId: module.id,
    selector: 'clsp-discussion-and-writing',
    templateUrl: '../../templates/modules/discussionandwriting.component.html'
})

export class DiscussionAndWritingComponent implements OnInit {


    constructor(private courseService: CourseService,
                private route: ActivatedRoute,
                private location: Location,
                private sanitizer: DomSanitizer,
                private router: Router) {
    }

    ngOnInit() {

    }

    onChange(newSelection: string) {
        console.log(newSelection);
    }
}