/**
 * Created by Zakir on 3/14/2017.
 */

import {Injectable} from "@angular/core";
import {GlobalParameters} from "../global-parameters";
import {Headers, RequestOptions, Http} from "@angular/http";


@Injectable()
export class MediaService {

    private parameters = new GlobalParameters();
    private designerUrl = this.parameters.url + "/api/designer";
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ withCredentials: true, headers: this.headers })

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

}