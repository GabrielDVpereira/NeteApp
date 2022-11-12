import { Calendar as BigCalendar, momentLocalizer, View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { Event } from "_/models";

interface Props {
    events: Array<Event>
    onSelectEvent?: () => void
}

const localizer = momentLocalizer(moment);

export function Calendar({ events, onSelectEvent }: Props){
    const [mode, setMode] = useState<View>('week')


    const isMonth = mode === 'month';

    return <BigCalendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView={mode}
        events={events}
        onView={(view) => setMode(view)}
        style={isMonth ? { height: '100vh' } : {}}
        onSelectEvent={onSelectEvent}
        />
}