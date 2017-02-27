export class CLSPClass {
    class_id: number;
    class_name: string;
    student_Registration_id: number;
    student_registration_date_start: number;
    student_registration_date_end: number;
    constructor() { }
}

export class SingleClass {
    id: number;
    name: string;
}

export class CreateClass {
    public name: string;
    public course_id: number;
    constructor() { }
}
