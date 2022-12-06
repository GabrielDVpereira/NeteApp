
export interface Booking {
    id?:string
    date: Date
    duration: number
    bookerName: string
    approved: boolean
}

export function mapResponseToBooking(data: any): Booking{
    return {
        id: data.id,
        date: data.date.toDate(),
        duration: data.duration,
        bookerName: data.bookerName,
        approved: data.approved
    }
}