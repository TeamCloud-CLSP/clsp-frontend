import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';
import { Header } from '../../models/modules/header';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-student-question-module',
    templateUrl: '../../templates/student/student-question-module.html'
})

export class StudentQuestionModuleComponent implements OnInit {
    headers: Header[];
    newHeader: Header;
    @Input() songId: number;
    @Input() unitId: number;
    @Input() moduleType: string;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private sanitizer: DomSanitizer,
        private router: Router,
        private studentService: StudentService
    ) { }

    ngOnInit() {
        console.log(this.songId);
        this.studentService.getHeaders(this.songId, this.moduleType)
            .then(headers => {
                this.headers = headers;
            });
    }

    toHeader(header: Header): void {
    this.router.navigate(['./student/unit/' + this.unitId + '/song/' + this.songId + '/header/' + header.id]);
}

onChange(newSelection: string) {
    // console.log(newSelection);
}
}
