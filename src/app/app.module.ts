import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// External Libraries
import {CKEditorModule} from 'ng2-ckeditor';
import {PopoverModule} from 'ng2-bootstrap';
import {FileUploadModule} from 'ng2-file-upload';
import {CustomFormsModule} from 'ng2-validation';

// Services
import { CourseService } from './services/course.service';
import { AdminService } from './services/admin.service';
import { ProfessorService } from './services/professor.service';
import { ModuleService } from './services/module.service';
import { StudentService } from './services/student.service';
import { MediaService } from './services/media.service';
import { AuthenticationService } from './services/authentication.service';
import { AccountService } from './services/account.service';
import { AuthGuard } from './auth.guard';
import { AlertService } from './services/alert.service';


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
import { StudentDashboardComponent } from './components/student-dashboard.component';
import { StudentUnitDetailComponent } from './components/student/unit-detail.component';
import { StudentSongDetailComponent } from './components/student/student-song-detail.component';
import { MediaUploadComponent } from './components/media-upload.component';
import { ProfessorClassComponent } from './components/professor-class.component';
import { SongDetailComponent } from './components/song-detail.component';
import { CulturalNotesComponent } from './components/modules/culturalnotes.component';
import { DiscussionAndWritingComponent } from './components/modules/discussionandwriting.component';
import { AnnotationComponent } from './components/modules/annotation.component';
import { StudentQuestionModuleComponent } from './components/student/student-question-module';
import { StudentHeaderDetailComponent, GetChoicesPipe } from './components/student/student-header-detail.component';
import { StudentCulturalNotesComponent } from './components/student/student-cultural-notes.component';
import { LoginComponent } from './components/login.component';
import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';
import { RegisterComponent } from './components/register/register.component';
import { MediaLinkComponent } from './components/media-link.component';
import { AlertGlobalComponent } from './components/alert-global/alert-global.component';


// Routing
import {AppRoutingModule} from './app-routing.module';

// Pipes
import {SafeHtmlPipe} from './components/safe-html.pipe';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule,
        PopoverModule.forRoot(),
        CKEditorModule,
        CustomFormsModule,
        FileUploadModule
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
        StudentDashboardComponent,
        StudentUnitDetailComponent,
        StudentSongDetailComponent,
        StudentQuestionModuleComponent,
        StudentHeaderDetailComponent,
        GetChoicesPipe,
        StudentCulturalNotesComponent,
        MediaLinkComponent,
        LoginComponent,
        RegisterComponent,
        ForgotPassComponent,
        SafeHtmlPipe,
        AlertGlobalComponent
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
        AuthGuard,
        AccountService,
        AlertService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
