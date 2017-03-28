import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {CLSPClass, SingleClass, CreateClass, StudentClass} from '../models/clsp-class';
import { ProfInfo } from '../models/professor-info';
import {StudentRegistration, Student} from "../models/studentregistration";
import {GlobalParameters} from '../global-parameters';
import {Unit, Song} from "../models/course";

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
        var sample = {"id":1,"name":"CHIN 3002 A",
            "description":"advanced chinese course","date_start":0,"date_end":1497057872,
            "course_id":1,"registration_id":1};
        return this.http.get(this.baseUrl + "/class", this.options)
            .toPromise()
            .then(response => {
                // console.log(response.json().data);
                // return response.json().data as StudentClass
                return sample as StudentClass;
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

    getSongs(unitId: number): Promise<Song[]> {
        return this.http.get(this.baseUrl + "/unit/" + unitId + "/songs", this.options)
            .toPromise()
            .then(response => {
                return response.json().data as Song[];
            })
            .catch(this.handleError);
    }
}