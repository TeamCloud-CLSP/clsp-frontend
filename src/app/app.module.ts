import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';



import { CourseService } from './course.service'
import { CoursesComponent } from './courses.component'
import { AppComponent }  from './app.component';
import { CourseDetailComponent } from './course-detail.component'
import { DashboardComponent } from './dashboard.component'

import {AppRoutingModule} from './app-routing.module'

@NgModule({
  imports: [
     BrowserModule,
     FormsModule,
     AppRoutingModule
     ],
  declarations: [ AppComponent, CourseDetailComponent, CoursesComponent, DashboardComponent ],
  providers: [ CourseService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
