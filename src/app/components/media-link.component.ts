/**
 * Created by Zakir on 4/4/2017.
 */
import {Component, OnInit, Directive} from "@angular/core";
import {MediaService} from "../services/media.service";
import {Location}                 from '@angular/common';
import {Router, Params, ActivatedRoute} from "@angular/router";
import {GlobalParameters} from '../global-parameters';
import {Media, Unit, Song} from "../models/course";
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import {CourseService} from "../services/course.service";

@Component({
    moduleId: module.id,
    selector: 'media-link',
    templateUrl: '../templates/media-link.component.html'
})


export class MediaLinkComponent implements OnInit {

    private parameters = new GlobalParameters();
    private mediaUrl = this.parameters.url + "/api/designer/media";
    files: Media[];
    linked: Media[];
    song: Song;
    unit: Unit;
    courseName: string;


    constructor(private courseService: CourseService,
                private mediaService: MediaService,
                private router: Router,
                private route: ActivatedRoute,
                private location: Location,
                private sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        this.linked = [];
        this.route.params
            .switchMap((params: Params) => this.courseService.getSong(+params['id']))
            .subscribe(song => {
                //console.log(song);
                this.song = song;
                this.getLinkedMedia(song.id);
            });
        this.route.params
            .switchMap((params: Params) => this.courseService.getUnit(+params['unit_id']))
            .subscribe(unit => {
                //console.log("got unit");
                this.unit = unit;

                this.courseService.getCourse(unit.course_id).then(course => {
                    //console.log("got course name");
                    this.courseName = course.name;
                });
            });
        this.getFiles();
    }

    getFiles(): void {
        this.mediaService.getAllFiles().then(files => this.files = files);
    }

    getLinkedMedia(songId: number): void {
        this.mediaService.getLinkedMedia(songId).then(linked => this.linked = linked);
    }

    isLinked(mediaId: number): boolean {
        for (var i = 0, len = this.linked.length; i < len; i++) {
            if (this.linked[i].id == mediaId) {
                return true;
            }
        }
        return false;
    }

    linkMedia(mediaId: number) {
        this.mediaService.createMediaLink(this.song.id, mediaId);
        this.getLinkedMedia(this.song.id);
    }

    deleteLink(mediaId: number) {
        this.mediaService.deleteMediaLink(this.song.id, mediaId);
        this.getLinkedMedia(this.song.id);
    }
}