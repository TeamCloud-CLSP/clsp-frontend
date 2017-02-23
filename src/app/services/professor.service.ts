import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { CLSPClass } from '../models/clsp-class';

@Injectable()
export class ProfessorService{
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

    getClass(id: number): Promise<CLSPClass> {
        return this.http.get(this.baseUrl + "/classes/" + id, this.options)
            .toPromise()
            .then(response => response.json().data as CLSPClass)
            .catch(this.handleError);
    }



}
