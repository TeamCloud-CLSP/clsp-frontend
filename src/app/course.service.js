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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var CourseService = (function () {
    function CourseService(http) {
        this.http = http;
        this.coursesUrl = 'http://localhost:8000/api/designer/courses';
        this.headers = new http_1.Headers();
    }
    CourseService.prototype.getCourses = function () {
        this.headers.append('Content-Type', 'application/json');
        var options = new http_1.RequestOptions({ withCredentials: true });
        return this.http.get(this.coursesUrl, options)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    CourseService.prototype.handleError = function (error) {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    };
    CourseService.prototype.getCourse = function (id) {
        var url = this.coursesUrl + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    CourseService.prototype.update = function (course) {
        var url = this.coursesUrl + "/" + course.id;
        return this.http
            .put(url, JSON.stringify(course), { headers: this.headers })
            .toPromise()
            .then(function () { return course; })
            .catch(this.handleError);
    };
    CourseService.prototype.create = function (name) {
        return this.http
            .post(this.coursesUrl, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    CourseService.prototype.delete = function (id) {
        var url = this.coursesUrl + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    CourseService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CourseService);
    return CourseService;
}());
exports.CourseService = CourseService;
//# sourceMappingURL=course.service.js.map