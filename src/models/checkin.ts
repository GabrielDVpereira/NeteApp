import { Event } from "./event"
import { User } from "./user"

const CHECKIN_TITLE = 'Check-in de'
const CHECKIN_DESCRIPTION = 'O check-in foi realizado em'

export interface CheckinDB {
    date: Date
    duration: number
    username: string
    color: string
    local: string
}
export class Checkin extends Event {
    constructor(
        public readonly local: string,
        date: Date,
        duration: number,
        username: string,
        color: string,
        id?: string
    ){
        const calendarTitle = `${username} - ${local}`
        super(date, duration, username, color, calendarTitle, id)
        this.generateTexts()
    }

    generateTexts(){
        this.title = `${CHECKIN_TITLE} ${this.username}`
        this.description = `${CHECKIN_DESCRIPTION} ${this.description}`
    }

    getDBFormat(): CheckinDB {
        return {
            local: this.local,
            date: this.date,
            duration: this.duration,
            username: this.username,
            color: this.color
        }
    }

    static createNewCheckin(local: string, duration: number, user: User): Checkin {
        return new Checkin(local, new Date(), duration, user.name, user.color)
    }

    static mapResponseToCheckin(data: any): Checkin{
        return new Checkin (
            data.local,
            data.date.toDate(),
            data.duration,
            data.username,
            data.color,
            data.id
        )
    }
}