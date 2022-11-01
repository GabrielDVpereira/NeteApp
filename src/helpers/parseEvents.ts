import { Booking, Checkin, Event } from '_/models'
import { parseHoursToMilisseconds } from '_/util';

function formatEndDate(date: Date, duration: number){
    return new Date(date.getTime() + parseHoursToMilisseconds(duration))
}

export function parseEvents(checkins: Array<Checkin>, bookings: Array<Booking>): Array<Event>{
    const checkinEvents = checkins.map( checkin => {
        return {
            title: checkin.username + '\nlocal: ' + checkin.local,
            start: checkin.date,
            end: formatEndDate(checkin.date, checkin.duration)
        }
    })

    const bookingEvents = bookings.map( booking => {
        return {
            title: 'Reserva de ' + booking.bookerName,
            start: booking.date,
            end: formatEndDate(booking.date, booking.duration)
        }
    })

    return [...checkinEvents, ...bookingEvents]

}