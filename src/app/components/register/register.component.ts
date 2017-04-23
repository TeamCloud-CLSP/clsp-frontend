import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {RegisterService} from "../../services/register.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  loading = false;
  registerErrors = '';
  returnUrl: string;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private registerService: RegisterService) { }

  ngOnInit() {
    // reset login status
    // this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  register() {
    this.loading = true;
    this.registerErrors = '';
    this.registerService.register(
        this.model.regcode,
        this.model.username,
        this.model.password,
        this.model.email,
        this.model.name)
        .subscribe(
            res => {
                console.log('after successful registration');
                this.loading = false;
            },
            error =>  {
              console.log(error);
              this.loading = false;
              this.registerErrors = error;
            }
        );
  }
}
