import { Booking } from "_/models";

const ZAP_LINK = `https://api.whatsapp.com/send?phone=${process.env.REACT_APP_ZAP_NUMBER}`
export function parseBookingToZapLink(booking: Booking){
    const baseMessage = `Oii! Posso pegar o carro dia ${
        booking.date.toLocaleString()
    } por ${booking.duration} hora${booking.duration > 1 ? 's' : ''}?
    Confirma lá no NeteApp?
    ${window.origin}`

    return ZAP_LINK + `&text=${baseMessage.replace(' ', '%20')}`
}