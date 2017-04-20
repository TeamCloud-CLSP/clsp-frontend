import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { StudentClass } from '../models/clsp-class';
import { Unit, Song, Module, Media } from '../models/course';
import { Header, Question, AnswerCheck, Items } from '../models/modules/header';
import { CulturalNote } from '../models/modules/CulturalNote';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';

@Injectable()
export class StudentService {
  private baseUrl = environment.apiBase + 'api/student';

  constructor(private http: Http, private authService: AuthenticationService) {

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

  getClass(): Promise<StudentClass> {
    // TODO: response returns nothing, backend problems
    // var sample = {"id":1,"name":"CHIN 3002 A",
    //     "description":"advanced chinese course","date_start":0,"date_end":1497057872,
    //     "course_id":1,"registration_id":1};
    return this.http.get(this.baseUrl + '/class', this.authService.getOptions())
      .toPromise()
      .then(response => {
        return response.json() as StudentClass;
      })
      .catch(this.handleError);
  }

  getCourse(courseId: number): Promise<string> {
    console.log(courseId);
    return this.http.get(this.baseUrl + '/course/' + courseId, this.authService.getOptions())
      .toPromise()
      .then(response => {
        const name = response.json().name;
        return name;
      })
      .catch(this.handleError);
  }

  getUnits(courseId: number): Promise<Unit[]> {
    return this.http.get(this.baseUrl + '/course/' + courseId + '/units', this.authService.getOptions())
      .toPromise()
      .then(response => {
        return response.json().data as Unit[];
      })
      .catch(this.handleError);
  }

  getUnit(unitId: number): Promise<Unit> {
    return this.http.get(this.baseUrl + '/unit/' + unitId, this.authService.getOptions())
      .toPromise()
      .then(response => {
        return response.json() as Unit;
      })
      .catch(this.handleError);
  }

  getSongs(unitId: number): Promise<Song[]> {
    return this.http.get(this.baseUrl + '/unit/' + unitId + '/songs', this.authService.getOptions())
      .toPromise()
      .then(response => {
        return response.json().data as Song[];
      })
      .catch(this.handleError);
  }

  getSong(songId: number): Promise<any> {
    return this.http.get(this.baseUrl + '/song/' + songId, this.authService.getOptions())
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  getModules(songId: number): Promise<Module[]> {
    return this.http.get(this.baseUrl + '/song/' + songId + '/modules', this.authService.getOptions())
      .toPromise()
      .then(response => {
        return response.json().data as Module[];
      })
      .catch(this.handleError);
  }

  getMedia(songId: number): Promise<Media[]> {
    return this.http.get(this.baseUrl + '/song/' + songId + '/media', this.authService.getOptions())
      .toPromise()
      .then(response => {
        return response.json().data as Media[];
      })
      .catch(this.handleError);
  }

  getHeaders(songId: number, modName: string): Promise<Header[]> {
    const url = `${this.baseUrl}/song/${songId}/${modName}/headers`;
    return this.http.get(url, this.authService.getOptions())
      .toPromise()
      .then(response => response.json().data as Header[])
      .catch(this.handleError);
  }

  getHeader(headerId: number): Promise<Header> {
    const url = `${this.baseUrl}/header/${headerId}`;
    return this.http.get(url, this.authService.getOptions())
      .toPromise()
      .then(response => response.json() as Header)
      .catch(this.handleError);
  }

  getQuestions(headerId: number): Promise<Items> {
    const url = `${this.baseUrl}/header/${headerId}/items`;
    return this.http.get(url, this.authService.getOptions())
      .toPromise()
      .then(response => {
        var items = new Items();
        items.questions = response.json().data as Question[];
        items.next = response.json().next_id;
        items.prev = response.json().prev_id;
        return items;
      })
      .catch(this.handleError);
  }

  getCulturalNote(songId: number): Promise<CulturalNote[]> {
    const url = `${this.baseUrl}/song/${songId}/keywords`;
    return this.http.get(url, this.authService.getOptions())
      .toPromise()
      .then(response => {
        const data = response.json().data as CulturalNote[];
        for (let i = 0; i < data.length; i++) {
          data[i].songId = songId;
        }
        return data;
      })
      .catch(error => {
        console.log('ERRORR');
      });
  }

  checkAnswers(question: string): Promise<AnswerCheck[]> {
    const url = `${this.baseUrl}/checkitems`;
    return this.http.post(url, question, this.authService.getOptions())
      .toPromise()
      .then(response => response.json().data as AnswerCheck[])
      .catch(this.handleError);
  }

}
