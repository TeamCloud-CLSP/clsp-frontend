import {Component} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CourseService } from '../services/course.service';
import {Course} from "../models/course";
import {MockCourseService} from "../services/mock-course.service";


@Component({
    selector: 'clsp-course-form',
    templateUrl: 'app/templates/course-form-component.html'
})
export class CourseFormComponent {
    form: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private courseService: MockCourseService) {

    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: this.formBuilder.control('JAPN 1001')
        });
    }

    onSubmit(course: Course) {
        console.log(course);
        this.courseService.add(course);
    }
}