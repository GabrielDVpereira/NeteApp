import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Booking } from '_/models/booking'
import { IBookingService } from '_/services'

interface Props {
    children: ReactNode
    bookingService: IBookingService
}

interface ContextData {
    bookings: Array<Booking>
    createBooking(booking: Booking): Promise<void>
}

const BookingContext = createContext<ContextData>({} as ContextData)

export function BookingContextProvider({ children, bookingService }: Props){

    const [bookings, setBookings] = useState<Array<Booking>>([])

    useEffect(() => {
        getAllBookings()
    }, [])

    const createBooking = async (booking: Booking) => {
        await bookingService.createBooking(booking)
    } 

    const getAllBookings = async () => {
        const bookings = await bookingService.listBookings()
        setBookings(bookings || [])
    } 

    return(
        <BookingContext.Provider value={{ bookings, createBooking }}>
            {children}
        </BookingContext.Provider>
    )
}


export const useBooking = () => useContext(BookingContext)