
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Title } from "_/components";
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
            <Title size='3xl'>
                Home Page
            </Title>
            <div className="flex">
                <Button onClick={() => navigate(ROUTE_PATHS.checkin)}>Fazer Check-in</Button>
                <Button onClick={() => navigate(ROUTE_PATHS.booking)}>Criar Reserva</Button>
                <Button onClick={logout}>Logout</Button>
            </div>
            <Calendar events={events} />

        </>
    )
}