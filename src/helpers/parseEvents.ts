import { BOOKING_COLORS, APPROVAL_STATE } from '_/constants';
import { Booking, Checkin, Event } from '_/models'
import { parseHoursToMilisseconds } from '_/util';

function formatEndDate(date: Date, duration: number){
    return new Date(date.getTime() + parseHoursToMilisseconds(duration))
}

function parseCheckinToEvent(checkin: Checkin): Event {
    const endDate = formatEndDate(checkin.date, checkin.duration)
    return {
        title: checkin.username + '\nlocal: ' + checkin.local,
        start: checkin.date,
        end: endDate,
        color: checkin.userColor,
        modalTitle: 'Check-in de ' + checkin.username,
        modalDescription: 'O check-in foi realizado em '
            + checkin.date.toLocaleString() + ' e tem duraçao de '
            + checkin.duration + 'h, terminando em ' + endDate.toLocaleString(),
        local: checkin.local,
        type: 'checkin',
        id: checkin.id!
    }
}

const bookingColor = {
    [APPROVAL_STATE.approved]: BOOKING_COLORS.approved,
    [APPROVAL_STATE.pending]: BOOKING_COLORS.pending,
    [APPROVAL_STATE.rejected]: BOOKING_COLORS.rejected
}

export const approvalText = {
    [APPROVAL_STATE.approved]: 'Aprovada',
    [APPROVAL_STATE.pending]: 'Pendente',
    [APPROVAL_STATE.rejected]: 'Rejeitada'
}

function parseBookingToEvent(booking: Booking): Event {
    const endDate = formatEndDate(booking.date, booking.duration)
    const textStatus = approvalText[booking.approval]
    return {
        title: 'Reserva de ' + booking.bookerName + `\n${textStatus}`,
        start: booking.date,
        end: endDate,
        color: bookingColor[booking.approval],
        modalTitle: 'Reserva de ' + booking.bookerName,
        modalDescription: 'A reserva foi criada para '
            + booking.date.toLocaleString() + ' e tem duraçao de '
            + booking.duration + 'h, terminando em ' + endDate.toLocaleString(),
        status: booking.approval,
        type: 'booking',
        id: booking.id!
    }
}

export function parseEvents(checkins: Array<Checkin>, bookings: Array<Booking>): Array<Event>{
    const checkinEvents = checkins.map( checkin => parseCheckinToEvent(checkin))
    const bookingEvents = bookings.map( booking => parseBookingToEvent(booking))

    return [...checkinEvents, ...bookingEvents]

}