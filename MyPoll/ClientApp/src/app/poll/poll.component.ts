import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Poll } from '../shared/models';
import { PollsService } from '../shared/polls.service';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styles: []
})
export class PollComponent implements OnInit {

  poll: Poll;
  answers: { id: string, selected: boolean, content: string }[] = [];

  constructor(private route: ActivatedRoute,
    private pollsService: PollsService,
    private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let pollId = params['id'];
      if (pollId) {
        this.pollsService.getPoll(pollId).subscribe(result => {
          this.poll = result;

          result.answers.forEach(a => {
            this.answers.push({
              selected: false,
              id: a.id,
              content: a.content
            });
          });
        });
      }
    });
  }

  onAnswerClicked(answer, event) {
    if (!this.poll.allowMultiSelection && this.answers.filter(a => a.selected == true).length > 0) {
      answer.selected = false;
      event.target.checked = false;
    } else {
      answer.selected = !answer.selected;
    }
  }

  submitVote() {
    let answerIds = [];
    this.answers.filter(a => a.selected == true).forEach(a => answerIds.push(a.id));

    this.pollsService.vote(this.poll, answerIds).subscribe(result => {
      this.router.navigate(['/poll-result'], {
        queryParams: { id: result.id }
      });
    });
  }

}
