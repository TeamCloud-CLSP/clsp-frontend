import { Component, Input, OnInit, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { CourseService } from '../../services/course.service';
import { Song } from '../../models/course';
import { Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { AnnotationComponent } from './annotation.component';
import { CulturalNote } from '../../models/modules/CulturalNote';
import {SafeHtmlPipe} from '../safe-html.pipe';


@Component({
  selector: 'app-cultural-notes',
  templateUrl: '../../templates/modules/culturalnotes.component.html'
})



export class CulturalNotesComponent implements OnInit {
  @Input() song: Song;
  processedLyrics: string; // lyrics w/ annotation html
  currentPhrase: string;
  currentDescription: string;
  lines: string[][];
  phrases: any;
  editing: boolean;
  annotating: boolean;
  notes: CulturalNote[];
  showLyrics: boolean;
  lyricPieces: string[];
  checked: any;

  constructor(private courseService: CourseService,
    private route: ActivatedRoute,
    private location: Location,
    private sanitizer: DomSanitizer,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    this.checked = {};
    this.showLyrics = false;
    this.editing = false;
    this.annotating = false;
    this.currentPhrase = '';
    this.currentDescription = '';
    this.courseService.getCulturalNote(this.song.id).then(notes => {
      // console.log(this.song.lyrics);
      let lyrics = this.song.lyrics;
      this.notes = notes;
      // Remove all matching lyric pieces and replace them with '|i|' where
      // i corresponds to the index of the note in the notes CulturalNotes array
      // the '|i|' are replaced with the corresponding CulturalNotes text in the template
      for (let i = 0; i < notes.length; i++) {
        const test = '|' + i.toString() + '|';
        lyrics = lyrics.replace(notes[i].phrase, test);
      }
      this.lyricPieces = lyrics.split('|').filter(x => x != '');
      //console.log(this.lyricPieces);
      this.showLyrics = true;
    });
  }

  startEdit() {
    // console.log("editing");
    this.editing = true;
  }

  cancelEdit() {
    this.editing = false;
    this.annotating = false;
  }

  startAnnotate() {
    const selected = this.getSelectionText().trim();
    if (selected !== '') {
      this.annotating = true;
      this.currentPhrase = selected;
    }
  }

  saveAnnotation() {
    const note = new CulturalNote();
    note.description = this.currentDescription;
    note.phrase = this.currentPhrase;
    note.songId = this.song.id;
    this.courseService.createCulturalNote(note).then(value => {
      this.currentDescription = '';
      this.annotating = false;

      this.notes.push(value);
      let lyrics = this.song.lyrics;
      for (let i = 0; i < this.notes.length; i++) {
        const test = '|' + i.toString() + '|';
        lyrics = lyrics.split(this.notes[i].phrase).join(test);
      }
      this.lyricPieces = lyrics.split('|').filter(x => x != '');

    });
  }

  // adds annotation HTML
  getAnnotationElement(phrase: string, description: string) {
    return '<clsp-annotation [content]=\'' + phrase + '\' [description]=\'' + description + '\'></clsp-annotation>';
  }

  addAnnotation() {
    // this.insertAnnotation(this.viewContainerRef.indexOf());
    const pieces = this.processedLyrics.split(this.currentPhrase);
    // this.processedLyrics = processed.replace(this.currentPhrase, "<span></span>");
    // console.log(this.processedLyrics);
    // console.log("heypo");
    // this.insertAnnotation(this.viewContainerRef);
  }

  updateAnnotation(index: number) {
    this.courseService.updateCulturalNotes(this.notes[index]).then(
      note => {
      }
    );
  }

  insertAnnotation(before: ViewContainerRef) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      AnnotationComponent);
    const ref = before.createComponent(factory);
    // ref.instance.description = this.currentDescription;
    // ref.instance.content = this.currentPhrase;
    ref.changeDetectorRef.detectChanges();
  }

  updateLyrics() {
    this.courseService.updateSong(this.song).then(response => {

      this.courseService.getCulturalNote(this.song.id).then(notes => {
        // console.log(this.song.lyrics);
        let lyrics = this.song.lyrics;
        this.notes = notes;
        // Remove all matching lyric pieces and replace them with '|i|' where
        // i corresponds to the index of the note in the notes CulturalNotes array
        // the '|i|' are replaced with the corresponding CulturalNotes text in the template
        for (let i = 0; i < notes.length; i++) {
          const test = '|' + i.toString() + '|';
          lyrics = lyrics.replace(notes[i].phrase, test);
        }
        this.lyricPieces = lyrics.split('|').filter(x => x != '');
        //console.log(this.lyricPieces);
        this.showLyrics = true;
        this.editing = false;
      });
    });
  }

  mouseUp() {
    const selected = this.getSelectionText().trim();
    // console.log(selected);
    this.currentPhrase = selected;

  }

  checkPiece(piece: string) {
    return isNaN(parseInt(piece));
  }

  getSelectionText(): string {
    let text = '';
    if (window.getSelection) {
      text = window.getSelection().toString();
    }
    return text;
  }
}
