import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './services/in-memory-data.service';

// Services
import { CourseService } from './services/course.service'

// Components
import { CoursesComponent } from './components/courses.component'
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
        FormsModule,
        AppRoutingModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService, { passThruUnknownUrl: true })
    ],
    declarations: [
        AppComponent,
        CourseDetailComponent,
        CoursesComponent,
        DashboardComponent,
        NavbarComponent,
        ProfRegistrationsComponent
    ],
    providers: [CourseService],
    bootstrap: [AppComponent, NavbarComponent]
})
export class AppModule { }
