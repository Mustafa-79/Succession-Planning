import './App.css'
import {Routes, Route} from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Home from '../src/pages/Home';
import Signup from './pages/Signup';
import Login from '../src/pages/Login';
import axios from 'axios';
import {Toaster} from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext';
import Dashboard from './pages/Dashboard';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
    <Navbar />
    <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
    <Routes>
      <Route path='/' element={<Login /> } />
      <Route path='/signup' element={<Signup /> } />
      <Route path='/login' element={<Login /> } />
      <Route path='/dashboard' element={<Dashboard /> } />
    </Routes>
    </UserContextProvider>
  )
}

export default App
