import {useState} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import './Login.css'
import img1 from './img/s_img1.png'
import img2 from './img/s_img2.png'
import img3 from './img/s_img3.png'
import img4 from './img/s_img4.png'
import img5 from './img/s_img5.png'
import img6 from './img/s_img6.png'
import img7 from './img/s_img7.png'
import img8 from './img/s_img8.png'
import img9 from './img/s_img9.png'
import img10 from './img/s_img10.png'

export default function Login() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: '',
    password: '',
    s_img: 0,
  })

// mongodb pswd: vv69RlqX1n4nn9BH

  const loginUser = async (e) => {
    e.preventDefault()
    const {email, password, s_img} = data
    try {
      const {data} = await axios.post('/login', {
        email,
        password,
        s_img
      })
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({})
        navigate('/dashboard')
      }
    } catch (error) {
      
    }

  }

  return (
    // <div>
    //   <form onSubmit={loginUser}>
    //     <label>Email</label>
    //     <input type='email' placeholder='Enter email...' value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
    //     <label>Password</label>
    //     <input type='password' placeholder='Enter password...' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
    //     <button type='submit'>Login</button>
    //   </form>
    // </div>
    <div class="login-container">
      <div class="login-box">
        <h1>Login</h1>
        <form onSubmit={loginUser}>

        <div class="input-group">
        <input type='email' placeholder='Email' value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
        </div>

        <div class="input-group">
        <input type='password' placeholder='Password' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
        </div>

        <div className="security-image-selection">
          <p>Select security image </p>
          <div className="security-images">
            <img src={img1} alt="Security Icon 1" className={`security-image ${data.s_img === 1 ? "selected" : ""}`} onClick={(e) => setData({...data, s_img: 1})} />
            <img src={img2} alt="Security Icon 2" className={`security-image ${data.s_img === 2 ? "selected" : ""}`} onClick={(e) => setData({...data, s_img: 2})} />
            <img src={img3} alt="Security Icon 3" className={`security-image ${data.s_img === 3 ? "selected" : ""}`} onClick={(e) => setData({...data, s_img: 3})} />
            <img src={img4} alt="Security Icon 4" className={`security-image ${data.s_img === 4 ? "selected" : ""}`} onClick={(e) => setData({...data, s_img: 4})} />
            <img src={img5} alt="Security Icon 5" className={`security-image ${data.s_img === 5 ? "selected" : ""}`} onClick={(e) => setData({...data, s_img: 5})} />
          </div>
          <div className="security-images">
            <img src={img6} alt="Security Icon 6" className={`security-image ${data.s_img === 6 ? "selected" : ""}`} onClick={(e) => setData({...data, s_img: 6})} />
            <img src={img7} alt="Security Icon 7" className={`security-image ${data.s_img === 7 ? "selected" : ""}`} onClick={(e) => setData({...data, s_img: 7})} />
            <img src={img8} alt="Security Icon 8" className={`security-image ${data.s_img === 8 ? "selected" : ""}`} onClick={(e) => setData({...data, s_img: 8})} />
            <img src={img9} alt="Security Icon 9" className={`security-image ${data.s_img === 9 ? "selected" : ""}`} onClick={(e) => setData({...data, s_img: 9})} />
            <img src={img10} alt="Security Icon 10" className={`security-image ${data.s_img === 10 ? "selected" : ""}`} onClick={(e) => setData({...data, s_img: 10})} />
          </div>
        </div>

        <div class="input-group">
              <button type="submit" class="login-btn">Login</button>
        </div>
        </form>
      </div>
    </div>
  )
}
