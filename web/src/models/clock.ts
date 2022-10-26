import type { User } from "./user";

export interface Clock {
    time: Date;
    status: boolean;
    user: User;
}