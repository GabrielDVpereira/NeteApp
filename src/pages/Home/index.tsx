
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, NavBar, Title } from "_/components";
import { Calendar } from "_/components/Calendar";
import { ROUTE_PATHS } from "_/constants";
import { useAuth, useBooking, useCheckin } from "_/contexts";
import { parseEvents } from "_/helpers";
import { Event } from "_/models";

export function Home(){
    const [events, setEvents] = useState<Array<Event>>([])

    const { checkins } = useCheckin()
    const { bookings } = useBooking()
    const navigate = useNavigate()

    const { logout } = useAuth()

    useEffect(() => {
        setEvents(parseEvents(checkins, bookings))
    }, [checkins, bookings])

    return(
        <>
            <NavBar navigate={navigate}/>
            <div className="md:p-10 p-5 pt-3">
                <div className="py-5">
                    <Title size='2xl'>
                        Calendario de uso do Carro da Ivanete
                    </Title>
                </div>
                <Calendar events={events} />
            </div>
        </>
    )
}