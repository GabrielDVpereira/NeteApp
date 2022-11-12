import { BOOKING_COLORS } from '_/constants';
import { Booking, Checkin, Event } from '_/models'
import { parseHoursToMilisseconds } from '_/util';

function formatEndDate(date: Date, duration: number){
    return new Date(date.getTime() + parseHoursToMilisseconds(duration))
}

function parseCheckinToEvent(checkin: Checkin): Event {
    return {
        title: checkin.username + '\nlocal: ' + checkin.local,
        start: checkin.date,
        end: formatEndDate(checkin.date, checkin.duration),
        color: checkin.userColor
    }
}

function parseBookingToEvent(booking: Booking): Event {
    return {
        title: 'Reserva de ' + booking.bookerName + `\n${
            booking.approved? 'Aprovado' : 'Pendente'
        }`,
        start: booking.date,
        end: formatEndDate(booking.date, booking.duration),
        color: booking.approved ? BOOKING_COLORS.approved : BOOKING_COLORS.pending
    }
}

export function parseEvents(checkins: Array<Checkin>, bookings: Array<Booking>): Array<Event>{
    const checkinEvents = checkins.map( checkin => parseCheckinToEvent(checkin))
    const bookingEvents = bookings.map( booking => parseBookingToEvent(booking))

    return [...checkinEvents, ...bookingEvents]

}