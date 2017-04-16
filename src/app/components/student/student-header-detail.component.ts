import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Unit, Song } from '../../models/course';
import { Router } from '@angular/router';
import { Header, Question, Choice, AnswerCheck } from '../../models/modules/header';
import { StudentService } from '../../services/student.service';
import 'rxjs/add/operator/switchMap';

@Pipe({
    name: 'getChoices',
    pure: false
})
export class GetChoicesPipe implements PipeTransform {
    transform(choiceString: string, object: any): Choice[] {
        return JSON.parse(choiceString) as Choice[];
    }
}

@Component({
    selector: 'app-module-detail',
    templateUrl: '../../templates/student/student-header-detail.component.html'
})
export class StudentHeaderDetailComponent implements OnInit {
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
    fbAnswers: Choice[];
    printVersion: boolean;
    answerChecks: AnswerCheck[];

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private sanitizer: DomSanitizer,
        private router: Router,
        private studentService: StudentService
    ) { }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.studentService.getUnit(+params['unit_id']))
            .subscribe(unit => {
                this.unit = unit;

                this.studentService.getCourse(unit.course_id).then(course => {
                    this.courseName = course;
                });
            });
        this.route.params
            .switchMap((params: Params) => this.studentService.getSong(+params['song_id']))
            .subscribe(song => {
                this.song = song;
            });

        this.route.params
            .switchMap((params: Params) => this.studentService.getHeader(+params['header_id']))
            .subscribe(header => {
                this.header = header;
            });

        this.route.params
            .switchMap((params: Params) => this.studentService.getQuestions(+params['header_id']))
            .subscribe(questions => {
                this.questions = questions.sort((x, y) => x.weight - y.weight);
                console.log(questions);
                for (let question of this.questions) {
                    question.displayChoices = JSON.parse(question.choices) as Choice[];
                    if (question.type == "fill-blank") {
                        var blankNumber = (question.content.split("_").length - 1)
                        question.fbPieces = this.splitBlanks(question.content, blankNumber);
                        question.fbAnswers = [];
                        for (var i = 0; i < blankNumber; i++) {
                            var choice = new Choice();
                            choice.choice = "";
                            question.fbAnswers.push(choice);
                        }
                    }
                }
            });
    }

    getChoices(choiceString: string): Choice[] {
        return JSON.parse(choiceString) as Choice[];
    }

    convertAscii(num: number): String {
        return String.fromCharCode(97 + num).toUpperCase();
    }

    printerVersion(): void {
        this.printVersion = true;
    }

    cancelPrint(): void {
        this.printVersion = false;
    }

    splitBlanks(question: string, blanks: number): string[] {
        for (var i = 0; i < blanks; i++) {
            question = question.replace('_', "|" + i.toString() + "|");
        }
        var pieces = question.split('|').filter(x => x != "");
        console.log(pieces);
        return pieces;
    }

    checkBlank(piece: string): boolean {
        return isNaN(parseInt(piece));
    }


    checkAnswers() {
        var test = "{";
        var check = this.questions.filter(x => x.type == "fill-blank" || x.type == "multiple-choice" || x.type == "multiple-select");
        for (let q of check) {
            if (q.type == "fill-blank") {
                if (q.fbAnswers == null || q.fbAnswers.length < 1) {
                    let choices: Choice[] = [];
                    var choice = new Choice();
                    choice.choice = "";
                    choices.push(choice);
                    var answers = JSON.stringify(choices);
                } else {
                    var answers = JSON.stringify(q.fbAnswers);
                }
                test = test + "\"" + q.id + "\" : " + answers + ",";
            }
            else if (q.type == "multiple-choice") {
                var choice = new Choice();
                if (q.mcAnswer == null) {
                    choice.choice = "";
                } else {
                    choice.choice = q.mcAnswer;
                }
                var answers = JSON.stringify([choice]);
                test = test + "\"" + q.id + "\" : " + answers + ",";
            }
            else if (q.type == "multiple-select") {
                let choices: Choice[] = [];
                if (q.msAnswers == null || q.msAnswers.length < 1) {
                    let choices: Choice[] = [];
                    var choice = new Choice();
                    choice.choice = "";
                    choices.push(choice);
                    var answers = JSON.stringify(choices);
                } else {
                    for (let a of q.msAnswers) {
                        var choice = new Choice();
                        choice.choice = a;
                        choices.push(choice);
                    }
                    var answers = JSON.stringify(choices);
                }
                test = test + "\"" + q.id + "\" : " + answers + ",";
            }
        }
        test = test.substring(0, test.length - 1);
        test = test + "}";
        this.studentService.checkAnswers(test)
            .then(
            response => {
                for (let a of response) {
                    var choice = this.questions.find(x => x.id == a.id);
                    choice.correct = a.result;
                }
                //console.log(this.questions);
            }
            )
    }
    isMsAnswer(question: Question, answer: string) {
        if (question.msAnswers == null || question.msAnswers.length < 1) {
            return false;
        }
        return question.msAnswers.indexOf(answer) > -1;
    }

    getFbCheck(correct: string, index: number): string {
        console.log(correct);
        return correct.split(',')[index];
    }

}
