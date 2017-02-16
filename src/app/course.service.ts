import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Course } from './course'

@Injectable()
export class CourseService {
    private coursesUrl = 'api/courses';

    constructor(private http: Http) { }

    getCourses(): Promise<Course[]> {
        return this.http.get(this.coursesUrl)
            .toPromise()
            .then(response => response.json().data as Course[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }

    getCourse(id: number): Promise<Course> {
        return this.getCourses()
            .then(courses => courses.find(course => course.id === id));
    }
}
