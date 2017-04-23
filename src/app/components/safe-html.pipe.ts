import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { CourseService } from '../services/course.service';
import { Unit, Song, Module } from '../models/course';
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ModuleService } from '../services/module.service';

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) { }
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
