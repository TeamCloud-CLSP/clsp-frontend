export class Header {
  id: number;
  name: string;
  weight: number;
  song_id: number;
  edit: boolean;
  constructor() { }
}

export class Question {
  id: number;
  heading_id: number;
  content: string;
  type: string;
  weight: number;
  choices: string;
  answers: string;
  mcAnswer: string;
  msAnswers: string[];
  fbAnswers: Choice[];
  displayChoices: Choice[];
  correct: string;
  fbPieces: string[];
  saAnswer: string;
  public get getFBAnswers() {
    return this.fbAnswers;
  }
  constructor() { }
}

export class Choice {
  choice: string;
  constructor() { }
}

export class AnswerCheck {
  id: number;
  result: string;
}

export class Items {
  questions: Question[];
  next: number;
  prev: number;
  songEnable: number;
  constructor() { }
}
