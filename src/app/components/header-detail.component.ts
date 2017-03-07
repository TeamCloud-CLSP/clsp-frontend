import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { CourseService } from '../services/course.service';
import { Course, Unit, Song } from '../models/course';
import { Router }   from '@angular/router';
import { Header, Question, Choice } from '../models/modules/header';
import { ModuleService } from '../services/module.service';
import 'rxjs/add/operator/switchMap';
@Component({
    moduleId: module.id,
    selector: 'module-detail',
    templateUrl: '../templates/header-detail.component.html'
})
export class HeaderDetailComponent implements OnInit {
    unit: Unit;
    courseName: string;
    song: Song;
    header: Header;
    questions: Question[];
    newQuestion: Question;
    selectedType: string;
    choices: Choice[];
    mcAnswer: string;
    msAnswers: string[];

    constructor(
        private courseService: CourseService,
        private route: ActivatedRoute,
        private location: Location,
        private sanitizer: DomSanitizer,
        private router: Router,
        private moduleService: ModuleService
    ) { }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.courseService.getUnit(+params['unit_id']))
            .subscribe(unit => {
                this.unit = unit;

                this.courseService.getCourse(unit.course_id).then(course => {
                    this.courseName = course.name;
                });
            });
        this.route.params
            .switchMap((params: Params) => this.courseService.getSong(+params['song_id']))
            .subscribe(song => {
                this.song = song;
            });

        this.route.params
            .switchMap((params: Params) => this.moduleService.getHeader(+params['header_id']))
            .subscribe(header => {
                this.header = header;
            });

        this.route.params
            .switchMap((params: Params) => this.moduleService.getQuestions(+params['header_id']))
            .subscribe(questions => {
                this.questions = questions.sort((x, y) => x.weight - y.weight);
                console.log(questions);
            });
    }

    createQuestion(): void {
        var newChoice = new Choice();
        newChoice.choice = "New Choice"
        this.choices = [newChoice];
        this.mcAnswer = null;
        this.selectedType = null;
        this.msAnswers = [];
        this.newQuestion = new Question();
    }

    deleteQuestion(question: Question): void {
        this.moduleService.deleteQuestion(question.id)
            .then(() => this.questions = this.questions.filter(x => x != question));
    }

    cancel(): void {
        this.newQuestion = null;
    }

    addChoice(): void {
        var newChoice = new Choice();
        newChoice.choice = "New Choice"
        this.choices.push(newChoice);
    }

    removeChoice(index: number): void {
        this.choices.splice(index, 1);
    }

    convertAscii(num: number): String {
        return String.fromCharCode(97 + num).toUpperCase();
    }

    getChoices(choiceString: string): Choice[] {
        return JSON.parse(choiceString) as Choice[];
    }

    onSubmit(): void {
        this.newQuestion.heading_id = +this.header.id;
        this.newQuestion.type = this.selectedType;
        if (this.selectedType == "multiple-choice") {
            this.newQuestion.choices = JSON.stringify(this.choices);
            var answer = new Choice();
            answer.choice = this.mcAnswer;
            this.newQuestion.answers = JSON.stringify([answer]);
        }
        else if (this.selectedType == "multiple-select") {
            this.newQuestion.choices = JSON.stringify(this.choices);
            var answers: Choice[] = [];
            for (let answer of this.msAnswers) {
                var choice = new Choice();
                choice.choice = answer;
                answers.push(choice);
            }
            this.newQuestion.answers = JSON.stringify(answers);
        }
        this.moduleService.createQuestion(this.newQuestion)
            .then(question => {
                this.newQuestion = null;
                this.questions.push(question);
                this.questions.sort((x, y) => x.weight - y.weight);
            });
    }

}
