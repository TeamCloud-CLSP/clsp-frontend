export class Course {
    id: number;
    name: string;
    description: string;
    language_name: string;
    language_id: number;
    constructor() { }
}

export class Language {
    id: number;
    language_code: number;
    name: string;
}

export class Unit {
    name: string;
    description: string;
    id: number;
    weight: number;
    course_id: number;
    constructor() { }
}

export class Song {
    unit_id: number;
    id: number;
    title: string;
    album: string;
    artist: string;
    description: string;
    lyrics: string;
    file_name: string;
    file_type: string;
    embed: string;
    weight: number;
    constructor() { }
}
