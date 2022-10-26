import { Navigate, PathRouteProps, Route } from "react-router-dom"
import { useAuth } from "_/contexts";

interface Props {
    children: JSX.Element
}
export function Protected({ children }:Props){
    const { isAuthenticated } = useAuth()
    if(!isAuthenticated) return <Navigate to="/login" replace={true} />
    return children
 }