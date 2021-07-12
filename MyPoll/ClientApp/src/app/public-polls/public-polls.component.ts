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

}
