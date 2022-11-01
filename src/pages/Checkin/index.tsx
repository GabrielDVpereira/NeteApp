import React, { useState } from 'react'
import { Input, Title, Text, Button, PageTemplate, Form } from '_/components'
import { useAuth, useCheckin } from '_/contexts'
import carImg from "_/assets/CarApp.png"
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATHS } from '_/constants'


export function Checkin(){
    const [local, setLocal] = useState('')
    const [duration, setDuration] = useState(1)
    const [errorMessage, setErrorMessage] = useState('')
    const { user } = useAuth()
    const navigate = useNavigate()
    const { createCheckin, isCreatingCheckin } = useCheckin()

    const onLocalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocal(e.target.value)
        setErrorMessage('')
    }

    const onDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDuration(Number(e.target.value))
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!local){
            setErrorMessage('Campo obrigatório')
            return
        }

        const checkinData = {
            username: user.name,
            date: new Date(),
            duration,
            local
        }

        createCheckin(checkinData)
        return navigate(ROUTE_PATHS.home)
    }


    return(
        <PageTemplate
            imagePath={carImg}
            pageTitle="Check-in"
        >
            <Text className="text-lg text-left lg:mb-3 mx-3">
                Registrando que <b>{user.name}</b> está usando o carro <b>agora</b>. Informe seu destino e por quanto tempo vai usar o carro.
            </Text>
            <Form onSubmit={onSubmit}>
                <Input
                    full
                    label="Destino"
                    value={local}
                    onChange={onLocalChange}
                    errorMessage={errorMessage} />

                <Input
                    label="Duração (Horas)"
                    type={"number"}
                    onChange={onDurationChange}
                    value={duration} />

                <Button
                    size="full"
                    styleType="secondary"
                    disabled={isCreatingCheckin}>
                        { isCreatingCheckin ? 'Registrando...' : 'Registrar'}
                </Button>
            </Form>
        </PageTemplate>

    )
}