import { User } from "./User"

export interface Booking {
    date: Date
    duration: number
    user: User
}