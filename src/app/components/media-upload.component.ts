/**
 * Created by Zakir on 3/14/2017.
 */

import {Component, OnInit} from "@angular/core";
import {MediaService} from "../services/media.service";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'media-upload',
    templateUrl: '../templates/media-upload.component.html'
})

export class MediaUploadComponent implements OnInit {

    constructor(
        private mediaService: MediaService,
        private router: Router
    ) { }

    ngOnInit(): void {

    }

    uploadFile(name: string) {

    }
}