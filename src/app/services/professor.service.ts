import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { CLSPClass, SingleClass, CreateClass } from '../models/clsp-class';
import { ProfInfo } from '../models/professor-info';
import {StudentRegistration, Student} from "../models/studentregistration";

@Injectable()
export class ProfessorService {
    private baseUrl = 'http://localhost:8000/api/professor';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ withCredentials: true, headers: this.headers });

    constructor(private http: Http) {

    }

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }

    getClasses(): Promise<CLSPClass[]> {
        return this.http.get(this.baseUrl + "/classes", this.options)
            .toPromise()
            .then(response => response.json().data as CLSPClass[])
            .catch(this.handleError);
    }

    getClass(id: number): Promise<SingleClass> {
        return this.http.get(this.baseUrl + "/classes/" + id, this.options)
            .toPromise()
            .then(response => response.json() as SingleClass)
            .catch(this.handleError);
    }

    getDashboard(): Promise<ProfInfo[]> {
        const url = `${this.baseUrl}/main`;
        return this.http.get(url, this.options)
            .toPromise()
            .then(response => response.json().data as ProfInfo[])
            .catch(this.handleError);
    }

    createClass(clspClass: CreateClass): Promise<SingleClass> {
        const url = `${this.baseUrl}/classes`;
        return this.http.post(url, JSON.stringify({ name: clspClass.name, course_id: clspClass.course_id }), this.options)
            .toPromise()
            .then(response => response.json() as SingleClass)
            .catch(this.handleError);
    }

    deleteClass(id: number): Promise<void> {
        const url = `${this.baseUrl}/classes/${id}`;
        return this.http.delete(url, this.options)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    getStudentRegistrationForClass(id: number): Promise<StudentRegistration> {
        const url = `${this.baseUrl}/classes/${id}/registrations/student`;
        return this.http.get(url, this.options)
            .toPromise()
            .then(response => response.json() as StudentRegistration)
            .catch(null);
    }

    createStudentRegistration(reg: StudentRegistration): Promise<void> {
        console.log(reg);
        const url = `${this.baseUrl}/registrations/student`;
        return this.http.post(url, JSON.stringify({ date_start: reg.student_registration_date_start, date_end: reg.student_registration_date_end, class_id: reg.class_id }), this.options)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    getStudents(regId: number): Promise<Student[]> {
        const url = `${this.baseUrl}/registrations/student/${regId}/students`;
        return this.http.get(url, this.options)
            .toPromise()
            .then(response => response.json().data as Student[])
            .catch(this.handleError);
    }

    deleteStudent(studentId: number): Promise<void> {
        const url = `${this.baseUrl}/student/${studentId}`;
        return this.http.delete(url, this.options)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }


}
