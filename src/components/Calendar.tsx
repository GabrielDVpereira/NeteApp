import { Calendar as BigCalendar, momentLocalizer, View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { Event } from "_/models";
import { APPROVAL_STATE } from "_/constants";

interface Props {
    events: Array<Event>
    onSelectEvent?: (e: Event) => void
}

const localizer = momentLocalizer(moment);

export function Calendar({ events, onSelectEvent }: Props){
    const [mode, setMode] = useState<View>('day')
    const isMonth = mode === 'month';

    const eventStyleGetter = (event: any) => {
        const lineThrough = event.type === 'booking' && event.status === APPROVAL_STATE.rejected ? {textDecoration: 'line-through'} : {}

        const style = {
            backgroundColor: event.color,
            borderRadius: '0px',
            opacity: 1,
            color: 'black',
            border: '0px',
            display: 'block',
            ...lineThrough
        }
        return { style }
    }

    return <BigCalendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView={mode}
        events={events}
        onView={(view) => setMode(view)}
        style={isMonth ? { height: '100vh' } : {}}
        onSelectEvent={onSelectEvent}
        eventPropGetter={eventStyleGetter}
        />
}