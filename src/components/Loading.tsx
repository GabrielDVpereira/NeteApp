import loadingImg from '_/assets/loading.png'
import { Title, Center } from '_/components'

export function Loading(){
    return(
        <div className='h-screen'>
            <Center column>
                <img src={loadingImg} />
                <Title size='3xl'>Carregando...</Title>
            </Center>
        </div>
    )
}