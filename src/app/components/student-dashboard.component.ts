import { Component, OnInit } from '@angular/core';
import { StudentClass } from '../models/clsp-class';
import { Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { Unit, Song } from '../models/course';

@Component({
    selector: 'app-student-dashboard',
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
        this.songs = [];
        this.service.getClass().then(myClass => {
            this.myClass = myClass;
        }).then(() => {
            this.service.getUnits(this.myClass.course_id).then(units => {
                this.units = units;
            }).then(() => {
                for (let i = 0; i < this.units.length; i++) {
                    this.service.getSongs(this.units[i].id).then(songs => {
                        this.songs[this.units[i].id] = songs;
                        console.log(this.songs);
                    });
                }
            });
        });
    }

    goToUnit(unit: Unit) {
        this.router.navigate(['./student/unit', unit.id]);
    }
}
