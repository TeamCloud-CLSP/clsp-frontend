import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { CourseService } from './course.service'
import { CoursesComponent } from './courses.component'
import { AppComponent }  from './app.component';
import { NavbarComponent } from './navbar.component'
import { CourseDetailComponent } from './course-detail.component'
import { DashboardComponent } from './dashboard.component'

import {AppRoutingModule} from './app-routing.module'

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService)
    ],
    declarations: [
        AppComponent,
        CourseDetailComponent,
        CoursesComponent,
        DashboardComponent,
        NavbarComponent
    ],
    providers: [CourseService],
    bootstrap: [AppComponent, NavbarComponent]
})
export class AppModule { }
