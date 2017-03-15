import {Component, Input, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChild} from '@angular/core';
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

    constructor(private courseService: CourseService,
                private route: ActivatedRoute,
                private location: Location,
                private sanitizer: DomSanitizer,
                private router: Router,
                private componentFactoryResolver: ComponentFactoryResolver,
                private viewContainerRef: ViewContainerRef) {
    }

    ngOnInit() {
        this.editing = false;
        this.annotating = false;
        this.currentPhrase = "";
        this.currentDescription = "";
        this.courseService.getCulturalNote(this.song.id).then(notes => {
            console.log(this.song.lyrics);
            let lines = this.song.lyrics.split("\n");
            this.lines = [];
            for (let i = 0; i < lines.length; i++) {
                this.lines[i] = lines[i].split(" ");
            }
            this.phrases = {};
            for (let i = 0; i < notes.length; i++) {
                this.phrases[notes[i].phrase] = notes[i];
            }
        })
    }

    startEdit() {
        console.log("editing");
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
            console.log("created");
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
        console.log("heypo");
        // this.insertAnnotation(this.viewContainerRef);
    }

    insertAnnotation(before: ViewContainerRef) {
        const factory = this.componentFactoryResolver.resolveComponentFactory(
            AnnotationComponent);
        let ref = before.createComponent(factory);
        ref.instance.description = this.currentDescription;
        ref.instance.content = this.currentPhrase;
        ref.changeDetectorRef.detectChanges();
    }

    updateLyrics() {
        this.courseService.updateSong(this.song);
    }

    mouseUp() {
        let selected = this.getSelectionText().trim();
        console.log(selected);
        this.currentPhrase = selected;

    }

    getSelectionText(): string {
        let text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        }
        return text;
    }
}