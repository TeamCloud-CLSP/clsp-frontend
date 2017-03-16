/**
 * Created by Zakir on 3/14/2017.
 */

import {Injectable} from "@angular/core";
import {GlobalParameters} from "../global-parameters";
import {Headers, RequestOptions, Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';


@Injectable()
export class MediaService {

    private parameters = new GlobalParameters();
    private designerUrl = this.parameters.url + "/api/designer";
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ withCredentials: true, headers: this.headers })

    private filesUrl = 'api/files';

    constructor(private http: Http) {
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }

    createMedia(name: string, file: any) {
        const url = `${this.designerUrl}/media`;
        return this.http
            .post(url, JSON.stringify({
                name: name,
                file: file
            }), this.options)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getFiles(): Promise<string[]> {
        return this.http.get(this.filesUrl)
            .toPromise()
            .then(response => response.json().data as string[])
            .catch(this.handleError);
    }

    addFile(name: string): Promise<string> {
        return this.http
            .post(this.filesUrl, JSON.stringify({name: name}), {headers:this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }
}