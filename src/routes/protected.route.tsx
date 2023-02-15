import { Navigate, useLocation } from "react-router-dom"
import { ROUTE_PATHS } from "_/constants";
import { useAuth } from "_/contexts";

interface Props {
    children: JSX.Element
}
export function Protected({ children }:Props){
    const { isAuthenticated, addRedirectRoute } = useAuth()
    const { pathname } = useLocation()

    if(!isAuthenticated){
        addRedirectRoute(pathname as ROUTE_PATHS)
        return <Navigate to={ROUTE_PATHS.login} replace={true} />
    }
    return children
 }