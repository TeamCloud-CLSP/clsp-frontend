import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard.component';
import { CoursesComponent } from './components/courses.component';
import { CourseDetailComponent } from './components/course-detail.component';
import { ProfRegistrationsComponent } from './components/prof-registrations.component';
import { AdminDashboardComponent } from './components/admin-dashboard.component';
import { AccountDashboardComponent } from './components/account-dashboard.component';
import {ProfessorDashboardComponent} from './components/professor-dashboard.component';
import {ProfessorClassComponent} from './components/professor-class.component';
import { UnitDetailComponent } from './components/unit-detail.component';
import { SongDetailComponent } from './components/song-detail.component';
import { HeaderDetailComponent } from './components/header-detail.component';
import {MediaUploadComponent} from './components/media-upload.component';
import {StudentDashboardComponent} from './components/student-dashboard.component';
import {StudentUnitDetailComponent} from './components/student/unit-detail.component';
import {StudentSongDetailComponent} from './components/student/student-song-detail.component';
import {StudentHeaderDetailComponent} from './components/student/student-header-detail.component';
import {MediaLinkComponent} from './components/media-link.component';
import {LoginComponent} from './components/login.component';
import {AuthGuard} from './auth.guard';
import {RegisterComponent} from './components/register/register.component';

const routes: Routes = [
    {
        canActivate: [AuthGuard],
        path: 'designer/courses',
        component: CoursesComponent
    },
    {
        canActivate: [AuthGuard],
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        canActivate: [AuthGuard],
        path: 'course/:id',
        component: CourseDetailComponent
    },
    {
        canActivate: [AuthGuard],
        path: 'profregistrationlist/:id',
        component: ProfRegistrationsComponent
    },
    {
        canActivate: [AuthGuard],
        path: 'admin',
        component: AdminDashboardComponent
    },
    {
        canActivate: [AuthGuard],
        path: 'account',
        component: AccountDashboardComponent
    },
    {
        canActivate: [AuthGuard],
        path: 'student',
        component: StudentDashboardComponent
    },
    {
        canActivate: [AuthGuard],
        path: 'student/unit/:id',
        component: StudentUnitDetailComponent
    },
    {
        canActivate: [AuthGuard],
        path: 'professor',
        component: ProfessorDashboardComponent
    },
    {
        canActivate: [AuthGuard],
        path: 'professor/class/:id',
        component: ProfessorClassComponent
    },
    {
        canActivate: [AuthGuard],
        path: 'unit/:id',
        component: UnitDetailComponent
    },
    {
        canActivate: [AuthGuard],
        path: 'unit/:unit_id/song/:id',
        component: SongDetailComponent
    },
    {
        canActivate: [AuthGuard],
        path: 'student/unit/:unit_id/song/:song_id',
        component: StudentSongDetailComponent
    },
    {
        canActivate: [AuthGuard],
        path: 'unit/:unit_id/song/:song_id/header/:header_id',
        component: HeaderDetailComponent
    },
    {
        canActivate: [AuthGuard],
        path: 'designer/media',
        component: MediaUploadComponent
    },
    {
        canActivate: [AuthGuard],
        path: 'student/unit/:unit_id/song/:song_id/header/:header_id',
        component: StudentHeaderDetailComponent
    },
    {
        canActivate: [AuthGuard],
        path: 'unit/:unit_id/song/:id/media',
        component: MediaLinkComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    // for htaccess fix
    //imports: [RouterModule.forRoot(routes, { useHash:true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
