import type { User } from "./user";

export interface Workingtime {
    start: Date;
    end: Date;
    user: User;
}