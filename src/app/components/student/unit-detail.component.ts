import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { Router }   from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {Unit, Song} from "../../models/course";
import {StudentService} from "../../services/student.service";

@Component({
    moduleId: module.id,
    selector: 'student-unit-detail',
    templateUrl: '../../templates/student/student-unit-detail.component.html',
    styleUrls: ['../../css/unit-detail.component.css']
})

export class StudentUnitDetailComponent implements OnInit {
    unit : Unit;
    songs: Song[];

    constructor(
        private studentService: StudentService,
        private route: ActivatedRoute,
        private location: Location,
        private sanitizer: DomSanitizer,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.studentService.getUnit(+params['id']))
            .subscribe(unit => {
                this.unit = unit;
                console.log(unit);
                this.studentService.getSongs(unit.id).then(songs => {
                    this.songs = songs;
                })
            });
    }

    goToSong(song: Song) {
        this.router.navigate(['./student/unit/' + this.unit.id + '/song/' + song.id]);
    }

}
