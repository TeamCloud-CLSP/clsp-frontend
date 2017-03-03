import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params}   from '@angular/router';
import {Location}                 from '@angular/common';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {CourseService} from '../services/course.service';
import {Course, Unit, Song, Module} from '../models/course';
import {Router}   from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
    moduleId: module.id,
    selector: 'song-detail',
    templateUrl: '../templates/song-detail.component.html'
})

export class SongDetailComponent implements OnInit {
    song: Song;
    unit: Unit;
    modules: Module[];
    courseName: string;
    selectors: any;

    constructor(private courseService: CourseService,
        private route: ActivatedRoute,
        private location: Location,
        private sanitizer: DomSanitizer,
        private router: Router) {
    }

    ngOnInit() {
        this.selectors = {
            "module_cn": "clsp-cultural-notes"
        };
        console.log(this.route.params);
        this.route.params
            .switchMap((params: Params) => this.courseService.getSong(+params['id']))
            .subscribe(song => {
                console.log(song);
                this.song = song;
            });

        this.route.params
            .switchMap((params: Params) => this.courseService.getModules(+params['id']))
            .subscribe(modules => {
                console.log(modules);
                this.modules = modules;
            });


        this.route.params
            .switchMap((params: Params) => this.courseService.getUnit(+params['unit_id']))
            .subscribe(unit => {
                console.log("got unit");
                this.unit = unit;

                this.courseService.getCourse(unit.course_id).then(course => {
                    console.log("got course name");
                    this.courseName = course.name;
                });
            });
    }
}
