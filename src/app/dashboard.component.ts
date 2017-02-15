import { Component, OnInit } from '@angular/core'
import { Course } from './course';
import { CourseService } from './course.service';

@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: './templates/dashboard.component.html'
})

export class DashboardComponent implements OnInit{ 
    courses: Course[] = [];
    constructor(private courseService: CourseService) { }

    ngOnInit(): void {
        this.courseService.getCourses().then(courses => this.courses = courses.slice(0,2));
    }
}