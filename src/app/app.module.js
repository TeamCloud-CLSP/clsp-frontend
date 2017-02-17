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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
// Imports for loading & configuring the in-memory web api
var angular_in_memory_web_api_1 = require('angular-in-memory-web-api');
var in_memory_data_service_1 = require('./services/in-memory-data.service');
// Services
var course_service_1 = require('./services/course.service');
// Components
var courses_component_1 = require('./components/courses.component');
var app_component_1 = require('./app.component');
var navbar_component_1 = require('./components/navbar.component');
var course_detail_component_1 = require('./components/course-detail.component');
var dashboard_component_1 = require('./components/dashboard.component');
var prof_registrations_component_1 = require('./components/prof-registrations.component');
//Routing
var app_routing_module_1 = require('./app-routing.module');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpModule,
                angular_in_memory_web_api_1.InMemoryWebApiModule.forRoot(in_memory_data_service_1.InMemoryDataService, { passThruUnknownUrl: true })
            ],
            declarations: [
                app_component_1.AppComponent,
                course_detail_component_1.CourseDetailComponent,
                courses_component_1.CoursesComponent,
                dashboard_component_1.DashboardComponent,
                navbar_component_1.NavbarComponent,
                prof_registrations_component_1.ProfRegistrationsComponent
            ],
            providers: [course_service_1.CourseService],
            bootstrap: [app_component_1.AppComponent, navbar_component_1.NavbarComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map