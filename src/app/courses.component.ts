import { Component, OnInit } from '@angular/core';
import { Course } from './course';
import { CourseService } from './course.service';
@Component({
  selector: 'my-courses',
  template: `
    <h1>{{title}}</h1>
    <ul class = "courses">
      <li *ngFor = "let course of courses" 
        [class.selected]="course === selectedCourse"
        (click) = "onSelect(course)">
        <span class = "badge">{{course.id}}</span> {{course.name}}
      </li>
    </ul>
    <course-detail [course] = "selectedCourse"></course-detail>
    `,
    styles: [`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .courses {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .courses li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .courses li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .courses li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .courses .text {
      position: relative;
      top: -3px;
    }
    .courses .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `
    ],
})



export class CoursesComponent implements OnInit { 
  title = 'Course List';
  selectedCourse : Course;
  courses : Course[];

  constructor(private courseService: CourseService) { }

  getCourses(): void {
    this.courseService.getCourses().then(courses => this.courses = courses);
  }

  ngOnInit(): void {
    this.getCourses();
  }

  // getCourses(): void {
  //   this.courseService.getCourses().then(courses => this.courses = courses);
  // }

  // ngOnInit(): void {
  //   this.getCourses();
  // }

  onSelect(course: Course): void {
    this.selectedCourse = course;
  }
}




