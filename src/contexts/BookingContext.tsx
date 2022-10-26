import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Booking } from '_/models/booking'

interface Props {
    children: ReactNode
}

interface ContextData {
    bookings: Array<Booking>
}


const mockedBookings:  Array<Booking> = [
    {
        date: new Date(), 
        duration: 2, 
        user: {
            email: 'test@test.com', 
            name: 'test'
        }
    },
    {
        date: new Date(), 
        duration: 4, 
        user: {
            email: 'test2@test.com', 
            name: 'test 2'
        }
    },
]
const BookingContext = createContext<ContextData>({} as ContextData)

const [bookings, setBookings] = useState<Array<Booking>>([])


useEffect(() => {
    getAllBookings()
}, [])

const createBooking = (booking: Booking) => {} 

const getAllBookings = () => {
    setBookings(mockedBookings)
} 

export function BookingContextProvider({ children }: Props){
    return(
        <BookingContext.Provider value={{ bookings }}>
            {children}
        </BookingContext.Provider>
    )
}


export const useBooking = () => useContext(BookingContext)