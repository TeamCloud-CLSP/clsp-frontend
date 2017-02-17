import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Course } from '../models/course'
import {ProfRegistration} from '../models/profregistration'

@Injectable()
export class CourseService {
    private designerUrl = 'http://localhost:8000/api/designer';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ withCredentials: true, headers: this.headers })
    constructor(private http: Http) { }

    getCourses(): Promise<Course[]> {
        return this.http.get(this.designerUrl + "/courses", this.options)
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
        return this.http.get(url, this.options)
            .toPromise()
            .then(response => response.json() as Course)
            .catch(this.handleError);
    }

    update(course: Course): Promise<Course> {
        const url = `${this.designerUrl}/course/${course.id}`;
        return this.http
            .post(url, JSON.stringify({ name: course.name }), this.options)
            .toPromise()
            .then(() => course)
            .catch(this.handleError);
    }

    create(name: string): Promise<Course> {
        const url = `${this.designerUrl}/course`
        return this.http
            .post(url, JSON.stringify({ name: name }), this.options)
            .toPromise()
            .then(response => response.json() as Course)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.designerUrl}/${id}`;
        return this.http.delete(url, this.options)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    getProfRegistrations(): Promise<ProfRegistration[]> {
        const url = `${this.designerUrl}/registrations/professor`
        return this.http.get(url, this.options)
            .toPromise()
            .then(response => response.json().data as ProfRegistration[])
            .catch(this.handleError);
    }

    getProfRegistrationsByCourse(id: number): Promise<ProfRegistration[]> {
        const url = `${this.designerUrl}/course/${id}/registrations/professor`;
        return this.http.get(url, this.options)
            .toPromise()
            .then(response => response.json().data as ProfRegistration[])
            .catch(this.handleError);
    }

    createProfessorRegistration(reg: ProfRegistration): Promise<void> {
        const url = `${this.designerUrl}/registrations/professor`;
        return this.http.post(url,
            JSON.stringify({ date_start: reg.date_start, date_end: reg.date_end, course_id: reg.course_id }), this.options)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }


}
