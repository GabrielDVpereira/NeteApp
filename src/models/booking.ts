
export interface Booking {
    date: Date
    duration: number
    bookerName: string
    approved: boolean
}


export function mapResponseToBooking(data: any): Booking{
    return {
        date: data.date.toDate(),
        duration: data.duration,
        bookerName: data.bookerName,
        approved: data.approved
    }
}