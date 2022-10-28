import { Navigate } from "react-router-dom";
import { Button, Text, Title } from "_/components";
import { useAuth } from "_/contexts";
import { FaGoogle } from "react-icons/fa"
import Logo from "_/assets/CarDriving.png"
import { ROUTE_PATHS } from "_/constants";

export function Login(){
    const { signInWithGoogle, isAuthenticated } = useAuth()

    if(isAuthenticated) return <Navigate to={ROUTE_PATHS.home}/>

    return (
        <div className="flex flex-col items-center p-5">
            <img src={Logo} width={400} />
            <Title size="3xl">Nete App</Title>
            <Text className="mb-5 text-center">Controle de uso do carro da Ivanete</Text>
            <Button onClick={() => signInWithGoogle()} >
                <div className="flex items-center">
                    <FaGoogle color="white" className="mr-2"/> Sign in with Google
                </div>
            </Button>
        </div>
    )
}