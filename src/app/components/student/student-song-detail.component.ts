import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params}   from '@angular/router';
import {Location}                 from '@angular/common';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Course, Unit, Song, Module} from '../../models/course';
import {Router}   from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {ModuleService} from "../../services/module.service";
import {StudentService} from "../../services/student.service";

@Component({
    moduleId: module.id,
    selector: 'student-song-detail',
    templateUrl: '../../templates/student/student-song-detail.component.html'
})

export class StudentSongDetailComponent implements OnInit {
    song: any;
    unit: Unit;
    modules: Module[];
    courseName: string;
    currentModule: string;

    constructor(private studentService: StudentService,
                private moduleService: ModuleService,
                private route: ActivatedRoute,
                private location: Location,
                private sanitizer: DomSanitizer,
                private router: Router) {
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => {
                console.log(params);
                return this.studentService.getSong(+params['song_id'])
            })
            .subscribe(song => {
                this.song = song;
            });

        let names = {
            'module_cn': 'Cultural Notes',
            'module_dw': 'Discussion and Writing',
        };

        this.route.params
            .switchMap((params: Params) => this.studentService.getModules(+params['song_id']))
            .subscribe(modules => {
                console.log(modules);
                this.modules = modules;
                for (let i = 0; i < this.modules.length; i++) {
                    this.modules[i].name = this.modules[i].name || this.modules[i].module_type;
                }

                this.currentModule = this.modules[0].module_type;
            });


        this.route.params
            .switchMap((params: Params) => this.studentService.getUnit(+params['unit_id']))
            .subscribe(unit => {
                //console.log("got unit");
                this.unit = unit;

                this.studentService.getCourse(unit.course_id).then(name => {
                    this.courseName = name;
                });
            });
    }

    setCurrModule(name: string) {
        this.currentModule = name;
    }

    setModuleName(mod: Module) {
        this.moduleService.setModuleName(this.song.id, mod);
    }

    setPassword(type: string) {
        if (type == "module_cn") {
            this.moduleService.setPasswordCN(this.song.id, this.modules[0].password).then(value => {
                //console.log("password updated");
            });
        } else if (type == "module_dw") {
            this.moduleService.setPasswordDW(this.song.id, this.modules[1].password).then(value => {
                //console.log("password updated");
            });
        } else if (type == "module_ge") {
            this.moduleService.setPasswordGE(this.song.id, this.modules[2].password).then(value => {
                //console.log("password updated");
            });
        } else if (type == "module_ls") {
            this.moduleService.setPasswordLS(this.song.id, this.modules[3].password).then(value => {
                //console.log("password updated");
            });
        } else if (type == "module_lt") {
            this.moduleService.setPasswordLT(this.song.id, this.modules[4].password).then(value => {
                //console.log("password updated");
            });
        } else if (type == "module_qu") {
            this.moduleService.setPasswordQU(this.song.id, this.modules[5].password).then(value => {
                //console.log("password updated");
            });
        }
    }
}
