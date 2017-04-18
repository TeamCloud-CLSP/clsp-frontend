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
    private loadedSongs: boolean;

    constructor(private service: StudentService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.songs = [];
        this.loadedSongs = false;
        this.service.getClass().then(myClass => {
            this.myClass = myClass;
        }).then(() => {
            this.service.getUnits(this.myClass.course_id).then(units => {
                this.units = units;
            }).then(() => {
                for (let i = 0; i < this.units.length; i++) {
                    this.service.getSongs(this.units[i].id).then(songs => {
                        this.units[i].songs = songs;
                    });
                }
                this.loadedSongs = true;
            });
        });
    }

    goToUnit(unit: Unit) {
        this.router.navigate(['./student/unit', unit.id]);
    }

    hasSongs(unit_id: number) {
        return this.songs[unit_id].length > 0;
    }
}
