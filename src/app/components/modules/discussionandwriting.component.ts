import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { CourseService } from '../../services/course.service';
import { ModuleService } from '../../services/module.service';
import { Router } from '@angular/router';
import { Header } from '../../models/modules/header';
import { Module } from '../../models/course';
import {SafeHtmlPipe} from '../safe-html.pipe'
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-discussion-and-writing',
  templateUrl: '../../templates/modules/discussionandwriting.component.html'
})

export class DiscussionAndWritingComponent implements OnInit {
  headers: Header[];
  newHeader: Header;
  editSug: boolean;
  @Input() module: Module;
  @Input() songId: number;
  @Input() unitId: number;
  @Input() moduleType: string;

  constructor(private courseService: CourseService,
    private route: ActivatedRoute,
    private location: Location,
    private sanitizer: DomSanitizer,
    private router: Router,
    private moduleService: ModuleService
  ) { }

  ngOnInit() {
    // console.log(this.songId);
    this.editSug = false;
    this.moduleService.getHeaders(this.songId, this.moduleType)
      .then(headers => {
        console.log(headers);
        this.headers = headers;
        for (let h of this.headers) {
          h.edit = false;
        }
      });
  }

  createHeader(): void {
    this.newHeader = new Header();
    this.newHeader.song_id = +this.songId;
  }

  cancel() {
    this.newHeader = null;
  }

  submitHeader(): void {
    this.moduleService.createHeader(this.newHeader, this.moduleType)
      .then(header => {
        this.headers.push(header);
        this.newHeader = null;
      });
  }

  updateHeader(i): void {
    this.moduleService.editHeader(this.headers[i]).then(response => {
      this.headers[i].edit = false;
    }
    );
  }

  deleteHeader(i: number): void {
    var headerId = this.headers[i].id
    this.moduleService.deleteHeader(+headerId).then(
      response => {
        this.headers = this.headers.filter(x => x.id != headerId);
      }
    )
  }

  toHeader(header: Header): void {
    this.router.navigate(['./unit/' + this.unitId + '/song/' + this.songId + '/header/' + header.id]);
  }

  onChange(newSelection: string) {
    // console.log(newSelection);
  }

  editHeader(i: number): void {
    this.headers[i].edit = true;
  }

  cancelEdit(i: number): void {
    this.headers[i].edit = false;
  }

  editSuggestions(): void {
    this.editSug = true;
  }

  cancelEditSug(): void {
    this.editSug = false;
  }

  saveSuggestions(): void {
    this.moduleService.saveSuggestions(this.songId, this.module).then(
      response => {
        this.editSug = false;
      }
    )
  }
}
