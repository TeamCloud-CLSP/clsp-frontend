import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Course, Language, Unit, Song, Module } from '../models/course';
import { ProfRegistration } from '../models/profregistration';
import { CulturalNote } from '../models/modules/CulturalNote';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';

@Injectable()
export class CourseService {
    private designerUrl = environment.apiBase + 'api/designer';

    constructor(private http: Http,
                private authService: AuthenticationService) {
    }

    getCourses(): Promise<Course[]> {
        return this.http.get(this.designerUrl + '/courses', this.authService.getOptions())
            .toPromise()
            .then(response => response.json().data as Course[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }

    getCourse(id: number): Promise<Course> {
        const url = `${this.designerUrl}/course/${id}`;
        return this.http.get(url, this.authService.getOptions())
            .toPromise()
            .then(response => response.json() as Course)
            .catch(this.handleError);
    }

    update(course: Course): Promise<Course> {
        const url = `${this.designerUrl}/course/${course.id}`;
        return this.http
            .post(url, JSON.stringify({
                name: course.name,
                description: course.description,
                language_id: +course.language_id
            }), this.authService.getOptions())
            .toPromise()
            .then(() => course)
            .catch(this.handleError);
    }

    createCourse(course: Course): Promise<Course> {
        //console.log(course);
        const url = `${this.designerUrl}/course`;
        return this.http
            .post(url, JSON.stringify({
                name: course.name,
                description: course.description,
                language_id: +course.language_id
            }), this.authService.getOptions())
            .toPromise()
            .then(response => response.json() as Course)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.designerUrl}/course/${id}`;
        return this.http.delete(url, this.authService.getOptions())
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    getProfRegistrations(): Promise<ProfRegistration[]> {
        const url = `${this.designerUrl}/registrations/professor`;
        return this.http.get(url, this.authService.getOptions())
            .toPromise()
            .then(response => response.json().data as ProfRegistration[])
            .catch(this.handleError);
    }

    getProfRegistrationsByCourse(id: number): Promise<ProfRegistration[]> {
        const url = `${this.designerUrl}/course/${id}/registrations/professor`;
        return this.http.get(url, this.authService.getOptions())
            .toPromise()
            .then(response => response.json().data as ProfRegistration[])
            .catch(this.handleError);
    }

    createProfessorRegistration(reg: ProfRegistration): Promise<void> {
        const url = `${this.designerUrl}/registrations/professor`;
        return this.http.post(url,
            JSON.stringify({
                date_start: reg.date_start,
                date_end: reg.date_end,
                course_id: reg.course_id
            }), this.authService.getOptions())
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    deleteProfRegistration(id: number): Promise<void> {
        const url = `${this.designerUrl}/registrations/professor/${id}`;
        return this.http.delete(url, this.authService.getOptions())
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    getLanguages(): Promise<Language[]> {
        const url = `${this.designerUrl}/languages`;
        return this.http.get(url, this.authService.getOptions())
            .toPromise()
            .then(response => response.json().data as Language[])
            .catch(this.handleError);
    }

    getUnits(courseId: number): Promise<Unit[]> {
        const url = `${this.designerUrl}/course/${courseId}/units`;
        return this.http.get(url, this.authService.getOptions())
            .toPromise()
            .then(response => response.json().data as Unit[])
            .catch(this.handleError);
    }

    createUnit(unit: Unit): Promise<Unit> {
        const url = `${this.designerUrl}/unit`;
        return this.http.post(url,
            JSON.stringify({
                name: unit.name,
                description: unit.description,
                course_id: unit.course_id,
                weight: unit.weight
            }),
            this.authService.getOptions())
            .toPromise()
            .then(response => response.json() as Unit)
            .catch(this.handleError);
    }

    getUnit(unitId: number): Promise<Unit> {
        const url = `${this.designerUrl}/unit/${unitId}`;
        return this.http.get(url, this.authService.getOptions())
            .toPromise()
            .then(response => response.json() as Unit)
            .catch(this.handleError);
    }

    updateUnit(unit: Unit): Promise<Unit> {
        const url = `${this.designerUrl}/unit/${unit.id}`;
        return this.http.post(url,
            JSON.stringify({ name: unit.name, description: unit.description, weight: unit.weight }),
            this.authService.getOptions())
            .toPromise()
            .then(response => response.json() as Unit)
            .catch(this.handleError);

    }

    getSongs(unitId: number): Promise<Song[]> {
        const url = `${this.designerUrl}/unit/${unitId}/songs`;
        return this.http.get(url, this.authService.getOptions())
            .toPromise()
            .then(response => response.json().data as Song[])
            .catch(this.handleError);
    }

    getSong(songId: number): Promise<Song> {
        const url = `${this.designerUrl}/song/${songId}`;
        //console.log('song options');
        //console.log(this.authService.getOptions());
        return this.http.get(url, this.authService.getOptions())
            .toPromise()
            .then(response => {
                //console.log(response.json());
                return response.json() as Song;
            })
            .catch(this.handleError);
    }

    createSong(song: Song): Promise<Song> {
        const url = `${this.designerUrl}/song`;
        return this.http.post(url,
            JSON.stringify({
                title: song.title,
                album: song.album,
                artist: song.artist,
                description: song.description,
                lyrics: song.lyrics,
                file_name: song.file_name,
                file_type: song.file_type,
                embed: song.embed,
                weight: song.weight,
                unit_id: song.unit_id
            }),
            this.authService.getOptions())
            .toPromise()
            .then(response => response.json() as Song)
            .catch(this.handleError);
    }

    deleteSong(song: Song): Promise<null> {
        const url = `${this.designerUrl}/song/${song.id}`;
        return this.http.delete(url, this.authService.getOptions())
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

updateSong(song: Song): Promise < null > {
    const url = `${this.designerUrl}/song/${song.id}`;

    return this.http.post(url,
        JSON.stringify({
            title: song.title,
            album: song.album,
            artist: song.artist,
            description: song.description,
            lyrics: song.lyrics,
            file_name: song.file_name,
            file_type: song.file_type,
            embed: song.embed,
            weight: song.weight,
            unit_id: song.unit_id
        }),
        this.authService.getOptions())
        .toPromise()
        .then(response => response.json() as Unit)
        .catch(this.handleError);
}

createCulturalNote(note: CulturalNote): Promise < CulturalNote > {
    const url = `${this.designerUrl}/keyword`;
    const data = JSON.stringify({
        song_id: note.songId,
        phrase: note.phrase,
        description: note.description
    });
    //console.log(data);
    return this.http.post(url,
        data,
        this.authService.getOptions())
        .toPromise()
        .then(response => response.json() as CulturalNote)
        .catch(this.handleError);
}

// updateCulturalNote(note: any): Promise<null> {
// const url = `${this.designerUrl}/song/${song.id}`;
// return this.http.post(url,
//     JSON.stringify({
//         title: song.title,
//         album: song.album,
//         artist: song.artist,
//         description: song.description,
//         lyrics: song.lyrics,
//         file_name: song.file_name,
//         file_type: song.file_type,
//         embed: song.embed,
//         weight: song.weight,
//         unit_id: song.unit_id
//     }),
//     this.options)
//     .toPromise()
//     .then(response => response.json() as Unit)
//     .catch(this.handleError);
// }

getCulturalNote(songId: number): Promise < CulturalNote[] > {
    const url = `${this.designerUrl}/song/${songId}/keywords`;
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

updateCulturalNotes(note: CulturalNote): Promise < CulturalNote > {
    const url = `${this.designerUrl}/keyword/${note.id}`;
    return this.http.post(
        url,
        JSON.stringify({
            phrase: note.phrase,
            description: note.description
        }),
        this.authService.getOptions()
    )
        .toPromise()
        .then(response => response.json() as CulturalNote)
        .catch(this.handleError);
}

getModules(songId: number): Promise < Module[] > {
    const url = `${this.designerUrl}/song/${songId}/modules`;
    return this.http.get(url, this.authService.getOptions())
        .toPromise()
        .then(response => response.json().data as Module[])
        .catch(this.handleError);
}

deleteUnit(unit: Unit): Promise < null > {
    const url = `${this.designerUrl}/unit/${unit.id}`;
    return this.http.delete(url, this.authService.getOptions())
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
}
}
