
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Loading } from '_/components'
import { ROUTE_PATHS } from '_/constants'
import { useAuth } from '_/contexts'
import { CheckinPage, Home, Login, BookingPage, NotFound } from '_/pages'
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
                <CheckinPage />
              </Protected>
            }/>
          <Route
            path={ROUTE_PATHS.booking}
            element={
              <Protected>
                <BookingPage />
              </Protected>
            }/>
          <Route
            path="*"
            element={ <NotFound /> }
          />
        </Routes>
      </BrowserRouter>
    )
}