import { Component, OnInit } from '@angular/core';
import { Poll } from '../shared/models';
import { PollsService } from '../shared/polls.service';

@Component({
  selector: 'app-public-polls',
  templateUrl: './public-polls.component.html',
  styles: []
})
export class PublicPollsComponent implements OnInit {

  publicPolls: Poll[] = [];

  constructor(private pollsService: PollsService) { }

  ngOnInit() {
    this.pollsService.getPublicPolls().subscribe(result => {
      this.publicPolls = result;
    });
  }

  getNumberOfVotes(poll: Poll) {
    let sum = 0;
    if (poll.answers) {
      poll.answers.forEach(a => {
        sum += a.votes;
      });
    }

    return sum;
  }

  getListOfAnswers(poll: Poll) {
    let listOfAnswers = '';
    if (poll.answers) {
      poll.answers.forEach((a, index) => {
        listOfAnswers += a.content;
        if (index < poll.answers.length - 1) {
          listOfAnswers += ' | ';
        }
      });
    }

    return listOfAnswers;
  }

}
