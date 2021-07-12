import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Poll } from '../shared/models';
import { PollsService } from '../shared/polls.service';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styles: []
})
export class PollComponent implements OnInit {

  poll: Poll;

  constructor(private route: ActivatedRoute,
    private pollsService: PollsService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let pollId = params['id'];
      if (pollId) {
        this.pollsService.getPoll(pollId).subscribe(result => {
          this.poll = result;
        });
      }
    });
  }

}
