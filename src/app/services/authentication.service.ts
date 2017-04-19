import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { UserToken } from '../models/user-token';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
    private tokenUrl = environment.apiBase + 'api/security/loginToken';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });
    redirectUrl: string;

    constructor(private http: Http,
                private router: Router

    ) { }

    login(username: string, password: string): Observable<UserToken> {
        // console.log("Logging in " + username + " " + password);
        return this.http.post(this.tokenUrl, JSON.stringify({ username: username, password: password }), this.options)
            .map(this.loginHandler)
            .catch(this.handleError);
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }

    // assumes that you're already logged in
    public getOptions() {
        const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.getToken() });
        // console.log("headers");
        // console.log(headers);
        const options = new RequestOptions({ headers: headers });
        // console.log(options);
        return options;
    }

    private loginHandler(res: Response) {
        // console.log("stuff loginhandler");
        let user: UserToken;
        user = res.json() as UserToken;
        // console.log("Successful login");
        // console.log(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
    }

    private handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }

    public getAccount(): User {
        if (localStorage.getItem('currentUser')) {
            const user: UserToken = JSON.parse(localStorage.getItem('currentUser')) as UserToken;
            return user.user_info;
        } else {
            return this.getEmptyAccount();
        }
    }

    public getToken(): String {
        if (localStorage.getItem('currentUser')) {
            const user: UserToken = JSON.parse(localStorage.getItem('currentUser')) as UserToken;
            return user.token;
        } else {
            return '';
        }
    }

    public getEmptyAccount() {
        return {
            'id': 1,
            'username': '',
            'email': '',
            'is_active': false,
            'date_created': 0,
            'date_deleted': 0,
            'date_start': 0,
            'date_end': 0,
            'timezone': 'UTC',
            'is_student': false,
            'is_professor': false,
            'is_designer': false,
            'is_administrator': false
        } as User;
    }

    public isLoggedIn(): Boolean {
        return localStorage.getItem('currentUser') !== null;
    }
}
