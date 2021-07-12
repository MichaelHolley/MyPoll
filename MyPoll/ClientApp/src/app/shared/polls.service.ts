import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Poll } from './models';

@Injectable({
  providedIn: 'root'
})
export class PollsService {

  URL = 'api/Polls';

  constructor(private httpClient: HttpClient) { }

  getPublicPolls() {
    return this.httpClient.get<Poll[]>(this.URL + '/GetPublicPolls');
  }
}
