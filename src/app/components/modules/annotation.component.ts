import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params}   from '@angular/router';
import {Location}                 from '@angular/common';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Router}   from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
    moduleId: module.id,
    selector: 'clsp-annotation',
    templateUrl: '../../templates/modules/annotation.component.html'
})

export class AnnotationComponent implements OnInit {
    @Input() content: string;
    @Input() description: string;

    constructor(
                private route: ActivatedRoute,
                private location: Location,
                private sanitizer: DomSanitizer,
                private router: Router) {
    }

    ngOnInit() {
        console.log("annotation created");
    }

    onClickAnnotation(element: HTMLElement) {
        let popover = element.querySelector('.pop-floating');
        // if(popover.style.display == "inline-block") {
        //     popover.style.display = "none";
        // } else {
        //     popover.style.display = "inline-block"
        // }
    }
}