export class JwtToken {
    exp: number;
    iat: number;
    roles: string[];
    username: string;

    constructor() { }
}
