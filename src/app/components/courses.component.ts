import { Component, OnInit } from '@angular/core';
import { Course, Language } from '../models/course';
import { CourseService } from '../services/course.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-courses',
    templateUrl: '../templates/courses.component.html',
    styleUrls: ['../css/courses.component.css']
})



export class CoursesComponent implements OnInit {
    title = 'Course List';
    courses: Course[];
    newCourse: Course;
    languages: Language[];
    selectedLanguage: Language;

    constructor(
        private courseService: CourseService,
        private router: Router
    ) { }

    getCourses(): void {
        this.courseService.getCourses().then(courses => this.courses = courses);
    }

    getLanguages(): void {
        this.courseService.getLanguages().then(languages => this.languages = languages);
    }

    ngOnInit(): void {
        this.getCourses();
        this.getLanguages();
    }

    toCourse(course: Course): void {
        this.router.navigate(['./course', course.id]);
    }

    toMedia(): void {
        this.router.navigate(['designer/media']);
    }

    toPRList(course: Course): void {
        this.router.navigate(['./profregistrationlist', course.id]);
    }

    delete(course: Course): void {
        this.courseService
            .delete(course.id)
            .then(() => {
                this.courses = this.courses.filter(c => c !== course);
            });
    }

    createCourse(): void {
        this.selectedLanguage = null;
        this.newCourse = new Course();
    }

    onSubmit(): void {
        this.newCourse.language_id = this.selectedLanguage.id;
        this.courseService.createCourse(this.newCourse)
            .then(course => {
                this.courses.push(course);
                this.newCourse = null;
                this.selectedLanguage = null;
            });

    }
}
