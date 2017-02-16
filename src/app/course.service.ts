import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Course } from './course'

@Injectable()
export class CourseService {
    private coursesUrl = 'http://localhost:8000/api/designer/courses';
    private headers = new Headers();

    constructor(private http: Http) { }

    getCourses(): Promise<Course[]> {
        this.headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ withCredentials: true });
        return this.http.get(this.coursesUrl, options)
            .toPromise()
            .then(response => response.json().data as Course[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }

    getCourse(id: number): Promise<Course> {
        const url = `${this.coursesUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Course)
            .catch(this.handleError);
    }

    update(course: Course): Promise<Course> {
        const url = `${this.coursesUrl}/${course.id}`;
        return this.http
            .put(url, JSON.stringify(course), { headers: this.headers })
            .toPromise()
            .then(() => course)
            .catch(this.handleError);
    }

    create(name: string): Promise<Course> {
        return this.http
            .post(this.coursesUrl, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.coursesUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }
}
