import { CLSPClass } from "../models/clsp-class";
export class ProfInfo {
    id: number;
    date_created: number;
    date_deleted: number;
    date_start: number;
    date_end: number;
    signup_code: string;
    designers: number;
    designers_username: string;
    course_id: number;
    course_name: string;
    classes: CLSPClass[];
    number_of_classes: number;

    constructor() {

    }
}
