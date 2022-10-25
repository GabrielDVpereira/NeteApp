
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Checkin, Home, Login } from '_/pages'
import { Protected } from "./protected.route"

export function AppRoutes(){
    return(
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
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