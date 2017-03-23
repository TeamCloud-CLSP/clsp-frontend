/**
 * Created by Zakir on 3/14/2017.
 */

import {Component, OnInit, Directive} from "@angular/core";
import {MediaService} from "../services/media.service";
import {Router} from "@angular/router";
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import {GlobalParameters} from '../global-parameters';


@Component({
    moduleId: module.id,
    selector: 'media-upload',
    templateUrl: '../templates/media-upload.component.html'
})


@Directive({ selector: '[ng2FileSelect]' })

@Directive({ selector: '[ng2FileDrop]' })

export class MediaUploadComponent implements OnInit {

    /*fileNames: string[];*/
    private parameters = new GlobalParameters();
    private mediaUrl = this.parameters.url + "/api/designer/media";
    public uploader: FileUploader = new FileUploader({url: this.mediaUrl});
    public hasBaseDropZoneOver: boolean = false;

    constructor(private mediaService: MediaService,
                private router: Router) {
    }

    ngOnInit(): void {

    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }
}

