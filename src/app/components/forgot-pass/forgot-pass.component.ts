import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {
  model: any = {};
  loading = false;
  forgotPassErrors = '';
  forgotPassMsgs = '';
  resetCode = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.resetCode = params['id'];
    });
  }

  forgotPassSendEmail() {
    this.loading = true;
    this.forgotPassErrors = '';
    this.forgotPassMsgs = '';
    this.accountService.forgotPassEmail(this.model.email)
      .subscribe(
      res => {
        //console.log('after forgot pass email send');
        this.loading = false;
        this.forgotPassMsgs = 'Password email sent';
      },
      error => {
        console.log(error);
        this.loading = false;
        this.forgotPassErrors = error;
      }
      );
  }

  forgotPassResetPass() {
    this.loading = true;
    this.forgotPassErrors = '';
    this.forgotPassMsgs = '';
    this.accountService.forgotPassResetPass(this.resetCode, this.model.password)
      .subscribe(
      res => {
        //console.log('after forgot pass reset pass');
        this.loading = false;
        this.forgotPassMsgs = 'Password Reset';
      },
      error => {
        console.log(error);
        this.loading = false;
        this.forgotPassErrors = error;
      }
      );
  }

  sendEmailForm(): boolean {
    return this.route.routeConfig.path === 'forgotPass';
  }
}
