export class CLSPClass {
    class_id: number;
    class_name: string;
    student_Registration_id: number;
    student_registration_date_start: number;
    student_registration_date_end: number;
    class_description: string;
    constructor() { }
}

export class SingleClass {
    id: number;
    name: string;
    public description: string;
}

export class CreateClass {
    public name: string;
    public course_id: number;
    public description: string;
    constructor() { }
}

export class StudentClass {
    id: number;
    name: string;
    description: string;
    date_start: number;
    date_end: number;
    course_id: number;
    registration_id: number;
}