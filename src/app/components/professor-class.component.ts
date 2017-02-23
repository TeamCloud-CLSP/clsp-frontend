import { Component } from '@angular/core';
import { ProfessorService } from "../services/professor.service";
import { CLSPClass } from "../models/clsp-class";
import { User } from "../models/user";
@Component({
    moduleId: module.id,
    selector: 'professor-class',
    templateUrl: '../templates/professor-class.component.html'
})

export class ProfessorClassComponent {

    private currClass: CLSPClass;
    private students: User;

    constructor(
        private professorService: ProfessorService
    ) {
        this.getClass();
    }

    getClass(): void {
        null

    }




}
