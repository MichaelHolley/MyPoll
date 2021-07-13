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

  // options
  view: any[] = [700, 400];
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = true;
  legendPosition: string = 'below';

  poll: Poll;
  data: { name: string, value: number }[];

  constructor(private pollsService: PollsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let pollId = params['id'];
      if (pollId) {
        this.pollsService.getPoll(pollId).subscribe(result => {
          this.poll = result;
          this.data = [];

          if (result.answers) {
            result.answers.forEach(a => {
              this.data.push({ name: a.content, value: a.votes });
            });
          }
        });

      }
    });
  }
}
