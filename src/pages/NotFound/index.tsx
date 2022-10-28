import notFoundImg from '_/assets/404.png'
import { Title, Center, Image } from '_/components'

export function NotFound(){
    return(
        <div className='h-screen'>
            <Center column>
                <Image src={notFoundImg} className="w-3/4 lg:w-1/3 mb-5"/>
                <Title size='xl'>Ooops Página não encontrada</Title>
            </Center>
        </div>
    )
}