import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import {CKEditorModule} from 'ng2-ckeditor';

// Services
import { CourseService } from './services/course.service';
import { AdminService } from './services/admin.service';
import {ProfessorService} from './services/professor.service';
import {ModuleService} from './services/module.service';
import {StudentService} from './services/student.service';
import {MediaService} from './services/media.service';
import {AuthenticationService} from './services/authentication.service';

// Components
import { CoursesComponent } from './components/courses.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar.component';
import { CourseDetailComponent } from './components/course-detail.component';
import { DashboardComponent } from './components/dashboard.component';
import { ProfRegistrationsComponent } from './components/prof-registrations.component';
import { AdminDashboardComponent } from './components/admin-dashboard.component';
import { AccountDashboardComponent } from './components/account-dashboard.component';
import { ProfessorDashboardComponent } from './components/professor-dashboard.component';
import { UnitDetailComponent } from './components/unit-detail.component';
import { HeaderDetailComponent } from './components/header-detail.component';
import {StudentDashboardComponent} from './components/student-dashboard.component';
import {StudentUnitDetailComponent} from './components/student/unit-detail.component';
import {StudentSongDetailComponent} from './components/student/student-song-detail.component';
import {MediaUploadComponent} from './components/media-upload.component';
import {ProfessorClassComponent} from './components/professor-class.component';
import {SongDetailComponent} from './components/song-detail.component';
import {CulturalNotesComponent} from './components/modules/culturalnotes.component';
import {DiscussionAndWritingComponent} from './components/modules/discussionandwriting.component';
import {AnnotationComponent} from './components/modules/annotation.component';
import {StudentQuestionModuleComponent} from './components/student/student-question-module';
import {StudentHeaderDetailComponent, GetChoicesPipe} from './components/student/student-header-detail.component';
import {StudentCulturalNotesComponent} from './components/student/student-cultural-notes.component';
import {LoginComponent} from './components/login.component';

// Routing
import {AppRoutingModule} from './app-routing.module';
import {PopoverModule} from 'ng2-bootstrap';

import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import {MediaLinkComponent} from './components/media-link.component';
import {AuthGuard} from './auth.guard';
import { RegisterComponent } from './components/register/register.component';
import {CustomFormsModule} from 'ng2-validation';



@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService, { passThruUnknownUrl: true }),
        PopoverModule.forRoot(),
        CKEditorModule,
        CustomFormsModule
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
        CulturalNotesComponent,
        DiscussionAndWritingComponent,
        AnnotationComponent,
        HeaderDetailComponent,
        MediaUploadComponent,
        FileSelectDirective,
        FileDropDirective,
        StudentDashboardComponent,
        StudentUnitDetailComponent,
        StudentSongDetailComponent,
        StudentQuestionModuleComponent,
        StudentHeaderDetailComponent,
        GetChoicesPipe,
        StudentCulturalNotesComponent,
        MediaLinkComponent,
        LoginComponent,
        RegisterComponent
    ],
    entryComponents: [
        AnnotationComponent
    ],
    providers: [
        CourseService,
        AdminService,
        ProfessorService,
        ModuleService,
        MediaService,
        StudentService,
        AuthenticationService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
