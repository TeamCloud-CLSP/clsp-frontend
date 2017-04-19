import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Unit, Module, Media } from '../../models/course';
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ModuleService } from '../../services/module.service';
import { StudentService } from '../../services/student.service';

@Component({
    selector: 'app-student-song-detail',
    templateUrl: '../../templates/student/student-song-detail.component.html'
})

export class StudentSongDetailComponent implements OnInit {
    song: any;
    unit: Unit;
    modules: Module[];
    courseName: string;
    currentModule: string;
    media: Media[];
    publicBaseUrl: string;
    enteredPassword: string;
    passwordValidated: boolean;
    displayPassError: boolean;

    constructor(private studentService: StudentService,
        private moduleService: ModuleService,
        private route: ActivatedRoute,
        private location: Location,
        private sanitizer: DomSanitizer,
        private router: Router) {

    }

    ngOnInit() {
        this.publicBaseUrl = '/files/';
        this.route.params
            .switchMap((params: Params) => {
                console.log(params);
                return this.studentService.getSong(+params['song_id']);
            })
            .subscribe(song => {

                this.song = song;
                if (this.song.embed) {
                    this.song.embed_display = this.sanitizer.bypassSecurityTrustHtml(song.embed_display);                    
                }
                console.log(song);
            });

        const names = {
            'module_cn': 'Cultural Notes',
            'module_dw': 'Discussion and Writing',
            'module_qu': 'Questions for Understanding',
            'module_ge': 'Grammar Exercises',
            'module_lt': 'Listening Tasks',
            'module_ls': 'Listening Suggestions'
        };

        this.route.params
            .switchMap((params: Params) => this.studentService.getModules(+params['song_id']))
            .subscribe(modules => {
                console.log(modules);
                this.modules = modules.filter(x => x.is_enabled == 1);
                for (let i = 0; i < this.modules.length; i++) {
                    this.modules[i].name = this.modules[i].name || this.modules[i].module_type;
                    this.modules[i].name = names[this.modules[i].name] || this.modules[i].name;
                }

                this.currentModule = this.modules[0].module_type;
            });

        this.route.params
            .switchMap((params: Params) => this.studentService.getMedia(+params['song_id']))
            .subscribe(media => {
                console.log(media);

                this.media = media;
            });

        this.route.params
            .switchMap((params: Params) => this.studentService.getUnit(+params['unit_id']))
            .subscribe(unit => {
                // console.log("got unit");
                this.unit = unit;

                this.studentService.getCourse(unit.course_id).then(name => {
                    this.courseName = name;
                });
            });
        this.passwordValidated = false;
        this.enteredPassword = '';
    }

    setCurrModule(name: string) {
        this.currentModule = name;
    }

    setModuleName(mod: Module) {
        this.moduleService.setModuleName(this.song.id, mod);
    }

    validatePassword() {
        if (this.enteredPassword == this.modules[0].password) {
            this.passwordValidated = true;
        } else {
            this.displayPassError = true;
            console.log(this.modules[0].password);
            console.log(this.enteredPassword);
        }
    }
}
