import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Answer, Poll } from './models';

@Injectable({
  providedIn: 'root'
})
export class PollsService {

  API_URL: string = 'api/Polls';

  constructor(private httpClient: HttpClient) { }

  getPublicPolls() {
    return this.httpClient.get<Poll[]>(this.API_URL + '/GetPublicPolls');
  }

  getPoll(id: string) {
    let params = new HttpParams();
    params = params.append('id', id);

    return this.httpClient.get<Poll>(this.API_URL + '/GetPoll', { params: params });
  }

  postPoll(poll: Poll) {
    return this.httpClient.post<Poll>(this.API_URL + '/PostPoll', poll);
  }

  vote(poll: Poll, answerIds: any[]) {
    let params = new HttpParams();
    params = params.append('pollId', poll.id);

    return this.httpClient.put<Poll>(this.API_URL + '/Vote', answerIds, { params: params });
  }

  addAnswer(pollId: string, answer: string) {
    let params = new HttpParams();
    params = params.append('pollId', pollId);
    params = params.append('answer', answer);

    return this.httpClient.put<any>(this.API_URL + '/AddAnswer', undefined, { params: params });
  }
}
