import { Navigate, PathRouteProps, Route } from "react-router-dom"

interface Props {
    children: JSX.Element
}
export function Protected({ children }:Props){
    const isAuthenticated = true; 
    if(!isAuthenticated) return <Navigate to="/login" replace={true} />
    return children
 }