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

    fileNames: string[];

    constructor(
        private mediaService: MediaService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.getFiles();
    }

    getFiles(): void {
        this.mediaService.getFiles().then(fileNames => this.fileNames = fileNames);
    }

    uploadFile(name: string) {
        this.mediaService.addFile(name)
            .then(name => {
                this.fileNames.push(name);
            });
        this.getFiles();
    }
}