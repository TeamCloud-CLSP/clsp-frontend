import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { CourseService } from '../../services/course.service';
import { ModuleService } from '../../services/module.service';
import { Router } from '@angular/router';
import { Header } from '../../models/modules/header';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-discussion-and-writing',
  templateUrl: '../../templates/modules/discussionandwriting.component.html'
})

export class DiscussionAndWritingComponent implements OnInit {
  headers: Header[];
  newHeader: Header;
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
    this.moduleService.getHeaders(this.songId, this.moduleType)
      .then(headers => {
        console.log(headers);
        this.headers = headers;
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

  toHeader(header: Header): void {
    this.router.navigate(['./unit/' + this.unitId + '/song/' + this.songId + '/header/' + header.id]);
  }

  onChange(newSelection: string) {
    // console.log(newSelection);
  }
}
