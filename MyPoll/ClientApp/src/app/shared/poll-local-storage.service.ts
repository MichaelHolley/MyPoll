import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PollLocalStorageService {

  constructor() { }

  addVotedPollId(id: string) {
    let ids: any[] = JSON.parse(localStorage.getItem('voted-polls'));

    if (ids) {
      ids.push(id);
      localStorage.setItem("voted-polls", JSON.stringify(ids));
    } else {
      console.log([id]);
      localStorage.setItem("voted-polls", JSON.stringify([id]));
    }
  }

  hasAlreadyVoted(pollId: string) {
    let ids: any[] = JSON.parse(localStorage.getItem('voted-polls'));

    if (ids) {
      return ids.includes(pollId);
    }
  }
}
