import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../services/professor.service';
import { CLSPClass, CreateClass } from '../models/clsp-class';
import { ProfInfo } from '../models/professor-info';
import { Router } from '@angular/router';

@Component({
    selector: 'app-professor-dashboard',
    templateUrl: '../templates/professor-dashboard.component.html'
})

export class ProfessorDashboardComponent implements OnInit {

    private classes: CLSPClass[];
    private profInfo: ProfInfo[];
    private newClass: CreateClass;
    private createNumber = -1;

    constructor(
        private professorService: ProfessorService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.getDashboard();
    }

    getClasses(): void {
        this.professorService.getClasses().then(classes => {
            this.classes = classes;
        });
    }

    getDashboard(): void {
        this.professorService.getDashboard().then(profInfo => {
            this.profInfo = profInfo;
            console.log(profInfo);
        });
    }

    toClass(clspClass: CLSPClass): void {
        console.log(clspClass);
        this.router.navigate(['./professor/class', clspClass.class_id]);
    }

    createClass(courseId: number): void {
        this.createNumber = courseId;
        this.newClass = new CreateClass();
        this.newClass.course_id = courseId;
    }

    onSubmit(): void {
        this.professorService.createClass(this.newClass).then(
            clspClass => {
                const dbClass = new CLSPClass();
                dbClass.class_description = clspClass.description;
                dbClass.class_id = clspClass.id;
                dbClass.class_name = clspClass.name;
                const profIndex = this.profInfo.findIndex(x => x.course_id == this.createNumber);
                this.profInfo[profIndex].classes.push(dbClass);
                this.createNumber = -1;
            })
            .catch(
            error => {
                console.log(error);
            }
            );
    }

    onDelete(deleteClass: CLSPClass) {
        console.log(deleteClass);
        this.professorService.deleteClass(deleteClass.class_id).then(
            () => {
                for (const info of this.profInfo) {
                    info.classes = info.classes.filter(x => x != deleteClass);
                }
            });
    }
}
