import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {GlobalParameters} from "../global-parameters";
import {UserToken} from "../models/user-token";
import {User} from "../models/user";
import {Router} from "@angular/router";

@Injectable()
export class AuthenticationService {
    private parameters = new GlobalParameters();
    private tokenUrl = this.parameters.url + "/api/security/loginToken";
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers })

    constructor(private http: Http,
                private router: Router

    ) { }

    login(username: string, password: string): Observable<UserToken> {
        console.log("Logging in " + username + " " + password);
        return this.http.post(this.tokenUrl, JSON.stringify({ username: username, password: password }), this.options)
            .map(this.loginHandler)
            .catch(this.handleError);
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }

    private loginHandler(res: Response) {
        console.log("stuff loginhandler");
        let user: UserToken;
        user = res.json() as UserToken;
        console.log("Successful login");
        console.log(user);
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

    getAccount(): User {
        if(localStorage.getItem("currentUser")) {
            let user: UserToken = JSON.parse(localStorage.getItem("currentUser")) as UserToken;
            return user.user_info;
        } else {
            return this.getEmptyAccount();
        }
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

    // logout() {
    //     // remove user from local storage to log user out
    //     localStorage.removeItem('currentUser');
    // }

// (response: Response) => {
//     // login successful if there's a jwt token in the response
//     // let user = response.json();
//     console.log(response.json() as UserToken);
//     // let user = JSON.parse("{\"id\":\"5\",\"username\":\"testDesignerChinese\",\"email\":\"testDesignerChinese@test.com\",\"is_active\":\"1\",\"date_created\":\"1487536898\",\"date_deleted\":null,\"date_start\":\"0\",\"date_end\":\"1519072898\",\"timezone\":\"America\/New_York\",\"is_student\":\"0\",\"is_professor\":\"0\",\"is_designer\":\"1\",\"is_administrator\":\"0\"}");
//     // // if (user && user.token) {
//     // if (user) {
//     //     // store user details and jwt token in local storage to keep user logged in between page refreshes
//     //     console.log(user);
//     //     localStorage.setItem('currentUser', JSON.stringify(user));
//     // }
// }