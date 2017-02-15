import { Component, Input } from '@angular/core';
import { Course } from './course'
@Component({
    selector: 'course-detail',
    template: `
        <div *ngIf = "course">
            <h2>{{course.name}} details</h2>
            <div><label>id : </label>{{course.id}}</div>
            <div>
                <label> name: </label>
                <input [(ngModel)] = "course.name" placeholder = "name"/>
            </div>
        </div>
    `
})














export class CourseDetailComponent {
    @Input() course: Course;
}
