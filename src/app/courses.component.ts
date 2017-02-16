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
    selectedCourse: Course;
    courses: Course[];

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

    toCourse(course: Course): void {
        this.router.navigate(['./course', course.id]);
    }

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        console.log("Adding " + name);
        this.courseService.create(name)
            .then(course => {
                this.courses.push(course);
                this.selectedCourse = null;
            })
            .catch(e => {
                console.log(e);
            });
    }

    delete(course: Course): void {
        this.courseService
            .delete(course.id)
            .then(() => {
                this.courses = this.courses.filter(c => c !== course);
                if (this.selectedCourse === course) { this.selectedCourse = null }
            });
    }
}
