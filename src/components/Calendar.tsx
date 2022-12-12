import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import 'moment/locale/pt-br'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Event } from "_/models";
import { APPROVAL_STATE } from "_/constants";
import { isBooking } from "_/helpers";

interface Props {
    events: Array<Event>
    onSelectEvent?: (e: Event) => void
}

const localizer = momentLocalizer(moment);

const messages = {
    allDay: 'Dia Inteiro',
    previous: '<',
    next: '>',
    today: 'Hoje',
    month: 'Mês',
    week: 'Semana',
    day: 'Dia',
    agenda: 'Agenda',
    date: 'Data',
    time: 'Hora',
    event: 'Evento',
    showMore: (total:number) => `+ (${total}) Eventos`,
}

export function Calendar({ events, onSelectEvent }: Props){
    const eventStyleGetter = (event: any) => {
        const lineThrough = isBooking(event) && event.approval === APPROVAL_STATE.rejected ? {textDecoration: 'line-through'} : {}

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
        style={{ height: "70vh" }}
        defaultView="day"
        startAccessor="date"
        endAccessor="end"
        titleAccessor="calendarTitle"
        scrollToTime={new Date()}
        messages={messages}
        localizer={localizer}
        events={events}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={onSelectEvent}
        selectable
    />
}