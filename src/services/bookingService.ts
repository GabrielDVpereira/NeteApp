import { Approval, IAlertHelper } from "_/helpers"
import { Booking } from "_/models"
import { DatabaseRepository } from "_/repositories"

export interface IBookingService {
    createBooking(booking: Booking): Promise<void>
    listBookings(): Promise<Booking[] | undefined>
    updateBookingApproval(bookingId: string, approval: Approval): Promise<void>
    watchBookings(callback: (data: any) => void): void
    unwatchBookings(): void
}

export class BookingService implements IBookingService {
    constructor(
        private readonly bookingDatabaseRepository: DatabaseRepository,
        private readonly alertHelper: IAlertHelper
    ){}

    async createBooking(booking: Booking): Promise<void> {
        try {
            await this.bookingDatabaseRepository.create(booking.getDBFormat());
            this.alertHelper.alertSucess("Reserva realizada com sucesso!")
        } catch(err){
            console.error(err)
            this.alertHelper.alertError("Não foi possível agendar sua reserva.")
        }
    }
    async listBookings(): Promise<Booking[] | undefined> {
        try {
            const bookings = await this.bookingDatabaseRepository.getAll<Booking>()
            return bookings.map(booking => Booking.mapResponseToBooking(booking))
        } catch(err){
            console.error(err)
            this.alertHelper.alertError("Não foi possível recuperar as reservas.")
        }
    }

    async updateBookingApproval(bookingId: string, approval: Approval): Promise<void> {
        await this.bookingDatabaseRepository.update<string>(bookingId, approval)
    }

    watchBookings(callback: (data: Booking[]) => void){
        this.bookingDatabaseRepository.watch<Booking>((data) => {
            const bookings: Booking[] = data.map((item: any) => Booking.mapResponseToBooking(item))
            callback(bookings)
        })
    }

    unwatchBookings(){
        this.bookingDatabaseRepository.unsubscribe()
    }
}