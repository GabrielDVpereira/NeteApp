
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar, Title } from "_/components";
import { Calendar } from "_/components/Calendar";
import { EventModal } from "_/components/EventModal";
import { useBooking, useCheckin } from "_/contexts";
import { Event } from "_/models";

export function Home(){
    const [openModal, setOpenModal] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState({} as Event)

    const [events, setEvents] = useState<Array<Event>>([])

    const { checkins } = useCheckin()
    const { bookings, updateBookingApproval } = useBooking()
    const navigate = useNavigate()

    useEffect(() => {
        setEvents([...checkins, ...bookings])
    }, [checkins, bookings])

    const onSelectEvent = (event: Event) => {
        setSelectedEvent(event)
        setOpenModal(true)
    }

    return(
        <>
            <EventModal
                openModal={openModal}
                closeModal={() => setOpenModal(false)}
                event={selectedEvent}
                updateAproval={updateBookingApproval}
            />
            <NavBar navigate={navigate}/>
            <div className="md:p-10 p-5 pt-3">
                <div className="py-5">
                    <Title size='2xl'>
                        Calendario de uso do Carro da Ivanete
                    </Title>
                </div>
                <Calendar
                    events={events}
                    onSelectEvent={onSelectEvent}
                />
            </div>
        </>
    )
}