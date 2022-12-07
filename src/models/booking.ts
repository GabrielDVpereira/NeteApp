import { APPROVAL_STATE } from "_/constants"

export interface Booking {
    id?:string
    date: Date
    duration: number
    bookerName: string
    approval: APPROVAL_STATE
}

export function mapResponseToBooking(data: any): Booking{
    return {
        id: data.id,
        date: data.date.toDate(),
        duration: data.duration,
        bookerName: data.bookerName,
        approval: data.approval
    }
}