import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { CourseService } from '../services/course.service';
import { Unit, Song } from '../models/course';
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-unit-detail',
    templateUrl: '../templates/unit-detail.component.html',
    styleUrls: ['../css/unit-detail.component.css']
})

export class UnitDetailComponent implements OnInit {
    unit: Unit;
    edited: boolean;
    songs: Song[];
    newSong: Song;
    courseName: string;
    constructor(
        private courseService: CourseService,
        private route: ActivatedRoute,
        private location: Location,
        private sanitizer: DomSanitizer,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.courseService.getUnit(+params['id']))
            .subscribe(unit => {
                this.unit = unit;
                this.courseService.getCourse(unit.course_id).then(course => {
                    this.courseName = course.name;
                });
            });
        this.route.params
            .switchMap((params: Params) => this.courseService.getSongs(+params['id']))
            .subscribe(songs => this.songs = songs);
        this.edited = false;
    }

    goBack(): void {
        this.location.back();
    }

    updateUnit(): void {
        this.courseService.updateUnit(this.unit).then(
            () => this.edited = false
        );
    }

    deleteSong(song: Song, event: any): void {
        event.preventDefault();
        if (confirm('Are you sure you want to delete ' + song.title + '?')) {
            this.courseService.deleteSong(song)
                .then(() => {
                    this.songs = this.songs.filter(x => x != song);
                });
        }
    }

    createSong(): void {
        this.newSong = new Song();
    }

    toSong(song: Song): void {
        this.router.navigate(['./unit/' + this.unit.id + '/song', song.id]);
    }

    toMediaLink(song: Song): void {
        this.router.navigate(['./unit/' + this.unit.id + '/song/' + song.id + '/media']);
    }

    onSubmit(): void {
        this.newSong.unit_id = +this.unit.id;
        this.courseService.createSong(this.newSong)
            .then(song => {
                this.songs.push(song);
                this.songs.sort((n1, n2) => n1.weight - n2.weight);
                this.newSong = null;
            });

    }

    editUnit(): void {
        this.edited = true;
    }

    getShortenedDescription(song: Song): string {
        if (song.description.length > 305) {
            return song.description.substr(0, 300) + "...";
        }
        return song.description;
    }

}
