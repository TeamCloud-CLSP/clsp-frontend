export class StudentRegistration {
  class_id: number;
  class_name: string;
  student_registration_id: number;
  student_registration_date_start: number;
  student_registration_date_end: number;
  student_registration_max_registrations: number;
  signup_code: string;
  constructor() { }
}

export class Student {
  id: number;
  username: string;
}
