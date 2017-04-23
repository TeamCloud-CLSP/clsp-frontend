import { Component, OnInit, Directive } from '@angular/core';
import { MediaService } from '../services/media.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Media } from '../models/course';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common';

@Component({
    selector: 'app-media-upload',
    templateUrl: '../templates/media-upload.component.html'
})


@Directive({ selector: '[ng2FileSelect]' })

@Directive({ selector: '[ng2FileDrop]' })



export class MediaUploadComponent implements OnInit {

    private mediaUrl = '/api/designer/media';
    public uploader: FileUploader;

    public hasBaseDropZoneOver = false;
    files: Media[];
    nameEdit: boolean;
    nameEditId: number;


    constructor(private mediaService: MediaService,
                private route: ActivatedRoute,
                private location: Location,
                private sanitizer: DomSanitizer,
                private router: Router,
                private authService: AuthenticationService ) {
    }

    ngOnInit(): void {
        //this.uploader.setHeader('Authorization', 'Bearer ' + this.authService.getToken() );
        this.uploader = new FileUploader({
            url: this.mediaUrl,
            headers: [{
                name: 'Authorization',
                value: 'Bearer ' + this.authService.getToken()
            }]
        });
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                this.getFiles();
            };
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
        let name: string;
        for (let i = 0, len = this.files.length; i < len; i++) {
            if (this.files[i].id == id) {
                name = this.files[i].name;
            }
        }
        this.mediaService.editMedia(id, name);
        this.nameEdit = false;
        this.nameEditId = -1;
    }

    deleteFile(id: number) {
        this.mediaService.deleteMedia(id)
            .then(
                response => {
                    if (response) {
                        this.getFiles();
                    }
                }
            );
        //this.getFiles();
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
