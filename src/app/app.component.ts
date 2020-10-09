import { Component } from '@angular/core';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  NavigationCancel,
} from '@angular/router';

import { AuthService } from './user/auth.service';
import { slideInAnimation } from './app.animation';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation],
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  loading = true;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  constructor(
    private authService: AuthService,
    private readonly _router: Router
  ) {
    this._router.events.subscribe((inRouteEvent: Event) => {
      this.checkRouterEvent(inRouteEvent);
    });
  }

  private checkRouterEvent(inEvent: Event): void {
    if (inEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (
      inEvent instanceof NavigationEnd ||
      inEvent instanceof NavigationCancel ||
      inEvent instanceof NavigationError
    ) {
      this.loading = false;
    }
  }

  logOut(): void {
    this.authService.logout();
    this._router.navigate(['/welcome']);
  }
}
