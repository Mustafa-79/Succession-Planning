import {useEffect, useState} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import './Signup.css'
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

export default function Signup() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    empID: '',
    s_img: 0
  })

  const fetchData = async (e) => {
    const {name, email, password, empID, s_img} = data
    try {
      const resp = await axios.post('/registerUser', {
        name, email, password, empID, s_img
      })
      if (resp.data.error) {
        toast.error(resp.data.error)
        setData({...data, name: ''})
      } else {
        toast.success('Employee record found')
        setData({...data, name: resp.data.name})
      }

    } catch (error) {
      console.log(error)
    }
  }

  const searchRecord = async () => {
    try {
      const {name, email, password, empID, s_img} = data

      if(empID.trim() == '') {
        toast.error('Employee id missing')
      } else {
        await fetchData(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const registerUser = async (e) => {
    e.preventDefault();
    const {name, email, password, empID, s_img} = data
    try {
      const {data} = await axios.post('/signup', {
        name, email, password, empID, s_img
      })
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({})
        toast.success('Login Successful. Welcome!')
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    // <div>
    //   <form onSubmit={registerUser}>
    //     <label>Name</label>
    //     <input type='text' placeholder='Enter name...' value={data.name} onChange={(e) => setData({...data, name: e.target.value})}/>
    //     <label>Email</label>
    //     <input type='email' placeholder='Enter email...' value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
    //     <label>Password</label>
    //     <input type='password' placeholder='Enter password...' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
    //     <button type='submit'>Submit</button>
    //   </form>
    // </div>
      <div class="signup-container">
        <div class="signup-box">
          <h1>Employee Registration</h1>
          <form onSubmit={registerUser}>
            <div class="input-group">
              <input type="text" placeholder='Employee ID' value={data.empID} onChange={(e) => setData({...data, empID: e.target.value})}/>
              <button type="button" onClick={searchRecord} className="search-btn"><FaSearch />
              </button>
            </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="Name"
              value={data.name}
              onChange={(e) => {/* Handle changes if needed */}}
              disabled={true} // This makes the input non-interactive
              style={{ color: 'grey' }} // This styles the placeholder and value color
            />
          </div>


            <div class="input-group">
              <input type="email" placeholder='Email' value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
            </div>

            <div class="input-group">
              <input type="password" placeholder='Password (6 or more characters)' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
            </div>


            <div className="security-image-selection">
              <p>Choose a security image </p>
              <div className="security-images">
                <img src={img1} alt="Security Icon 1" className={`security-image ${data.s_img === 1 ? "selected" : ""}`} onClick={(e) => setData({...data, s_img: 1})} />
                <img src={img2} alt="Security Icon 2" className={`security-image ${data.s_img === 2 ? "selected" : ""}`} onClick={(e) => setData({...data, s_img: 2})} />
                <img src={img3} alt="Security Icon 3" className={`security-image ${data.s_
                   === 3 ? "selected" : ""}`} onClick={(e) => setData({...data, s_img: 3})} />
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
              <button type="submit" class="signup-btn">Register</button>
            </div>
          </form>
        </div>
      </div>
  )
}
