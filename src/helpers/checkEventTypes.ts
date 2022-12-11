import { Event, Booking, Checkin } from "_/models";

export function isBooking(event: Event | undefined): boolean {
    return event instanceof Booking
}

export function isCheckin(event: Event | undefined): boolean {
    return event instanceof Checkin
}