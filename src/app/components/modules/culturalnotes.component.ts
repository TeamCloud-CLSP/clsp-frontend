import {Component, Input, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChild, Pipe} from '@angular/core';
import {ActivatedRoute, Params}   from '@angular/router';
import {Location}                 from '@angular/common';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {CourseService} from '../../services/course.service';
import {Course, Unit, Song, Module} from '../../models/course';
import {Router}   from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {AnnotationComponent} from "./annotation.component";
import {CulturalNote} from "../../models/modules/CulturalNote";


@Component({
    moduleId: module.id,
    selector: 'clsp-cultural-notes',
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

    constructor(private courseService: CourseService,
        private route: ActivatedRoute,
        private location: Location,
        private sanitizer: DomSanitizer,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef) {
    }

    ngOnInit() {
        this.showLyrics = false;
        this.editing = false;
        this.annotating = false;
        this.currentPhrase = "";
        this.currentDescription = "";
        this.courseService.getCulturalNote(this.song.id).then(notes => {
            //console.log(this.song.lyrics);
            var lyrics = this.song.lyrics;
            this.notes = notes;
            for (var i = 0; i < notes.length; i++) {
                var test = "|" + i.toString() + "|";
                lyrics = lyrics.split(notes[i].phrase).join(test);
            }
            this.lyricPieces = lyrics.split('|').filter(x => x != "");
            console.log(this.lyricPieces);
            this.showLyrics = true;
        })
    }

    startEdit() {
        //console.log("editing");
        this.editing = true;
    }

    cancelEdit() {
        this.editing = false;
        this.annotating = false;
    }

    startAnnotate() {
        let selected = this.getSelectionText().trim();
        if (selected !== "") {
            this.annotating = true;
            this.currentPhrase = selected;
        }
    }

    saveAnnotation() {
        let note = new CulturalNote();
        note.description = this.currentDescription;
        note.phrase = this.currentPhrase;
        note.songId = this.song.id;
        this.courseService.createCulturalNote(note).then(value => {
            this.currentDescription = "";
            this.annotating = false;

            this.notes.push(value);
            var lyrics = this.song.lyrics;
            for (var i = 0; i < this.notes.length; i++) {
                var test = "|" + i.toString() + "|";
                lyrics = lyrics.split(this.notes[i].phrase).join(test);
            }
            this.lyricPieces = lyrics.split('|').filter(x => x != "");

        })
    }

    // adds annotation HTML
    getAnnotationElement(phrase: string, description: string) {
        return "<clsp-annotation [content]='" + phrase + "' [description]='" + description + "'></clsp-annotation>";
    }

    addAnnotation() {
        // this.insertAnnotation(this.viewContainerRef.indexOf());
        let pieces = this.processedLyrics.split(this.currentPhrase);
        // this.processedLyrics = processed.replace(this.currentPhrase, "<span></span>");
        // console.log(this.processedLyrics);
        //console.log("heypo");
        // this.insertAnnotation(this.viewContainerRef);
    }

    updateAnnotation(index: number) {
        this.courseService.updateCulturalNotes(this.notes[index]).then(
            note => {
            }
        )
    }

    insertAnnotation(before: ViewContainerRef) {
        const factory = this.componentFactoryResolver.resolveComponentFactory(
            AnnotationComponent);
        let ref = before.createComponent(factory);
        // ref.instance.description = this.currentDescription;
        // ref.instance.content = this.currentPhrase;
        ref.changeDetectorRef.detectChanges();
    }

    updateLyrics() {
        this.courseService.updateSong(this.song);
    }

    mouseUp() {
        let selected = this.getSelectionText().trim();
        //console.log(selected);
        this.currentPhrase = selected;

    }

    checkPiece(piece: string) {
        return isNaN(parseInt(piece));
    }

    getSelectionText(): string {
        let text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        }
        return text;
    }
}
