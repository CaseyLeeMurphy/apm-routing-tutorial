import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { MessageComponent } from './message.component';

const lRoutes: Route[] = [
  {
    path: 'messages',
    component: MessageComponent,
    outlet: 'popup'
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(lRoutes)
  ],
  declarations: [
    MessageComponent
  ]
})
export class MessageModule { }
