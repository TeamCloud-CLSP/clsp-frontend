import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert-global',
  templateUrl: './alert-global.component.html',
  styleUrls: ['./alert-global.component.css']
})
export class AlertGlobalComponent {

  constructor(public alertService: AlertService) { }

}
