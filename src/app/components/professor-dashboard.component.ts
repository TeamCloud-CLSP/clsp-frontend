import { Component } from '@angular/core';
import {ProfessorService} from "../services/professor.service";
import {Class} from "../models/class";
@Component({
    moduleId: module.id,
    selector: 'professor-dashboard',
    templateUrl: '../templates/professor-dashboard.component.html'
})

export class ProfessorDashboardComponent {

    private classes: Class[];

    constructor(
        private professorService: ProfessorService
    ) {
        this.getClasses();
    }

    getClasses(): void {
        this.professorService.getClasses().then(classes => {
            this.classes = classes;
            console.log(classes);
        });
    }




}
