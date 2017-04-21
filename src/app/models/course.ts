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
  songs: Song[];
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
  embed_display: string;
  weight: number;
  constructor() { }
}

export class Module {
  id: number;
  has_password: boolean;
  song_id: number;
  module_type: string;
  friendly_name: string;
  is_enabled: number;
  password: string;
  name: string;
  song_enabled: number;
}

export class Media {
  id: number;
  name: string;
  filename: string;
  file_type: string;
}

export class MediaLink {
  song_id: number;
  media_id: number;
}
