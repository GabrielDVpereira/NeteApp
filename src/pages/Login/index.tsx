import { Navigate } from "react-router-dom";
import { Button, Image, Text, Title } from "_/components";
import { useAuth } from "_/contexts";
import { FaGoogle } from "react-icons/fa"
import loginImg from "_/assets/login.png"

export function Login(){
    const { signIn, isAuthenticated, redirectRoute } = useAuth()

    if(isAuthenticated) return <Navigate to={redirectRoute}/>

    return (
        <div className="flex flex-col align-center h-screen py-10">
                <div className='grid lg:grid-cols-3 lg:h-full flex items-center'>
                    <div className='flex flex-col lg:col-span-2 items-center'>
                        <Image src={loginImg} />
                    </div>
                    <div className='flex flex-col items-center align-center p-5 pt-10 '>
                            <Title size='3xl'>Nete App</Title>
                            <Text className="mb-5 text-center">Controle de uso do carro da Ivanete</Text>
                            <Button onClick={() => signIn()}>
                                <div className="flex items-center">
                                    <FaGoogle color="white" className="mr-2"/> Sign in with Google
                                </div>
                            </Button>
                    </div>
                </div>
            </div>
    )
}