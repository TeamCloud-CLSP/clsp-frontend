import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {CLSPClass, SingleClass, CreateClass, StudentClass} from '../models/clsp-class';
import { ProfInfo } from '../models/professor-info';
import {StudentRegistration, Student} from "../models/studentregistration";
import {GlobalParameters} from '../global-parameters';
import {Unit, Song, Module} from "../models/course";
import {Header, Question} from '../models/modules/header';

@Injectable()
export class StudentService {
    private parameters = new GlobalParameters();
    private baseUrl = this.parameters.url + "/api/student";
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ withCredentials: true, headers: this.headers });

    constructor(private http: Http) {

    }

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }

    getClass(): Promise<StudentClass> {
        // TODO: response returns nothing, backend problems
        // var sample = {"id":1,"name":"CHIN 3002 A",
        //     "description":"advanced chinese course","date_start":0,"date_end":1497057872,
        //     "course_id":1,"registration_id":1};
        return this.http.get(this.baseUrl + "/class", this.options)
            .toPromise()
            .then(response => {
                return response.json() as StudentClass;
            })
            .catch(this.handleError);
    }

    getCourse(courseId: number): Promise<string> {
        console.log(courseId);
        return this.http.get(this.baseUrl + "/course/" + courseId, this.options)
            .toPromise()
            .then(response => {
                let name = response.json().name;
                return name;
            })
            .catch(this.handleError);
    }

    getUnits(courseId: number): Promise<Unit[]> {
        return this.http.get(this.baseUrl + "/course/" + courseId + "/units", this.options)
            .toPromise()
            .then(response => {
                return response.json().data as Unit[];
            })
            .catch(this.handleError);
    }

    getUnit(unitId: number): Promise<Unit> {
        return this.http.get(this.baseUrl + "/unit/" + unitId, this.options)
            .toPromise()
            .then(response => {
                return response.json() as Unit;
            })
            .catch(this.handleError);
    }

    getSongs(unitId: number): Promise<Song[]> {
        return this.http.get(this.baseUrl + "/unit/" + unitId + "/songs", this.options)
            .toPromise()
            .then(response => {
                return response.json().data as Song[];
            })
            .catch(this.handleError);
    }

    getSong(songId: number): Promise<any> {
        return this.http.get(this.baseUrl + "/song/" + songId, this.options)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(this.handleError);
    }

    getModules(songId: number): Promise<Module[]> {
        return this.http.get(this.baseUrl + "/song/" + songId + "/modules", this.options)
            .toPromise()
            .then(response => {
                return response.json().data as Module[];
            })
            .catch(this.handleError);
    }

    getHeaders(songId: number, modName: string): Promise<Header[]> {
        const url = `${this.baseUrl}/song/${songId}/${modName}/headers`;
        return this.http.get(url, this.options)
            .toPromise()
            .then(response => response.json().data as Header[])
            .catch(this.handleError);
    }

    getHeader(headerId: number): Promise<Header> {
        const url = `${this.baseUrl}/header/${headerId}`
        return this.http.get(url, this.options)
            .toPromise()
            .then(response => response.json() as Header)
            .catch(this.handleError);
    }

    getQuestions(headerId: number): Promise<Question[]> {
        const url = `${this.baseUrl}/header/${headerId}/items`;
        return this.http.get(url, this.options)
            .toPromise()
            .then(response => response.json().data as Question[])
            .catch(this.handleError);
    }
}
