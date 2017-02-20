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
var user_1 = require('../models/user');
require('rxjs/add/operator/switchMap');
var admin_service_1 = require('../services/admin.service');
var AdminDashboardComponent = (function () {
    function AdminDashboardComponent(adminService, router) {
        this.adminService = adminService;
        this.router = router;
    }
    AdminDashboardComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    AdminDashboardComponent.prototype.getUsers = function () {
        var _this = this;
        this.adminService.getUsers().then(function (users) {
            _this.students = users.filter(function (u) { return u.is_student == true; });
            _this.professors = users.filter(function (u) { return u.is_professor == true; });
            _this.designers = users.filter(function (u) { return u.is_designer == true; });
            console.log(users);
        });
    };
    AdminDashboardComponent.prototype.delete = function (user) {
        var _this = this;
        this.adminService
            .deleteUser(user.id)
            .then(function () {
            _this.students = _this.students.filter(function (u) { return u !== user; });
            _this.professors = _this.professors.filter(function (u) { return u !== user; });
            _this.designers = _this.designers.filter(function (u) { return u !== user; });
        });
    };
    AdminDashboardComponent.prototype.createDesigner = function () {
        this.newDesigner = new user_1.User();
    };
    AdminDashboardComponent.prototype.submitDesigner = function () {
        var _this = this;
        this.adminService.addDesigner(this.newDesigner)
            .then(function (designer) {
            _this.newDesigner = null;
            _this.designers.push(designer);
        });
    };
    AdminDashboardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'admin-dashboard',
            templateUrl: '../templates/admin-dashboard.component.html'
        }), 
        __metadata('design:paramtypes', [admin_service_1.AdminService, router_1.Router])
    ], AdminDashboardComponent);
    return AdminDashboardComponent;
}());
exports.AdminDashboardComponent = AdminDashboardComponent;
//# sourceMappingURL=admin-dashboard.component.js.map