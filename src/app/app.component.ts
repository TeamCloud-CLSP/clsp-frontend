import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
    <site-navbar></site-navbar>
    <div class="container">
        <router-outlet></router-outlet>
    </div>
    
  `
})

export class AppComponent {
    title = 'Course List';
}
