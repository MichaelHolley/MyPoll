import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Poll } from '../shared/models';
import { PollsService } from '../shared/polls.service';

@Component({
  selector: 'app-poll-result',
  templateUrl: './poll-result.component.html',
  styles: []
})
export class PollResultComponent implements OnInit {

  poll: Poll;

  constructor(private pollsService: PollsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let pollId = params['id'];
      if (pollId) {
        this.pollsService.getPoll(pollId).subscribe(result => {
          this.poll = result;

          console.log(result);
        });
      }
    });
  }

}
