import { Title, Text, Input, Button } from "_/components";
import bookingImg from '_/assets/booking.png'
import { useState } from "react";
import { useAuth, useBooking } from "_/contexts";
import { parseDateToLocaleString } from "_/util";

export function Booking(){
    const [date, setDate] = useState<Date>(new Date())    
    const [duration, setDuration] = useState<number>(1)
    const { createBooking, isCreatingBooking } = useBooking()
    const { user } = useAuth()

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
    }
    return (
        <div>
            <img src={bookingImg} />
            <Title>Faça sua reserva</Title>
            <Text>Reserve o carro da Ivanete para o dia de sua escolha</Text>
            <form onSubmit={onSubmit}>
                <Input label="Data e hora" type={"datetime-local"} onChange={onDateChange} value={parseDateToLocaleString(date)}/>
                <Input label="Duração" type={"number"} onChange={onDurationChange} value={duration}/>
                <Button disabled={isCreatingBooking}>{isCreatingBooking ? "Criando..." : "Criar reserva"}</Button>
            </form>
        </div>
    )
}