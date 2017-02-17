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
var router_1 = require('@angular/router');
var profregistration_1 = require('../models/profregistration');
var course_service_1 = require('../services/course.service');
var router_2 = require('@angular/router');
var ProfRegistrationsComponent = (function () {
    function ProfRegistrationsComponent(courseService, route, router) {
        this.courseService = courseService;
        this.route = route;
        this.router = router;
    }
    ProfRegistrationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.courseService.getProfRegistrationsByCourse(+params['id']); })
            .subscribe(function (registrations) { return _this.profRegistrations = registrations; });
        this.route.params
            .switchMap(function (params) { return _this.courseService.getCourse(+params['id']); })
            .subscribe(function (course) { return _this.course = course; });
    };
    ProfRegistrationsComponent.prototype.getProfRegistrationsByCourse = function () {
        var _this = this;
        this.courseService.getProfRegistrationsByCourse(this.course.id)
            .then(function (registrations) { return _this.profRegistrations = registrations; });
    };
    ProfRegistrationsComponent.prototype.newCode = function () {
        this.newRegistration = new profregistration_1.ProfRegistration();
    };
    ProfRegistrationsComponent.prototype.onSubmit = function () {
        var _this = this;
        this.newRegistration.date_start = new Date(this.newRegistration.date_start).getTime() / 1000;
        this.newRegistration.date_end = new Date(this.newRegistration.date_end).getTime() / 1000;
        this.newRegistration.course_id = +this.course.id;
        this.courseService.createProfessorRegistration(this.newRegistration)
            .then(function () {
            _this.newRegistration = null;
            _this.getProfRegistrationsByCourse();
        });
    };
    ProfRegistrationsComponent.prototype.deleteReg = function (reg) {
        var _this = this;
        this.courseService.deleteProfRegistration(reg.id)
            .then(function () {
            _this.profRegistrations = _this.profRegistrations.filter(function (c) { return c !== reg; });
        });
    };
    ProfRegistrationsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'prof-registrations',
            templateUrl: '../templates/prof-registrations.component.html'
        }), 
        __metadata('design:paramtypes', [course_service_1.CourseService, router_1.ActivatedRoute, router_2.Router])
    ], ProfRegistrationsComponent);
    return ProfRegistrationsComponent;
}());
exports.ProfRegistrationsComponent = ProfRegistrationsComponent;
//# sourceMappingURL=prof-registrations.component.js.map