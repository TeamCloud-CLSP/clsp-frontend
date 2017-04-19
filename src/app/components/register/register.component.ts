import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

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
      private authService: AuthenticationService) { }

  ngOnInit() {
    // reset login status
    // this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  register() {
    this.loading = true;
    this.registerErrors = '';
    this.authService.login(this.model.username, this.model.password)
        .subscribe(
            user => {
//                    console.log(user);
              this.loading = false;
              if (this.authService.redirectUrl) {
                this.router.navigate([this.authService.redirectUrl]);
              } else {
                this.router.navigate(['./dashboard']);
              }
            },
            error =>  {
              console.log(error);
              this.loading = false;
              this.registerErrors = error;
            }
        );
  }
}
