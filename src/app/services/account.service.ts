import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { User } from '../models/user'

@Injectable()
export class AccountService {
    private accountUrl = 'http://localhost:8000/api/account';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ withCredentials: true, headers: this.headers })
    public account: User;
    constructor(private http: Http) {
        this.account = this.getEmptyAccount();
        this.getAccount();
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }

    getAccount(): Promise<User> {
        return this.http.get(this.accountUrl, this.options)
            .toPromise()
            .then(response => response.json() as User)
            .catch(this.handleError);
    }

    public getEmptyAccount() {
        return {
            "id": 1,
            "username": "",
            "email": "",
            "is_active": false,
            "date_created": 0,
            "date_deleted": 0,
            "date_start": 0,
            "date_end": 0,
            "timezone": "UTC",
            "is_student": false,
            "is_professor": false,
            "is_designer": false,
            "is_administrator": false
        } as User;
    }
}
