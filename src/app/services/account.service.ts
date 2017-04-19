import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { UserToken } from '../models/user-token';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  private registerUrl = '/api/register';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http,
              private router: Router
  ) { }

  register(username: String, name: String, password: String, email: String, signup_code: String) {
    return this.http.post(this.registerUrl, JSON.stringify({
      username: username, password: password,
    }), this.options)
        .map(this.loginHandler)
        .catch(this.handleError);
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
}
