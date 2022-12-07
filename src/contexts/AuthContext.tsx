import { useState, createContext, ReactNode, useContext, useEffect, useCallback } from "react";
import { User } from "_/models";
import { IAuthService } from "_/services"


interface Props{
    authService: IAuthService
    children: ReactNode
}

interface ContextData {
    user: User
    isAdmin: boolean
    isAuthenticated: boolean
    signIn: ()=> Promise<void>
    loadingAuth: boolean
    logout: ()=> void
}

const AuthContext = createContext<ContextData>({} as ContextData)

export function AuthContextProvider({ authService, children } : Props) {
    const [user, setUser] = useState<User>({} as User)
    const [loadingAuth, setLoadingAuth] = useState(true)

    const isAuthenticated = !!user.email
    const isAdmin = user.admin

    useEffect(() => {
        checkAuthenticated()
    }, [])

    const checkAuthenticated = async () => {
        setLoadingAuth(true)
        const userResponse = await authService.checkAuthenticated()
        if (userResponse){
            setUser(userResponse)
        }
        setLoadingAuth(false)
    }

    const signIn = useCallback(async () => {
        const userResponse = await authService.signIn()
        if(!userResponse) return
        setUser(userResponse)
    }, [])

    const logout = useCallback(() => {
        authService.logout()
        setUser({} as User)
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            signIn,
            isAuthenticated,
            isAdmin,
            loadingAuth,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)