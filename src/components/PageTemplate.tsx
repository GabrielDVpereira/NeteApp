import { ReactNode } from "react";
import { Title, Image, NavBar } from ".";

interface Props {
    imagePath: string
    children: ReactNode
    pageTitle: string
    navigate: (path: string) => void
}
export function PageTemplate({ imagePath, children, pageTitle, navigate }: Props){
    return(
        <>
            <NavBar navigate={navigate}/>
            <div className="flex flex-col align-center h-screen py-10">
                <div className='grid lg:grid-cols-2 lg:h-full flex items-center'>
                    <div className='flex flex-col items-center'>
                        <div className='py-5 self-center block lg:hidden'>
                                <Title size='3xl'>{pageTitle}</Title>
                        </div>
                        <Image src={imagePath} />
                    </div>
                    <div className='flex flex-col lg:items-center p-5 pt-10 lg:align-center'>
                        <div className='py-5 self-center hidden md:block'>
                            <Title size='3xl'>{pageTitle}</Title>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}