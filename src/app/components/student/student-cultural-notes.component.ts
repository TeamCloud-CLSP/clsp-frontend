import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { StudentService } from '../../services/student.service';
import { Song } from '../../models/course';
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { CulturalNote } from '../../models/modules/CulturalNote';

@Component({
  selector: 'app-student-cultural-notes',
  templateUrl: '../../templates/student/student-cultural-notes.component.html'
})

export class StudentCulturalNotesComponent implements OnInit {
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

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private sanitizer: DomSanitizer,
    private router: Router,
    private studentService: StudentService,
  ) { }

  ngOnInit() {
    this.showLyrics = false;
    this.editing = false;
    this.annotating = false;
    this.currentPhrase = '';
    this.currentDescription = '';
    this.studentService.getCulturalNote(this.song.id).then(notes => {
      //console.log('Got notes');
      //console.log(notes);
      // console.log(this.song.lyrics);
      let lyrics = this.song.lyrics;
      this.notes = notes;
      // Remove all matching lyric pieces and replace them with '|i|' where
      // i corresponds to the index of the note in the notes CulturalNotes array
      // the '|i|' are replaced with the corresponding CulturalNotes text in the template
      if (notes) {
        for (let i = 0; i < notes.length; i++) {
          const test = '|' + i.toString() + '|';
          lyrics = lyrics.replace(notes[i].phrase, test);
        }
        this.lyricPieces = lyrics.split('|').filter(x => x != '');
        //console.log(this.lyricPieces);
        this.showLyrics = true;
      }

    });
  }

  checkPiece(piece: string) {
    return isNaN(parseInt(piece));
  }

  onChange(newSelection: string) {
    // console.log(newSelection);
  }
}
