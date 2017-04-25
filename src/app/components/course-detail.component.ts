import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CourseService } from '../services/course.service';
import { Course, Unit } from '../models/course';
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {SafeHtmlPipe} from './safe-html.pipe'

@Component({
  selector: 'app-course-detail',
  templateUrl: '../templates/course-detail.component.html',
  styleUrls: ['../css/course-detail.component.css']
})

export class CourseDetailComponent implements OnInit {
  @Input() course: Course;
  media: string;
  edited: boolean;
  url: SafeResourceUrl;
  units: Unit[];
  newUnit: Unit;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private location: Location,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.courseService.getCourse(+params['id']))
      .subscribe(course => this.course = course);
    this.route.params
      .switchMap((params: Params) => this.courseService.getUnits(+params['id']))
      .subscribe(units => this.units = units);
    this.edited = false;
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.courseService.update(this.course)
      .then(() => this.edited = false);
  }

  addMedia(): void {
    //console.log(this.url)
    this.edited = true;
  }

  getSafeURL() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.media);
  }

  removeMedia(): void {
    this.media = null;
    this.edited = false;
  }

  toUnit(unit: Unit): void {
    this.router.navigate(['./unit', unit.id]);
  }

  createUnit(): void {
    this.newUnit = new Unit();
    this.newUnit.description = "";
  }

  onSubmit(): void {
    this.newUnit.course_id = +this.course.id;
    this.courseService.createUnit(this.newUnit)
      .then(unit => {
        this.units.push(unit);
        this.units.sort((n1, n2) => n1.weight - n2.weight);
        this.newUnit = null;
      });

  }

  deleteUnit(unit: Unit): void {
    this.courseService.deleteUnit(unit)
      .then(() => {
        this.units = this.units.filter(x => x != unit);
      });
  }

  editCourse(): void {
    this.edited = true;
  }

  getShortenedDescription(unit: Unit): string {
    if (unit.description.length > 305) {
      return unit.description.substr(0, 300) + "...";
    }
    return unit.description;
  }
}
