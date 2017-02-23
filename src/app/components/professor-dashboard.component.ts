import { Component } from '@angular/core';
import {ProfessorService} from "../services/professor.service";
import {CLSPClass} from "../models/clsp-class";
@Component({
    moduleId: module.id,
    selector: 'professor-dashboard',
    templateUrl: '../templates/professor-dashboard.component.html'
})

export class ProfessorDashboardComponent {

    private classes: CLSPClass[];

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
