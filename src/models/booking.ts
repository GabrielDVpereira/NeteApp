import { APPROVAL_STATE } from "_/constants"
import { approvalColor, approvalText } from "_/helpers"
import { Event } from "./event"

const BOOKING_TITLE = 'Reserva de'
const BOOKING_DESCRIPTION = 'A reserva foi criada para'

export interface BookingDB {
    approval: APPROVAL_STATE
    date: Date
    duration: number
    username: string
}

export class Booking extends Event {
    constructor(
        public readonly approval: APPROVAL_STATE,
        date: Date,
        duration: number,
        username: string,
        id?: string
    ){
        const color = approvalColor[approval]
        const calendarTitle = `${BOOKING_TITLE} ${username} - ${approvalText[approval]}`
        super(date, duration, username, color, calendarTitle, id)
        this.generateTexts()
    }

    generateTexts(){
        this.title = `${BOOKING_TITLE} ${this.username}`
        this.description = `${BOOKING_DESCRIPTION} ${this.description}`
    }

    getDBFormat() : BookingDB {
        return {
            approval: this.approval,
            date: this.date,
            duration: this.duration,
            username: this.username
        }
    }

    static mapResponseToBooking(data: any): Booking{
        return new Booking (
            data.approval,
            data.date.toDate(),
            data.duration,
            data.username,
            data.id
        )
    }

    static createNewBooking(date: Date, duration: number, username: string): Booking{
        return new Booking(
            APPROVAL_STATE.pending,
            date,
            duration,
            username
        )
    }
}