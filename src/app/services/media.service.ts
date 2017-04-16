/**
 * Created by Zakir on 3/14/2017.
 */

import {Injectable} from "@angular/core";
import {Headers, RequestOptions, Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Media, MediaLink} from "../models/course";


@Injectable()
export class MediaService {
    private designerUrl = "/api/designer";
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

    getAVFiles(): Promise<Media[]> {
        const url = `${this.designerUrl}/avmedia`;
        return this.http
            .get(url, this.options)
            .toPromise()
            .then(response => response.json().data as Media[])
            .catch(this.handleError);
    }

    getLinkedMedia(songId: number): Promise<Media[]> {
        const url = `${this.designerUrl}/song/${songId}/media`;
        return this.http.get(url, this.options)
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

    createMediaLink(songId: number, mediaId: number): Promise<MediaLink> {
        const url = `${this.designerUrl}/song-media`;
        return this.http.post(url,
        JSON.stringify({
            song_id: songId,
            media_id: mediaId
        }),
        this.options)
            .toPromise()
            .then(response => response.json() as MediaLink)
            .catch(this.handleError);
    }

    deleteMediaLink(songId: number, mediaId: number): Promise<null> {
        const url = `${this.designerUrl}/song/${songId}/media/${mediaId}`;
        return this.http.delete(url,
            this.options)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    checkMediaLink(songId: number, mediaId: number): Promise<boolean> {
        const url = `${this.designerUrl}/song/${songId}/media/${mediaId}`;
        return this.http.get(url,
            this.options)
            .toPromise()
            .then(response => response.json() as boolean)
            .catch(this.handleError);
    }

}