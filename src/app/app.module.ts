import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';


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
        HttpModule
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
