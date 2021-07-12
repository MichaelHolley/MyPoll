export class Poll {
  id: string;
  question: string;
  answers: Answer[];
  isPublic: boolean;
  allowUserOptions: boolean;
  created: Date;
}

export class Answer {
  id: string;
  content: string;
  votes: number;
  poll: Poll;
  created: Date;
}
