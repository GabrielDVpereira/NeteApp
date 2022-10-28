import React, { useState } from 'react'
import { Input, Title, Text, Button } from '_/components'
import { useAuth } from '_/contexts'
import CarApp from "_/assets/CarApp.png"
import { useNavigate } from 'react-router-dom'


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
        return navigate('/')
    }


    return(
        <div className="flex flex-col align-center h-screen py-10">
            <div className=' px-5 lg:text-left text-center'>
                <Title size='3xl'>Checkin</Title>
            </div>
            <div className='grid lg:grid-cols-2 lg:h-full flex items-center'>
                <div className='flex flex-col items-center'>
                    <img className='w-5/6 lg:w-4/6' src={CarApp} />
                </div>
                <div className='flex flex-col lg:items-center p-5 pt-10 lg:align-center'>
                    <Text className="text-lg text-left lg:mb-3 mx-3">
                        Registrando que <b>{user.name}</b> está usando o carro <b>agora</b>.
                        Informe seu destino.
                    </Text>
                    <Input
                        full
                        label="Destino"
                        value={local}
                        onChange={handleOnChange}
                        errorMessage={errorMessage}
                    />
                    <Button size="full" styleType="secondary" onClick={send}>Registrar</Button>
                </div>
            </div>
        </div>
    )
}