import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Unit, Song } from '../../models/course';
import { StudentService } from '../../services/student.service';
import {SafeHtmlPipe} from '../safe-html.pipe'


@Component({
  selector: 'app-student-unit-detail',
  templateUrl: '../../templates/student/student-unit-detail.component.html',
  styleUrls: ['../../css/unit-detail.component.css']
})

export class StudentUnitDetailComponent implements OnInit {
  unit: Unit;
  songs: Song[];
  private courseName: string;

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
        //this.unit.description = this.sanitizer.bypassSecurityTrustHtml(this.unit.description);
        console.log(unit);
        this.studentService.getCourse(unit.course_id).then(course => {
          this.courseName = course;
        });
        this.studentService.getSongs(unit.id).then(songs => {
          this.songs = songs;
        });
      });
  }

  goToSong(song: Song) {
    this.router.navigate(['./student/unit/' + this.unit.id + '/song/' + song.id]);
  }

  getProgress(song: Song) {
    return { complete: 3, uncomplete: 3 };
  }

}
