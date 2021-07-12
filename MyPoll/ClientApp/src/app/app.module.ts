import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { PublicPollsComponent } from './public-polls/public-polls.component';
import { PollComponent } from './poll/poll.component';
import { PollFormComponent } from './poll-form/poll-form.component';
import { PollsService } from './shared/polls.service';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    PublicPollsComponent,
    PollComponent,
    PollFormComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'public-polls', component: PublicPollsComponent },
      { path: 'poll', component: PollComponent },
      { path: 'create-poll', component: PollFormComponent },
    ])
  ],
  providers: [
    PollsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
