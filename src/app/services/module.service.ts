import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Module} from '../models/course';
import {Header, Question} from '../models/modules/header';
import {AuthenticationService} from './authentication.service';
import { environment } from '../../environments/environment';

@Injectable()
export class ModuleService {
    private designerUrl = environment.apiBase + 'api/designer';

    constructor(private http: Http,
                private authService: AuthenticationService) {
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }

    getHeader(headerId: number): Promise<Header> {
        const url = `${this.designerUrl}/header/${headerId}`;
        return this.http.get(url, this.authService.getOptions())
            .toPromise()
            .then(response => response.json() as Header)
            .catch(this.handleError);
    }


    createHeader(header: Header, modName: string): Promise<Header> {
        const url = `${this.designerUrl}/song/${header.song_id}/${modName}/headers`;
        return this.http.post(url,
            JSON.stringify({
                name: header.name
            }),
            this.authService.getOptions())
            .toPromise()
            .then(response => response.json() as Header)
            .catch(this.handleError);
    }

    getHeaders(songId: number, modName: string): Promise<Header[]> {
        const url = `${this.designerUrl}/song/${songId}/${modName}/headers`;
        return this.http.get(url, this.authService.getOptions())
            .toPromise()
            .then(response => response.json().data as Header[])
            .catch(this.handleError);
    }

    createDWHeader(header: Header): Promise<Header> {
        const url = `${this.designerUrl}/song/${header.song_id}/module_dw/headers`;
        return this.http.post(url,
            JSON.stringify({
                name: header.name
            }),
            this.authService.getOptions())
            .toPromise()
            .then(response => response.json() as Header)
            .catch(this.handleError);
    }

    getDWHeaders(songId: number): Promise<Header[]> {
        const url = `${this.designerUrl}/song/${songId}/module_dw/headers`;
        return this.http.get(url, this.authService.getOptions())
            .toPromise()
            .then(response => response.json().data as Header[])
            .catch(this.handleError);
    }

    getQuestions(headerId: number): Promise<Question[]> {
        const url = `${this.designerUrl}/header/${headerId}/items`;
        return this.http.get(url, this.authService.getOptions())
            .toPromise()
            .then(response => response.json().data as Question[])
            .catch(this.handleError);
    }

    createQuestion(question: Question): Promise<Question> {
        const url = `${this.designerUrl}/item`;
        return this.http.post(url,
            JSON.stringify({
                heading_id: question.heading_id,
                content: question.content,
                type: question.type,
                weight: question.weight,
                choices: question.choices,
                answers: question.answers
            }),
            this.authService.getOptions())
            .toPromise()
            .then(response => response.json() as Question)
            .catch(this.handleError);
    }

    deleteQuestion(questionId: number): Promise<void> {
        const url = `${this.designerUrl}/item/${questionId}`;
        return this.http.delete(url, this.authService.getOptions())
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    getModuleCN(songId: number): Promise<any> {
        const url = `${this.designerUrl}/song/${songId}/module_cn`;
        return this.http.get(url, this.authService.getOptions())
            .toPromise()
            .then(response => response.json().data as Question[])
            .catch(this.handleError);
    }

    setPasswordCN(songId: number, mod: Module): Promise<null> {
        const url = `${this.designerUrl}/song/${songId}/module_cn/edit`;
        let has_password = 1;
        if (mod.password == '') {
            has_password = 0;
        }
        return this.http.post(url,
            JSON.stringify({
                password: mod.password,
                has_password: has_password,
                is_enabled: mod.is_enabled,
                name: mod.name,
                song_enabled: mod.song_enabled
            }),
            this.authService.getOptions())
            .toPromise()
            .then(response => response.json() as Module)
            .catch(this.handleError);
    }
/*
setPasswordDW(songId: number, password: string): Promise < null > {
    const url = `${this.designerUrl}/song/${songId}/module_dw/edit`;
    var has_password = true;
    if(password == "") {
        has_password = false;
    }
        return this.http.post(url,
        JSON.stringify({
            password: password,
            has_password: has_password,
            is_enabled: true
        }),
        this.authService.getOptions())
        .toPromise()
        .then(response => response.json() as Module)
        .catch(this.handleError);
}

setPasswordGE(songId: number, password: string): Promise < null > {
    const url = `${this.designerUrl}/song/${songId}/module_ge/edit`;
    var has_password = true;
    if(password == "") {
        has_password = false;
    }
        return this.http.post(url,
        JSON.stringify({
            password: password,
            has_password: has_password,
            is_enabled: true
        }),
        this.authService.getOptions())
        .toPromise()
        .then(response => response.json() as Module)
        .catch(this.handleError);
}

setPasswordLS(songId: number, password: string): Promise < null > {
    const url = `${this.designerUrl}/song/${songId}/module_ls/edit`;
    var has_password = true;
    if(password == "") {
        has_password = false;
    }
        return this.http.post(url,
        JSON.stringify({
            password: password,
            has_password: has_password,
            is_enabled: true
        }),
        this.authService.getOptions())
        .toPromise()
        .then(response => response.json() as Module)
        .catch(this.handleError);
}

setPasswordLT(songId: number, password: string): Promise < null > {
    const url = `${this.designerUrl}/song/${songId}/module_lt/edit`;
    var has_password = true;
    if(password == "") {
        has_password = false;
    }
        return this.http.post(url,
        JSON.stringify({
            password: password,
            has_password: has_password,
            is_enabled: true
        }),
        this.authService.getOptions())
        .toPromise()
        .then(response => response.json() as Module)
        .catch(this.handleError);
}

setPasswordQU(songId: number, password: string): Promise < null > {
    const url = `${this.designerUrl}/song/${songId}/module_qu/edit`;
    var has_password = true;
    if(password == "") {
        has_password = false;
    }
        return this.http.post(url,
        JSON.stringify({
            password: password,
            has_password: has_password,
            is_enabled: true
        }),
        this.authService.getOptions())
        .toPromise()
        .then(response => response.json() as Module)
        .catch(this.handleError);
}*/

setModuleName(songId: number, mod: Module): Promise < null > {
    const url = `${this.designerUrl}/song/${songId}/${mod.module_type}/edit`;
    return this.http.post(url,
        JSON.stringify({
            name: mod.name,
            is_enabled: mod.is_enabled,
            password: mod.password,
            has_password: mod.has_password,
            song_enabled: mod.song_enabled
        }),
        this.authService.getOptions())
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
}

enableModule(songId: number, mod: Module): Promise < null > {
    const url = `${this.designerUrl}/song/${songId}/${mod.module_type}/edit`;
    return this.http.post(url,
        JSON.stringify({
            name: mod.name,
            is_enabled: 1,
            password: mod.password,
            has_password: mod.has_password,
            song_enabled: mod.song_enabled
        }),
        this.authService.getOptions())
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
}

disableModule(songId: number, mod: Module): Promise < null > {
    const url = `${this.designerUrl}/song/${songId}/${mod.module_type}/edit`;
    return this.http.post(url,
        JSON.stringify({
            name: mod.name,
            is_enabled: 0,
            password: mod.password,
            has_password: mod.has_password,
            song_enabled: mod.song_enabled
        }),
        this.authService.getOptions())
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
}
}
