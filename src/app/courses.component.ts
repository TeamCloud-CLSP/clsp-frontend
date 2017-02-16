import { Component, OnInit } from '@angular/core';
import { Course } from './course';
import { CourseService } from './course.service';
import { Router }   from '@angular/router';
@Component({
  moduleId: module.id,
  selector: 'my-courses',
  templateUrl: './templates/courses.component.html',
  styleUrls: ['./css/courses.component.css']
})



export class CoursesComponent implements OnInit {
  title = 'Course List';
  selectedCourse : Course;
  courses : Course[];

  constructor(
    private courseService: CourseService,
    private router: Router
  ) { }

  getCourses(): void {
    this.courseService.getCourses().then(courses => this.courses = courses);
  }

  ngOnInit(): void {
    this.getCourses();
  }
  onSelect(course: Course): void {
    this.selectedCourse = course;
  }
  gotoCourse(): void {
    this.router.navigate(['./course', this.selectedCourse.id]);
  }
}
