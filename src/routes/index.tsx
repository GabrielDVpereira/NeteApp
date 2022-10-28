
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Loading } from '_/components'
import { ROUTE_PATHS } from '_/constants'
import { useAuth } from '_/contexts'
import { Checkin, Home, Login, Booking } from '_/pages'
import { Protected } from "./protected.route"

export function AppRoutes(){
    const { loadingAuth } = useAuth()

    if(loadingAuth) return <Loading />

    return(
      <BrowserRouter>
        <Routes>
          <Route index element={
            <Protected>
              <Home />
            </Protected>
          } />
          <Route path={ ROUTE_PATHS.login } element={<Login />} />
          <Route 
            path={ROUTE_PATHS.checkin}
            element={
              <Protected>
                <Checkin />
              </Protected>
            }/>
          <Route 
            path={ROUTE_PATHS.booking}
            element={
              <Protected>
                <Booking />
              </Protected>
            }/>
        </Routes>
      </BrowserRouter>
    )
}