
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ROUTE_PATHS } from '_/constants'
import { Checkin, Home, Login, Booking } from '_/pages'
import { Protected } from "./protected.route"

export function AppRoutes(){
    return(
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
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