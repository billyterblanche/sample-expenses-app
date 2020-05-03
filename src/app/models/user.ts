export class User {
    id: number;
    username: string;
    password: string;
    logginDate: Date = new Date();
    token: string;
}