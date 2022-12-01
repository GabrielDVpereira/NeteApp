import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Checkin } from '_/models'
import { ICheckinService } from '_/services'
import { useAuth } from './AuthContext'

interface Props {
    children: ReactNode
    checkinService: ICheckinService
}

interface ContextData {
    checkins: Array<Checkin>
    createCheckin(checkin: Checkin): Promise<void>
    isCreatingCheckin: boolean
}

const CheckinContext = createContext<ContextData>({} as ContextData)

export function CheckinContextProvider({ children, checkinService }: Props){

    const [checkins, setCheckins] = useState<Array<Checkin>>([])
    const [isCreatingCheckin, setIsCreatingCheckin] = useState(false)
    const { isAuthenticated } = useAuth()

    useEffect(() => {
        if(!isAuthenticated) return
        checkinService.watchCheckins(setCheckins)

        return () => checkinService.unwatchCheckins()
    }, [isAuthenticated])

    const createCheckin = async (checkin: Checkin) => {
        setIsCreatingCheckin(true)
        await checkinService.createCheckin(checkin)
        setIsCreatingCheckin(false)
    }

    return(
        <CheckinContext.Provider value={{ checkins, createCheckin , isCreatingCheckin}}>
            {children}
        </CheckinContext.Provider>
    )
}


export const useCheckin = () => useContext(CheckinContext)