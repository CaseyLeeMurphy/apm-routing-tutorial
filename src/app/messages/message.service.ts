import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private _messages: string[] = [];

  public isDisplayed = false;

  constructor(private readonly _router: Router) {
    this._router.events.subscribe(inEvent => {
      if (inEvent instanceof NavigationEnd) {
        if (inEvent.url.includes('popup:messages')) {
          this.isDisplayed = true;
        } else {
          this.isDisplayed = false;
        }
      }
    });
  }

  get messages(): string[] {
    return this._messages;
  }

  addMessage(message: string): void {
    const currentDate = new Date();
    this.messages.unshift(message + ' at ' + currentDate.toLocaleString());
  }
}
