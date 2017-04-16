/**
 * Created by Zakir on 3/14/2017.
 */

import {Component, OnInit, Directive} from "@angular/core";
import {MediaService} from "../services/media.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import {Media} from "../models/course";
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { Location }                 from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'media-upload',
    templateUrl: '../templates/media-upload.component.html'
})


@Directive({ selector: '[ng2FileSelect]' })

@Directive({ selector: '[ng2FileDrop]' })

export class MediaUploadComponent implements OnInit {

    private mediaUrl = "/api/designer/media";
    public uploader: FileUploader = new FileUploader({url: this.mediaUrl});
    public hasBaseDropZoneOver: boolean = false;
    files: Media[];
    nameEdit: boolean;
    nameEditId: number;


    constructor(private mediaService: MediaService,
                private route: ActivatedRoute,
                private location: Location,
                private sanitizer: DomSanitizer,
                private router: Router) {
    }

    ngOnInit(): void {
        this.getFiles();
        this.nameEdit = false;
        this.nameEditId = -1;
    }

    editName(id: number) {
        this.nameEdit = true;
        this.nameEditId = id;
    }

    cancelNameEdit() {
        this.nameEdit = false;
        this.nameEditId = -1;
    }

    setName(id: number) {
        var name: string;
        for (var i = 0, len = this.files.length; i < len; i++) {
            if (this.files[i].id == id) {
                name = this.files[i].name;
            }
        }
        this.mediaService.editMedia(id, name);
        this.nameEdit = false;
        this.nameEditId = -1;
    }

    deleteFile(id: number) {
        this.mediaService.deleteMedia(id);
        this.getFiles();
    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    getFiles(): void {
        this.mediaService.getAllFiles().then(files => this.files = files);
    }

    goBack(): void {
        this.location.back();
    }
}

