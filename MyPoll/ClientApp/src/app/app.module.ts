import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { PublicPollsComponent } from './public-polls/public-polls.component';
import { PollComponent } from './poll/poll.component';
import { PollFormComponent } from './poll-form/poll-form.component';
import { PollsService } from './shared/polls.service';
import { PollResultComponent } from './poll-result/poll-result.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    PublicPollsComponent,
    PollComponent,
    PollFormComponent,
    PollResultComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'public-polls', component: PublicPollsComponent },
      { path: 'poll', component: PollComponent },
      { path: 'create-poll', component: PollFormComponent },
    ])
  ],
  providers: [
    FormBuilder,
    PollsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
