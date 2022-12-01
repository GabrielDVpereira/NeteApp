import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Booking } from '_/models'
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
    updateBookingApproval(id: string, approval: boolean): Promise<void>
}

const BookingContext = createContext<ContextData>({} as ContextData)

export function BookingContextProvider({ children, bookingService }: Props){

    const [bookings, setBookings] = useState<Array<Booking>>([])
    const [isCreatingBooking, setIsCreatingBooking] = useState(false)
    const { isAuthenticated } = useAuth()

    useEffect(() => {
        if(!isAuthenticated) return
        bookingService.watchBookings(setBookings)

        return () => bookingService.unwatchBookings()
    }, [isAuthenticated])

    const createBooking = async (booking: Booking) => {
        setIsCreatingBooking(true)
        await bookingService.createBooking(booking)
        setIsCreatingBooking(false)
    }

    const updateBookingApproval = async(id: string, approval: boolean) => {
        await bookingService.updateBookingApproval(id, approval)
    }

    return(
        <BookingContext.Provider value={{ bookings, createBooking , isCreatingBooking, updateBookingApproval}}>
            {children}
        </BookingContext.Provider>
    )
}


export const useBooking = () => useContext(BookingContext)