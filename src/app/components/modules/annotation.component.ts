import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { CulturalNote } from '../../models/modules/CulturalNote';
import { SafeHtml } from '@angular/platform-browser';
import { CourseService } from '../../services/course.service';

@Component({
    selector: 'app-annotation',
    templateUrl: '../../templates/modules/annotation.component.html'
})

export class AnnotationComponent implements OnInit {
    @Input() note: CulturalNote;
    @Input() isDesigner: boolean;
    safeDesc: SafeHtml;
    placement: string;
    status: string;

    constructor(
        private courseService: CourseService,
        private route: ActivatedRoute,
        private location: Location,
        private sanitizer: DomSanitizer,
        private router: Router) {
    }

    ngOnInit() {
        this.status = 'Save';
        this.placement = 'top';
        // console.log("annotation created");
        // console.log(this.note.phrase);
        // console.log($('what'));
        this.safeDesc = this.sanitizer.bypassSecurityTrustHtml(this.note.description);
    }

    updateAnnotation() {
        this.status = 'Saving...';
        this.courseService.updateCulturalNotes(this.note).then(
            note => {
                this.note = note;
                this.status = 'Save';
            }
        );
    }

    onClickAnnotation(element: HTMLElement, event: any) {
        // console.log(this.content);
        this.placement = 'bottom';

        const yHalf = window.innerHeight / 2;
        const xHalf = window.innerWidth / 2;

        const x = event.clientX;
        const y = event.clientY;


        if (x > xHalf) {
            this.placement = 'left';
        } else {
            this.placement = 'right';
        }

        const popover = element.querySelector('.pop-floating');
        // if(popover.style.display == "inline-block") {
        //     popover.style.display = "none";
        // } else {
        //     popover.style.display = "inline-block"
        // }
    }
}
