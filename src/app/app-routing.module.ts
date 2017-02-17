import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard.component'
import { CoursesComponent } from './components/courses.component'
import { CourseDetailComponent } from './components/course-detail.component'
import { ProfRegistrationsComponent } from './components/prof-registrations.component'
const routes: Routes = [
    {
        path: 'courses',
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
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
