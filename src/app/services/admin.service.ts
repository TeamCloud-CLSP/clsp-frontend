import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { User } from '../models/user'
import {ProfRegistration} from '../models/profregistration'

@Injectable()
export class AdminService {
    private adminUrl = "/api/admin";
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ withCredentials: true, headers: this.headers })
    constructor(private http: Http) { }

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }


    getUsers(): Promise<User[]> {
        return this.http.get(this.adminUrl + "/users", this.options)
            .toPromise()
            .then(response => response.json().data as User[])
            .catch(this.handleError);
    }

    deleteUser(id: number): Promise<void> {
        const url = `${this.adminUrl}/users/${id}`;
        return this.http.delete(url, this.options)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    addDesigner(user: User): Promise<User> {
        const url = `${this.adminUrl}/designer`;
        return this.http.post(url,
            JSON.stringify({ username: user.username, password: user.password, email: user.email }), this.options)
            .toPromise()
            .then(response => response.json() as User)
            .catch(this.handleError);
    }
}
