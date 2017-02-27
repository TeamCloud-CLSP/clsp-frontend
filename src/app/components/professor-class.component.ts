import { Component, OnInit } from '@angular/core';
import { ProfessorService } from "../services/professor.service";
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { CLSPClass, SingleClass } from "../models/clsp-class";
import {StudentRegistration, Student} from "../models/studentregistration";
import { User } from "../models/user";
@Component({
    moduleId: module.id,
    selector: 'professor-class',
    templateUrl: '../templates/professor-class.component.html'
})

export class ProfessorClassComponent implements OnInit {

    private currClass: SingleClass;
    private students: Student[];
    private studentRegistration: StudentRegistration;
    private newRegistration: StudentRegistration;

    constructor(
        private professorService: ProfessorService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.professorService.getClass(+params['id']))
            .subscribe(clspClass => {
                this.currClass = clspClass;
                this.professorService.getStudentRegistrationForClass(this.currClass.id).then(registration => {
                    this.studentRegistration = registration
                    this.professorService.getStudents(registration.student_registration_id).then(
                        students => this.students = students
                    );
                });
            });
    }

    deleteStudent(student: Student): void {
        this.professorService.deleteStudent(student.id)
            .then(() => this.students = this.students.filter(x => x != student));
    }

    openRegistration(): void {
        this.newRegistration = new StudentRegistration();
        this.newRegistration.class_id = +this.currClass.id;
    }

    onSubmit(): void {
        this.newRegistration.student_registration_date_end = new Date(this.newRegistration.student_registration_date_end).getTime() / 1000;
        this.newRegistration.student_registration_date_start = new Date(this.newRegistration.student_registration_date_start).getTime() / 1000;
        this.professorService.createStudentRegistration(this.newRegistration).then(() => {
            this.newRegistration = null;
            this.ngOnInit()
        });
    }


}
