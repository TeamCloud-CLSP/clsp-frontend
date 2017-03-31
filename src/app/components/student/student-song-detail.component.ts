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
                this.song.embed = this.sanitizer.bypassSecurityTrustHtml(song.embed);
                console.log(song);
            });

        let names = {
            'module_cn': 'Cultural Notes',
            'module_dw': 'Discussion and Writing',
            'module_qu': 'Questions for Understanding',
        };

        this.route.params
            .switchMap((params: Params) => this.studentService.getModules(+params['song_id']))
            .subscribe(modules => {
                console.log(modules);
                this.modules = modules;
                for (let i = 0; i < this.modules.length; i++) {
                    this.modules[i].name = this.modules[i].name || this.modules[i].module_type;
                    this.modules[i].name = names[this.modules[i].name] || this.modules[i].name;
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
}
