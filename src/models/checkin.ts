export interface Checkin {
    date: Date
    username: string
    local: string,
    duration: number
}


export function mapResponseToCheckin(data: any): Checkin{
    return {
        date: data.date.toDate(),
        username: data.username,
        local: data.local,
        duration: data.duration
    }
}