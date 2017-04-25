import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  model: any = {};
  loading = false;
  registerErrors = '';
  registerMsgs = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService) { }

  register() {
    this.loading = true;
    this.registerErrors = '';
    this.registerMsgs = '';
    this.accountService.register(
      this.model.regcode,
      this.model.username,
      this.model.password,
      this.model.email,
      this.model.name)
      .subscribe(
      res => {
        //console.log('after successful registration');
        this.loading = false;
        this.registerMsgs = 'User successfully registered';
      },
      error => {
        console.log(error);
        this.loading = false;
        this.registerErrors = error;
      }
      );
  }
}
