import { User } from "_/models";

export function parseUser(user: any): User {
    return {
        name: user.displayName || "",
        email: user.email || "",
        color: user.color || ""
    }
}