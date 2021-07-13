import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheckCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Poll } from '../shared/models';
import { PollsService } from '../shared/polls.service';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styles: []
})
export class PollComponent implements OnInit {

  faCheckCircle = faCheckCircle;
  faPlusCircle = faPlusCircle;

  poll: Poll;
  answers: { id: string, selected: boolean, content: string }[] = [];

  showAnswerInput = false;
  answerInput: string = '';

  constructor(private route: ActivatedRoute,
    private pollsService: PollsService,
    private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let pollId = params['id'];
      if (pollId) {
        this.pollsService.getPoll(pollId).subscribe(result => {
          if (result) {
            this.setPoll(result);
          }
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

  setPoll(poll: Poll) {
    this.poll = poll;
    this.answers = [];

    poll.answers.forEach(a => {
      this.answers.push({
        selected: false,
        id: a.id,
        content: a.content
      });
    });
  }

  handleAddAnswer() {
    if (this.showAnswerInput) {
      console.log(this.answerInput);
      if (this.answerInput != null && this.answerInput.length > 0) {
        this.pollsService.addAnswer(this.poll.id, this.answerInput).subscribe(result => {
          if (result) {
            this.showAnswerInput = false;
            this.setPoll(result);
          }
        });
      }
    } else {
      this.showAnswerInput = !this.showAnswerInput;
    }
  }

}
