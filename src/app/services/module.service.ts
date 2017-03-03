import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Course, Language, Unit, Song, Module} from '../models/course'
import {ProfRegistration} from '../models/profregistration'
import {CulturalNoteKeywords} from "../models/modules/CulturalNoteKeywords";
import {GlobalParameters} from '../global-parameters';
import {Header} from '../models/modules/header';
@Injectable()
export class ModuleService {
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

    createDWHeader(header: Header): Promise<Header> {
        console.log(header);
        const url = `${this.designerUrl}/song/${header.song_id}/module_dw/headers`
        return this.http.post(url,
            JSON.stringify({
                name: header.name
            }),
            this.options)
            .toPromise()
            .then(response => response.json() as Header)
            .catch(this.handleError)
    }

    getDWHeaders(songId: number): Promise<Header[]> {
        const url = `${this.designerUrl}/song/${songId}/module_dw/headers`;
        return this.http.get(url, this.options)
            .toPromise()
            .then(response => response.json().data as Header[])
            .catch(this.handleError);
    }
}
