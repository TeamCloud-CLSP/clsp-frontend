import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './services/in-memory-data.service';

// Services
import { CourseService } from './services/course.service'
import {MockCourseService} from "./services/mock-course.service";

// Components
import { CoursesComponent } from './components/courses.component'
import { CourseFormComponent } from './components/course-form-component'
import { AppComponent }  from './app.component';
import { NavbarComponent } from './components/navbar.component'
import { CourseDetailComponent } from './components/course-detail.component'
import { DashboardComponent } from './components/dashboard.component'
import {ProfRegistrationsComponent} from './components/prof-registrations.component'

//Routing
import {AppRoutingModule} from './app-routing.module'

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService, { passThruUnknownUrl: true })
    ],
    declarations: [
        AppComponent,
        CourseDetailComponent,
        CoursesComponent,
        CourseFormComponent,
        DashboardComponent,
        NavbarComponent,
        ProfRegistrationsComponent
    ],
    providers: [
        CourseService,
        MockCourseService
    ],
    bootstrap: [AppComponent, NavbarComponent]
})
export class AppModule { }
