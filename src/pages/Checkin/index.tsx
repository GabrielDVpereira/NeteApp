import React, { useState } from 'react'
import { Input, Text, Button, PageTemplate, Form } from '_/components'
import { useAuth, useCheckin } from '_/contexts'
import checkinImg from "_/assets/checkin.png"
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATHS } from '_/constants'
import { Checkin } from '_/models'


export function CheckinPage(){
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

        const checkin = Checkin.createNewCheckin(local, duration, user)
        createCheckin(checkin)
        return navigate(ROUTE_PATHS.home)
    }


    return(
        <PageTemplate
            navigate={navigate}
            imagePath={checkinImg}
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
                    disabled={isCreatingCheckin}>
                        { isCreatingCheckin ? 'Registrando...' : 'Registrar'}
                </Button>
            </Form>
        </PageTemplate>

    )
}