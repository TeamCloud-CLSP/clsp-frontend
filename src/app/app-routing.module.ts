import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard.component'
import { CoursesComponent } from './components/courses.component'
import { CourseDetailComponent } from './components/course-detail.component'
import { ProfRegistrationsComponent } from './components/prof-registrations.component'
import { AdminDashboardComponent } from './components/admin-dashboard.component'
import { AccountDashboardComponent } from './components/account-dashboard.component'
import {ProfessorDashboardComponent} from "./components/professor-dashboard.component";
import {ProfessorClassComponent} from "./components/professor-class.component";
import { UnitDetailComponent } from "./components/unit-detail.component";
import { SongDetailComponent } from "./components/song-detail.component";
import { HeaderDetailComponent } from "./components/header-detail.component"
import {MediaUploadComponent} from "./components/media-upload.component";
import {StudentDashboardComponent} from "./components/student-dashboard.component";
import {StudentUnitDetailComponent} from "./components/student/unit-detail.component";
import {StudentSongDetailComponent} from "./components/student/student-song-detail.component";
import {StudentHeaderDetailComponent} from "./components/student/student-header-detail.component";
import {MediaLinkComponent} from "./components/media-link.component";

const routes: Routes = [
    {
        path: 'designer/courses',
        component: CoursesComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'course/:id',
        component: CourseDetailComponent
    },
    {
        path: 'profregistrationlist/:id',
        component: ProfRegistrationsComponent
    },
    {
        path: 'admin',
        component: AdminDashboardComponent
    },
    {
        path: 'account',
        component: AccountDashboardComponent
    },
    {
        path: 'student',
        component: StudentDashboardComponent
    },
    {
        path: 'student/unit/:id',
        component: StudentUnitDetailComponent
    },
    {
        path: 'professor',
        component: ProfessorDashboardComponent
    },
    {
        path: 'professor/class/:id',
        component: ProfessorClassComponent
    },
    {
        path: 'unit/:id',
        component: UnitDetailComponent
    },
    {
        path: 'unit/:unit_id/song/:id',
        component: SongDetailComponent
    },
    {
        path: 'student/unit/:unit_id/song/:song_id',
        component: StudentSongDetailComponent
    },
    {
        path: 'unit/:unit_id/song/:song_id/header/:header_id',
        component: HeaderDetailComponent
    },
    {
        path: 'designer/media',
        component: MediaUploadComponent
    },
    {
        path: 'student/unit/:unit_id/song/:song_id/header/:header_id',
        component: StudentHeaderDetailComponent
    },
    {
        path: 'unit/:unit_id/song/:id/media',
        component: MediaLinkComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
