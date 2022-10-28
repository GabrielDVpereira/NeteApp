import React, { useState } from 'react'
import { Input, Title, Text, Button, PageTemplate } from '_/components'
import { useAuth } from '_/contexts'
import carImg from "_/assets/CarApp.png"
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATHS } from '_/constants'


export function Checkin(){
    const [local, setLocal] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const { user } = useAuth()
    const navigate = useNavigate()

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocal(e.target.value)
        setErrorMessage('')
    }

    const send = () => {
        if(!local){
            setErrorMessage('Campo obrigatório')
            return
        }

        const checkinData = {
            user,
            date: new Date().toISOString(),
            local
        }
        // TODO: send checkinData to firebase and handle error
        console.log(checkinData)
        return navigate(ROUTE_PATHS.home)
    }


    return(
        <PageTemplate 
            imagePath={carImg} 
            pageTitle="Checkin"
        >
            <Text className="text-lg text-left lg:mb-3 mx-3">
                Registrando que <b>{user.name}</b> está usando o carro <b>agora</b>. Informe seu destino.
            </Text>
            <Input
                full
                label="Destino"
                value={local}
                onChange={handleOnChange}
                errorMessage={errorMessage}
            />
            <Button size="full" styleType="secondary" onClick={send}>Registrar</Button>
        </PageTemplate>

    )
}