/**
 * Created by Zakir on 3/14/2017.
 */

import {Injectable} from "@angular/core";
import {GlobalParameters} from "../global-parameters";
import {Headers, RequestOptions, Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Media} from "../models/course";


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

    getAllFiles(): Promise<Media[]> {
        const url = `${this.designerUrl}/media`;
        return this.http
            .get(url, this.options)
            .toPromise()
            .then(response => response.json().data as Media[])
            .catch(this.handleError);
    }

    editMedia(id: number, name: string): Promise<Media> {
        const url = `${this.designerUrl}/media/${id}`;
        return this.http.post(url,
            JSON.stringify({
                name: name
            }),
            this.options)
            .toPromise()
            .then(response => response.json() as Media)
            .catch(this.handleError);

    }

    deleteMedia(id: number): Promise<null> {
        const url = `${this.designerUrl}/media/${id}`;
        return this.http.delete(url, this.options)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }
}