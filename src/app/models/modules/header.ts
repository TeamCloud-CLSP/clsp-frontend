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
    constructor() { }
}

export class Choice {
    choice: string;
    constructor() { }
}
