import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './services/in-memory-data.service';

// Services
import { CourseService } from './services/course.service'
import { AdminService } from './services/admin.service'
import {AccountService} from "./services/account.service";
import {ProfessorService} from "./services/professor.service";

// Components
import { CoursesComponent } from './components/courses.component'
import { AppComponent }  from './app.component';
import { NavbarComponent } from './components/navbar.component';
import { CourseDetailComponent } from './components/course-detail.component';
import { DashboardComponent } from './components/dashboard.component';
import { ProfRegistrationsComponent } from './components/prof-registrations.component';
import { AdminDashboardComponent } from './components/admin-dashboard.component';
import { AccountDashboardComponent } from './components/account-dashboard.component';
import { ProfessorDashboardComponent } from "./components/professor-dashboard.component";
import { UnitDetailComponent } from "./components/unit-detail.component";

//Routing
import {AppRoutingModule} from './app-routing.module';
import {ProfessorClassComponent} from "./components/professor-class.component";
import {SongDetailComponent} from "./components/song-detail.component";
import {CulturalNotesComponent} from "./components/modules/culturalnotes.component";

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
        ProfRegistrationsComponent,
        AdminDashboardComponent,
        AccountDashboardComponent,
        ProfessorDashboardComponent,
        ProfessorClassComponent,
        UnitDetailComponent,
        SongDetailComponent,
        CulturalNotesComponent
    ],
    providers: [CourseService, AdminService, AccountService, ProfessorService],
    bootstrap: [AppComponent]
})
export class AppModule { }
