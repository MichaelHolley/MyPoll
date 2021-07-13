import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faPlusCircle, faShare, faTrash, faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import { Answer, Poll } from '../shared/models';
import { PollsService } from '../shared/polls.service';

@Component({
  selector: 'app-poll-form',
  templateUrl: './poll-form.component.html',
  styles: []
})
export class PollFormComponent implements OnInit {

  faPlusCircle = faPlusCircle;
  faShare = faShare;
  faUndo = faUndoAlt;
  faTrash = faTrash;

  pollForm: FormGroup;
  answersForm: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private pollService: PollsService,
    private router: Router) { }

  ngOnInit() {
    this.pollForm = this.formBuilder.group({
      question: ['', Validators.required],
      isPublic: [false],
      allowUserOptions: [false],
      allowMultiSelection: [false]
    });

    this.answersForm = new FormArray([]);
  }

  resetForm() {
    this.pollForm.patchValue({
      question: '',
      isPublic: false,
      allowUserOptions: false,
      allowMultiSelection: false
    });

    this.answersForm.clear();
  }

  onSubmit() {
    if (this.pollForm.invalid) {
      return;
    }

    let postPoll = this.pollForm.value as Poll;
    postPoll.answers = [];

    this.answersForm.value.filter(a => a != null && a.length > 0).forEach(option => {
      postPoll.answers.push({ id: undefined, content: option, poll: undefined, votes: 0, created: undefined });
    });

    this.pollService.postPoll(postPoll).subscribe(result => {
      if (result) {
        this.router.navigate(['/poll'], {
          queryParams: { id: result.id }
        });
      }
    });
  }

  addAnswerOption() {
    this.answersForm.push(new FormControl(''));
  }

  removeAnswerOptionByIndex(index) {
    this.answersForm.removeAt(index);
  }

}
