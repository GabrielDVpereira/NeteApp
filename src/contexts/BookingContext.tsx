import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Booking } from '_/models/booking'
import { IBookingService } from '_/services'
import { useAuth } from './AuthContext'

interface Props {
    children: ReactNode
    bookingService: IBookingService
}

interface ContextData {
    bookings: Array<Booking>
    createBooking(booking: Booking): Promise<void>
    isCreatingBooking: boolean
}

const BookingContext = createContext<ContextData>({} as ContextData)

export function BookingContextProvider({ children, bookingService }: Props){

    const [bookings, setBookings] = useState<Array<Booking>>([])
    const [isCreatingBooking, setIsCreatingBooking] = useState(false)
    const { isAuthenticated } = useAuth()

    useEffect(() => {
        if(!isAuthenticated) return
        getAllBookings()
    }, [isAuthenticated])

    const createBooking = async (booking: Booking) => {
        setIsCreatingBooking(true)
        await bookingService.createBooking(booking)
        setIsCreatingBooking(false)
    } 

    const getAllBookings = async () => {
        const bookings = await bookingService.listBookings()
        setBookings(bookings || [])
    } 

    return(
        <BookingContext.Provider value={{ bookings, createBooking , isCreatingBooking}}>
            {children}
        </BookingContext.Provider>
    )
}


export const useBooking = () => useContext(BookingContext)