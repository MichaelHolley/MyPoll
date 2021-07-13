import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheckCircle, faPlusCircle, faPoll } from '@fortawesome/free-solid-svg-icons';
import { Poll } from '../shared/models';
import { PollLocalStorageService } from '../shared/poll-local-storage.service';
import { PollsService } from '../shared/polls.service';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styles: []
})
export class PollComponent implements OnInit {

  faCheckCircle = faCheckCircle;
  faPlusCircle = faPlusCircle;
  faPoll = faPoll;

  alreadyVoted = false;
  timeout;

  pollId: string;
  poll: Poll;
  answers: { id: string, selected: boolean, content: string }[] = [];

  showAnswerInput = false;
  answerInput: string = '';

  constructor(private route: ActivatedRoute,
    private pollsService: PollsService,
    private router: Router,
    private pollLocalStorageService: PollLocalStorageService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.pollId = params['id'];
      if (this.pollId) {
        if (this.pollLocalStorageService.hasAlreadyVoted(this.pollId)) {
          this.alreadyVoted = true;
          this.timeout = setTimeout(() => {
            this.router.navigate(['/poll-result'], {
              queryParams: { id: this.pollId }
            }); }, 4000);
        } else {
          this.pollsService.getPoll(this.pollId).subscribe(result => {
            if (result) {
              this.setPoll(result);
            }
          });
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  onAnswerClicked(answer, event) {
    let alreadySelected = this.answers.filter(a => a.selected == true);
    if (!this.poll.allowMultiSelection && alreadySelected.length > 0) {
      answer.selected = false;
      event.target.checked = false;
    } else {
      answer.selected = !answer.selected;
    }
  }

  submitVote() {
    let answerIds = [];
    this.answers.filter(a => a.selected == true).forEach(a => answerIds.push(a.id));

    if (answerIds.length > 0) {
      this.pollsService.vote(this.poll, answerIds).subscribe(result => {
        this.pollLocalStorageService.addVotedPollId(result.id);

        this.router.navigate(['/poll-result'], {
          queryParams: { id: result.id }
        });
      });
    }
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
      if (this.answerInput != null && this.answerInput.length > 0) {
        this.pollsService.addAnswer(this.poll.id, this.answerInput).subscribe(result => {
          if (result) {
            this.showAnswerInput = false;
            this.answerInput = '';
            this.setPoll(result);
          }
        });
      }
    } else {
      this.showAnswerInput = !this.showAnswerInput;
    }
  }

}
