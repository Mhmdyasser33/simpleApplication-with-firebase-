import './App.css';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import { Signup } from './components/signUp/SignUp';
import { Update } from './components/update/Update';
import { ForgotPassword } from './components/forgot-password/ForgotPassword';
import { HomePage } from './components/homePage/HomePage';
import { Login } from './components/login/Login';
import ContextProvider from './context/AuthContext';
import { ProtectedRoutes } from './context/ProtectedRoutes';
function App() {
  return (
      <Container className='d-flex justify-content-center algn-items-center ' style={{minHeight:"100vh"}}>
      <div className='w-100 ' style={{maxWidth:"400px"}}>
        <Router>
          <ContextProvider>
          <Routes>
            <Route path='/' element={
              <ProtectedRoutes>
                <HomePage/>
            </ProtectedRoutes>
          }/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='/forgot-password' element={<ForgotPassword/>}/>
             <Route path='/update' element={<Update/>}/>
          </Routes>
          </ContextProvider>
        </Router>
      </div>
      </Container>
  );
}

export default App;
