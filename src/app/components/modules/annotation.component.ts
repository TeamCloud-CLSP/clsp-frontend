import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params}   from '@angular/router';
import {Location}                 from '@angular/common';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Router}   from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {CulturalNote} from "../../models/modules/CulturalNote";
import { SafeHtml } from '@angular/platform-browser';

@Component({
    moduleId: module.id,
    selector: 'clsp-annotation',
    templateUrl: '../../templates/modules/annotation.component.html'
})

export class AnnotationComponent implements OnInit {
    @Input() note: CulturalNote;
    safeDesc: SafeHtml;
    placement: string;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private sanitizer: DomSanitizer,
        private router: Router) {
    }

    ngOnInit() {
        this.placement = "top";
        //console.log("annotation created");
        //console.log(this.note.phrase);
        // console.log($('what'));
        this.safeDesc = this.sanitizer.bypassSecurityTrustHtml(this.note.description);
    }

    onClickAnnotation(element: HTMLElement, event: any) {
        // console.log(this.content);
        this.placement = "bottom";

        let yHalf = window.innerHeight / 2;
        let xHalf = window.innerWidth / 2;

        let x = event.clientX;
        let y = event.clientY;


        if (x > xHalf) {
            this.placement = "left";
        } else {
            this.placement = "right";
        }

        let popover = element.querySelector('.pop-floating');
        // if(popover.style.display == "inline-block") {
        //     popover.style.display = "none";
        // } else {
        //     popover.style.display = "inline-block"
        // }
    }
}
