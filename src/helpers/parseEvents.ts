import { Booking, Checkin, Event } from '_/models'

const hour =  60 * 60 * 1000;

export function parseEvents(checkins: Array<Checkin>, bookings: Array<Booking>): Array<Event>{
    const checkinEvents = checkins.map( checkin => {
        return {
            title: checkin.username + '\nlocal: ' + checkin.local,
            start: checkin.date,
            end: new Date(checkin.date.getTime() + checkin.duration * hour)
        }
    })

    const bookingEvents = bookings.map( booking => {
        return {
            title: 'Reserva de ' + booking.bookerName,
            start: booking.date,
            end: new Date(booking.date.getTime() + booking.duration * hour)
        }
    })

    return [...checkinEvents, ...bookingEvents]

}