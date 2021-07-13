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
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputValidationComponent } from './shared/input-validation/input-validation.component';
import { PollLocalStorageService } from './shared/poll-local-storage.service';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    PublicPollsComponent,
    PollComponent,
    PollFormComponent,
    PollResultComponent,
    InputValidationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'public-polls', component: PublicPollsComponent },
      { path: 'poll', component: PollComponent },
      { path: 'poll-result', component: PollResultComponent },
      { path: 'create-poll', component: PollFormComponent },
    ])
  ],
  providers: [
    FormBuilder,
    PollsService,
    PollLocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
