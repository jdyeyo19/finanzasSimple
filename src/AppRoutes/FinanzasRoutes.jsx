import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from '../Login/Login'
import Home from '../Pages/Home';
import LandingPage from '../Pages/LandingPage';
function FinanzasRoutes(){
    return(
      <BrowserRouter>
        <Routes>
          <Route path='' element={<LandingPage />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/home' element={<Home />}/>
        </Routes>

      </BrowserRouter>
    )
}
export default FinanzasRoutes;