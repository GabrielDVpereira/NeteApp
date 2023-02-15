import { useState, createContext, ReactNode, useContext, useEffect, useCallback } from "react";
import { ROUTE_PATHS } from "_/constants";
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
    redirectRoute: ROUTE_PATHS
    addRedirectRoute: (route: ROUTE_PATHS)=> void
}

const AuthContext = createContext<ContextData>({} as ContextData)

export function AuthContextProvider({ authService, children } : Props) {
    const [user, setUser] = useState<User>({} as User)
    const [loadingAuth, setLoadingAuth] = useState(true)
    const [redirectRoute, setRedirectRoute] = useState<ROUTE_PATHS>(ROUTE_PATHS.home)

    const isAuthenticated = !!user.email
    const isAdmin = user.admin

    useEffect(() => {
        const checkAuthenticated = async () => {
            setLoadingAuth(true)
            const userResponse = await authService.checkAuthenticated()
            if (userResponse){
                setUser(userResponse)
            }
            setLoadingAuth(false)
        }

        checkAuthenticated()
    }, [authService])

    const addRedirectRoute = (route: ROUTE_PATHS) => {
        setRedirectRoute(route)
    }

    const signIn = useCallback(async () => {
        const userResponse = await authService.signIn()
        if(!userResponse) return
        setUser(userResponse)
    }, [authService])

    const logout = useCallback(() => {
        setRedirectRoute(ROUTE_PATHS.home)
        authService.logout()
        setUser({} as User)
    }, [authService])

    return (
        <AuthContext.Provider value={{
            user,
            signIn,
            isAuthenticated,
            isAdmin,
            loadingAuth,
            logout,
            redirectRoute,
            addRedirectRoute
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)