export interface Checkin {
    id?:string
    date: Date
    username: string
    userColor: string
    local: string
    duration: number
}


export function mapResponseToCheckin(data: any): Checkin{
    return {
        id: data.id,
        date: data.date.toDate(),
        username: data.username,
        userColor: data.userColor,
        local: data.local,
        duration: data.duration
    }
}