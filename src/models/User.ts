export interface User {
    name: string
    email: string
    admin: boolean
    color?: string
}

export function mapResponseToUser(data: any): User {
    return {
        name: data.displayName || "",
        email: data.email || "",
        color: data.color || "",
        admin: data.admin || false
    }
}