import {Component} from '@angular/core';
import { RouterOutlet,Router, RouterLink,Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import {TokenService} from "./services/token.service";

@Component({
  selector: 'vex-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet]
})
export class AppComponent {

  title = 'detect-route-change';
  currentRoute: string;

  constructor(private tokenService:TokenService ,private router: Router )
  {
    this.currentRoute = "";
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
        console.log('Route change detected');
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        this.currentRoute = event.url;
        console.log(event);
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        console.log(event.error);
      }
    });
  }

}

