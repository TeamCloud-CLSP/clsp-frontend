import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
    <app-navbar></app-navbar>
    <div class="container">
        <app-alert-global></app-alert-global>
        <router-outlet></router-outlet>
    </div>
  `
})

export class AppComponent {
    title = 'Course List';
}
