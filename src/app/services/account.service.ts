import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {ActivatedRouteSnapshot, Router} from '@angular/router';

@Injectable()
export class AccountService {
  private registerUrl = '/api/register';
  private securityUrl = '/api/security';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  register(signupCode: string, username: string, password: string, email: string, name: string): Observable<void> {
    console.log('trying to register user ' + username);
    return this.http.post(this.registerUrl, JSON.stringify({
      signup_code: signupCode,
      username: username,
      password: password,
      email: email,
      name: name
    }), this.options)
        .map(this.registerHandler)
        .catch(this.handleError);
  }

  private registerHandler(res: Response) {
    console.log('successful registration');
    console.log(res);
    return;
  }

  forgotPassEmail(email: string): Observable<void> {
    console.log('trying to send forgotten password email for' + email);
    return this.http.post(this.securityUrl + '/forgotPass', JSON.stringify({
      email: email,
    }), this.options)
        .map(this.forgotPassEmailHandler)
        .catch(this.handleError);
  }

  private forgotPassEmailHandler(res: Response) {
    console.log('successful registration');
    console.log(res);
    return;
  }

  forgotPassResetPass(code: string, password: string): Observable<void> {
    console.log('trying to reset password');
    return this.http.post(this.securityUrl + '/resetPass', JSON.stringify({
      forgot_pass_code: code,
      new_password: password
    }), this.options)
        .map(this.forgotPassResetPassHandler)
        .catch(this.handleError);
  }

  private forgotPassResetPassHandler(res: Response) {
    console.log('successful password reset');
    console.log(res);
    return;
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    console.log(error);
    let errMsg: string;
    if (error.json().error) {
      errMsg = error.json().error;
    } else if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
}
