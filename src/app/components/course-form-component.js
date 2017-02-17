"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var mock_course_service_1 = require("../services/mock-course.service");
var CourseFormComponent = (function () {
    function CourseFormComponent(formBuilder, courseService) {
        this.formBuilder = formBuilder;
        this.courseService = courseService;
    }
    CourseFormComponent.prototype.ngOnInit = function () {
        this.form = this.formBuilder.group({
            name: this.formBuilder.control('JAPN 1001')
        });
    };
    CourseFormComponent.prototype.onSubmit = function (course) {
        console.log(course);
        this.courseService.add(course);
    };
    CourseFormComponent = __decorate([
        core_1.Component({
            selector: 'clsp-course-form',
            templateUrl: 'app/templates/course-form-component.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, mock_course_service_1.MockCourseService])
    ], CourseFormComponent);
    return CourseFormComponent;
}());
exports.CourseFormComponent = CourseFormComponent;
//# sourceMappingURL=course-form-component.js.map