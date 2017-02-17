import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Course } from '../models/course'

@Injectable()
export class CourseService {
    private designerUrl = 'http://localhost:8000/api/designer';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ withCredentials: true, headers: this.headers })
    constructor(private http: Http) { }

    getCourses(): Promise<Course[]> {
        return this.http.get(this.designerUrl + "/courses", { withCredentials: true })
            .toPromise()
            .then(response => response.json().data as Course[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }

    getCourse(id: number): Promise<Course> {
        const url = `${this.designerUrl}/course/${id}`;
        return this.http.get(url, { withCredentials: true })
            .toPromise()
            .then(response => response.json() as Course)
            .catch(this.handleError);
    }

    update(course: Course): Promise<Course> {
        const url = `${this.designerUrl}/course/${course.id}`;
        let options = new RequestOptions({ headers: this.headers, withCredentials: true })
        return this.http
            .post(url, JSON.stringify({ name: course.name }), options)
            .toPromise()
            .then(() => course)
            .catch(this.handleError);
    }

    create(name: string): Promise<Course> {
        return this.http
            .post(this.designerUrl, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.designerUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }
}
