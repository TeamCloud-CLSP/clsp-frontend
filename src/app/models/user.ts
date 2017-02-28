/**
 * Created by pjztam on 2/19/2017.
 */
export class User {
    id: number;
    name: string;
    username: string;
    email: string;
    is_active: boolean;
    date_created: number;
    date_deleted: number;
    date_start: number;
    date_end: number;
    timezone: string;
    is_student: boolean;
    is_professor: boolean;
    is_designer: boolean;
    is_administrator: boolean;
    password: string;
    constructor() { }
}
