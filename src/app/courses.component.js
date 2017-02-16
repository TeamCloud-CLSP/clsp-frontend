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
var course_service_1 = require('./course.service');
var router_1 = require('@angular/router');
var CoursesComponent = (function () {
    function CoursesComponent(courseService, router) {
        this.courseService = courseService;
        this.router = router;
        this.title = 'Course List';
    }
    CoursesComponent.prototype.getCourses = function () {
        var _this = this;
        this.courseService.getCourses().then(function (courses) { return _this.courses = courses; });
    };
    CoursesComponent.prototype.ngOnInit = function () {
        this.getCourses();
    };
    CoursesComponent.prototype.onSelect = function (course) {
        this.selectedCourse = course;
    };
    CoursesComponent.prototype.gotoCourse = function () {
        this.router.navigate(['./course', this.selectedCourse.id]);
    };
    CoursesComponent.prototype.toCourse = function (course) {
        this.router.navigate(['./course', course.id]);
    };
    CoursesComponent.prototype.add = function (name) {
        var _this = this;
        name = name.trim();
        if (!name) {
            return;
        }
        this.courseService.create(name)
            .then(function (course) {
            _this.courses.push(course);
            _this.selectedCourse = null;
        });
    };
    CoursesComponent.prototype.delete = function (course) {
        var _this = this;
        this.courseService
            .delete(course.id)
            .then(function () {
            _this.courses = _this.courses.filter(function (c) { return c !== course; });
            if (_this.selectedCourse === course) {
                _this.selectedCourse = null;
            }
        });
    };
    CoursesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-courses',
            templateUrl: './templates/courses.component.html',
            styleUrls: ['./css/courses.component.css']
        }), 
        __metadata('design:paramtypes', [course_service_1.CourseService, router_1.Router])
    ], CoursesComponent);
    return CoursesComponent;
}());
exports.CoursesComponent = CoursesComponent;
//# sourceMappingURL=courses.component.js.map