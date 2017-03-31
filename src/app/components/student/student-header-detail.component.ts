import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { CourseService } from '../../services/course.service';
import { Course, Unit, Song } from '../../models/course';
import { Router }   from '@angular/router';
import { Header, Question, Choice } from '../../models/modules/header';
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
    moduleId: module.id,
    selector: 'module-detail',
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
                        question.displayChoices = JSON.parse(question.answers) as Choice[];
                        question.fbAnswers = [];
                        for (var i = 0; i < question.displayChoices.length; i++) {
                            var choice = "";
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

}
