
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Title } from '_/components'
import { useAuth } from '_/contexts'
import { Checkin, Home, Login } from '_/pages'
import { Protected } from "./protected.route"

export function AppRoutes(){
    const { loadingAuth } = useAuth()

    if(loadingAuth) return <Title>Loading...</Title>

    return(
      <BrowserRouter>
        <Routes>
          <Route index element={
            <Protected>
              <Home />
            </Protected>
          } />
          <Route path='login' element={<Login />} />
          <Route
            path='checkin'
            element={
              <Protected>
                <Checkin />
              </Protected>
            }/>
        </Routes>
      </BrowserRouter>
    )
}