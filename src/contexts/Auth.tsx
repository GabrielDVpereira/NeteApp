import { useState, createContext, ReactNode, useContext, useEffect } from "react";
import { User } from "_/models";
import { IAuthService } from "_/services"


interface Props{
    authService: IAuthService,
    children: ReactNode
}

interface ContextData {
    user: User,
    isAuthenticated: boolean,
    signInWithGoogle: ()=> Promise<void>
    loadingAuth: boolean,
    logout: ()=> void
}

const AuthContext = createContext<ContextData>({} as ContextData)

export function AuthContextProvider({ authService, children } : Props) {
    const [user, setUser] = useState<User>({} as User)
    const [loadingAuth, setLoadingAuth] = useState(true)

    const isAuthenticated = !!user.email

    useEffect(() => {
        checkAuthenticated()
    }, [])

    const checkAuthenticated = async () => {
        setLoadingAuth(true)
        const userResponse = await authService.checkAuthenticated()
        setUser(userResponse)
        setLoadingAuth(false)
    }

    const signInWithGoogle = async () => {
        const userResponse = await authService.signInWithGoogle()
        if(!userResponse) return
        setUser(userResponse)
    }

    const logout = () => {
        authService.logout()
        setUser({} as User)
    }

    return (
        <AuthContext.Provider value={{
            user,
            signInWithGoogle,
            isAuthenticated,
            loadingAuth,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)