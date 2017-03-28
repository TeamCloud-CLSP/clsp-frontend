import {Component, OnInit} from '@angular/core';
import {ProfessorService} from "../services/professor.service";
import {CLSPClass, CreateClass, StudentClass} from "../models/clsp-class";
import {ProfInfo} from "../models/professor-info";
import {Router}   from '@angular/router';
import {StudentService} from "../services/student.service";
import {Unit, Song} from "../models/course";
@Component({
    moduleId: module.id,
    selector: 'student-dashboard',
    templateUrl: '../templates/student-dashboard.component.html'
})

export class StudentDashboardComponent implements OnInit {

    private myClass: StudentClass;
    private units: Unit[];
    private songs: Song[][];

    constructor(private service: StudentService,
                private router: Router) {
    }

    ngOnInit(): void {
        console.log("Student dashboard");
        this.service.getClass().then(myClass => {
            console.log("got class");
            console.log(myClass);
            this.myClass = myClass;
        }).then(() => {
            console.log("whaddup");
            this.service.getUnits(this.myClass.course_id).then(units => {
                this.units = units;
            }).then(() => {
                for (let i = 0; i < this.units.length; i++) {
                    this.service.getSongs(this.units[i].course_id).then(songs => {
                        this.songs[this.units[i].course_id] = songs;
                    })
                }
            });
        });
    }
}
