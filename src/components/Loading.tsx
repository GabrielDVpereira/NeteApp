import loadingImg from '_/assets/loading.png'
import { Title, Center, Image } from '_/components'

export function Loading(){
    return(
        <div className='h-screen'>
            <Center column>
                <Image src={loadingImg} className="w-3/4 lg:w-1/3 mb-5"/>
                <Title size='3xl'>Carregando...</Title>
            </Center>
        </div>
    )
}