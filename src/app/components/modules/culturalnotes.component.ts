import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params}   from '@angular/router';
import {Location}                 from '@angular/common';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {CourseService} from '../../services/course.service';
import {Course, Unit, Song, Module} from '../../models/course';
import {Router}   from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {CulturalNoteKeywords} from "../../models/modules/CulturalNoteKeywords";


@Component({
    moduleId: module.id,
    selector: 'clsp-cultural-notes',
    templateUrl: '../../templates/modules/culturalnotes.component.html'
})

export class CulturalNotesComponent implements OnInit {
    @Input() song: Song;
    keywords: CulturalNoteKeywords[];
    processedLyrics: string; // lyrics w/ annotation html

    constructor(private courseService: CourseService,
                private route: ActivatedRoute,
                private location: Location,
                private sanitizer: DomSanitizer,
                private router: Router) {
    }

    ngOnInit() {

        this.courseService.getKeywordsForSong(this.song.id).then(keywords => {
            this.keywords = keywords;
            console.log(keywords);
            this.processLyrics();
        })
    }

    // replace occurences of phrase with html for annotation
    processLyrics() {
        // this.processedLyrics = this.song.lyrics;
        let lyricWords = this.song.lyrics.split(" ");
        for (let i = 0; i < this.keywords.length; i++) {
            let keyword = this.keywords[i];
            for (let j = 0; j < lyricWords.length; j++) {
                if (lyricWords[j] == keyword.phrase) {
                    lyricWords[j] = this.addAnnotation(keyword.phrase, keyword.description);
                }
            }
        }
        this.processedLyrics = lyricWords.join(" ");
    }

    // adds annotation HTML
    addAnnotation(phrase: string, description: string) {
        return "<clsp-annotation [content]='" + phrase + "' [description]='" + description + "'></clsp-annotation>";
    }
}