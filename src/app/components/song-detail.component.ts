import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { CourseService } from '../services/course.service';
import { Unit, Song, Module } from '../models/course';
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ModuleService } from '../services/module.service';
import {SafeHtmlPipe} from './safe-html.pipe';


@Component({
  selector: 'app-song-detail',
  templateUrl: '../templates/song-detail.component.html'
})

export class SongDetailComponent implements OnInit {
  song: Song;
  unit: Unit;
  modules: Module[];
  courseName: string;
  selectors: any;
  passwordEdit: boolean;
  /*moduleEditId: string;*/
  currentModule: string;
  songEdit: boolean;

  constructor(private courseService: CourseService,
    private moduleService: ModuleService,
    private route: ActivatedRoute,
    private location: Location,
    private sanitizer: DomSanitizer,
    private router: Router) {
  }

  ngOnInit() {
    this.songEdit = false;
    // console.log(this.route.params);
    this.route.params
      .switchMap((params: Params) => this.courseService.getSong(+params['id']))
      .subscribe(song => {
        // console.log(song);
        this.song = song;
      });

    const names = {
      'module_cn': 'Cultural Notes',
      'module_dw': 'Discussion and Writing',
      'module_ge': 'Grammar Exercises',
      'module_ls': 'Listening Suggestions',
      'module_lt': 'Listening Tasks',
      'module_qu': 'Questions for Understanding'
    };

    this.route.params
      .switchMap((params: Params) => this.courseService.getModules(+params['id']))
      .subscribe(modules => {
        console.log(modules);
        this.modules = modules;
        for (let i = 0; i < this.modules.length; i++) {
          this.modules[i].name = this.modules[i].name || this.modules[i].module_type;
        }
        this.currentModule = this.modules[0].module_type;
      });

    /* var i = 0;
     for (i = 0; i < 6; i++) {
         this.passwords[i] = this.modules[i].password;
     }*/

    this.passwordEdit = false;


    this.route.params
      .switchMap((params: Params) => this.courseService.getUnit(+params['unit_id']))
      .subscribe(unit => {
        // console.log("got unit");
        this.unit = unit;

        this.courseService.getCourse(unit.course_id).then(course => {
          // console.log("got course name");
          this.courseName = course.name;
        });
      });
  }

  setCurrModule(name: string) {
    this.currentModule = name;
  }

  setModuleName(mod: Module) {
    this.moduleService.setModuleName(this.song.id, mod);
  }

  setPassword() {
    this.moduleService.setPasswordCN(this.song.id, this.modules[0])
      .then(value => {
        // console.log("password updated");
      });
    /*} else if (type == "module_dw") {
        this.moduleService.setPasswordDW(this.song.id, this.modules[1].password).then(value => {
            //console.log("password updated");
        });
    } else if (type == "module_ge") {
        this.moduleService.setPasswordGE(this.song.id, this.modules[2].password).then(value => {
            //console.log("password updated");
        });
    } else if (type == "module_ls") {
        this.moduleService.setPasswordLS(this.song.id, this.modules[3].password).then(value => {
            //console.log("password updated");
        });
    } else if (type == "module_lt") {
        this.moduleService.setPasswordLT(this.song.id, this.modules[4].password).then(value => {
            //console.log("password updated");
        });
    } else if (type == "module_qu") {
        this.moduleService.setPasswordQU(this.song.id, this.modules[5].password).then(value => {
            //console.log("password updated");
        });
    }*/
    this.passwordEdit = false;
  }

  changePassword(id: string) {
    this.passwordEdit = true;
    /*this.moduleEditId = id;*/
    /*console.log(id);*/
  }

  cancelPassEdit() {
    this.passwordEdit = false;
    /*this.moduleEditId = "";*/
  }

  enableModule(mod: Module, index: number) {
    this.moduleService.enableModule(this.song.id, mod)
      .then(() => this.modules[index].is_enabled = 1)
      .catch(() => console.log('Error in enabling module'));
  }

  disableModule(mod: Module, index: number) {
    this.moduleService.disableModule(this.song.id, mod)
      .then(() => this.modules[index].is_enabled = 0)
      .catch(() => console.log('Error in disabling module'));
  }

  enableSongModule(mod: Module, index: number) {
    this.moduleService.enableSongModule(this.song.id, mod)
      .then(() => this.modules[index].song_enabled = 1)
      .catch(() => console.log('Error in enabling module'));
  }

  disableSongModule(mod: Module, index: number) {
    this.moduleService.disableSongModule(this.song.id, mod)
      .then(() => this.modules[index].song_enabled = 0)
      .catch(() => console.log('Error in disabling module'));
  }

  editSong(): void {
    this.songEdit = true;
  }

  cancelEdit(): void {
    this.songEdit = false;
  }

  onSubmitEditSong(): void {
    this.courseService.updateSong(this.song)
      .then(() => this.songEdit = false);
  }
}
