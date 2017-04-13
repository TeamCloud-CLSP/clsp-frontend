export class Header {
    id: number;
    song_id: number;
    name: string;
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
