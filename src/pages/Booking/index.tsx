import { Text, Input, Button, Image, PageTemplate, Form } from "_/components";
import bookingImg from '_/assets/booking.png'
import { useState } from "react";
import { useAuth, useBooking } from "_/contexts";
import { parseDateToLocaleString } from "_/util";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "_/constants";

export function Booking(){
    const [date, setDate] = useState<Date>(new Date())
    const [duration, setDuration] = useState<number>(1)
    const { createBooking, isCreatingBooking } = useBooking()
    const { user } = useAuth()
    const navigate = useNavigate()

    const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setDate(new Date(e.target.value))
    const onDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => setDuration(Number(e.target.value))

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const bookingData = {
            date,
            duration,
            bookerName: user.name,
            approved: false
        }

        createBooking(bookingData)
        return navigate(ROUTE_PATHS.home)
    }
    return (
        <PageTemplate
            imagePath={bookingImg}
            pageTitle="Faça sua reserva"
        >
            <Text>Reserve o carro da Ivanete para o dia de sua escolha.</Text>
            <Form onSubmit={onSubmit}>
                <Input label="Data e hora" type={"datetime-local"} onChange={onDateChange} value={parseDateToLocaleString(date)}/>
                <Input label="Duração (Horas)" type={"number"} onChange={onDurationChange} value={duration}/>
                <Button size="full"  styleType="secondary" disabled={isCreatingBooking}>{isCreatingBooking ? "Criando..." : "Criar reserva"}</Button>
            </Form>
        </PageTemplate>

    )
}