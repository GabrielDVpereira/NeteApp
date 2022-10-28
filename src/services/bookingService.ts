import { AlertHelper } from "_/helpers"
import { Booking } from "_/models/booking"
import { DatabaseRepository } from "_/repositories"

export interface IBookingService {
    createBooking(booking: Booking): Promise<void>
    listBookings(): Promise<Booking[] | undefined>
}

export class BookingService implements IBookingService {
    constructor(
        private readonly bookingDatabaseRepository: DatabaseRepository, 
        private readonly alertHelper: AlertHelper
    ){}

    async createBooking(booking: Booking): Promise<void> {
        try {
            await this.bookingDatabaseRepository.create(booking);
            this.alertHelper.alertSucess("Reserva realizada com sucesso!")
        } catch(err){
            console.error(err)
            this.alertHelper.alertError("Não foi possível agendar sua reserva.")
        }
    }
    async listBookings(): Promise<Booking[] | undefined> {
        try {
            const bookings = await this.bookingDatabaseRepository.getAll<Booking>()
            return bookings
        } catch(err){
            console.error(err)
            this.alertHelper.alertError("Não foi possível recuperar as reservas.")
        }
    }
}