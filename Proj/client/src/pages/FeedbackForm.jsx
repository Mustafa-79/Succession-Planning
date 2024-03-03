import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { UserContext } from '../../context/userContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFileArrowDown, faFileArrowUp, faStreetView, faGear, faBuilding, faUser, faFileLines, faTriangleExclamation, faEye, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import './EmployeeDashboard.css';
import './fonts.css';

const StarRatingInput = ({ value, onRatingChange }) => {
    const stars = Array.from({ length: 5 }, (_, index) => index + 1);
  
    return (
      <div>
        {stars.map((star) => (
          <span
            key={star}
            style={{
              cursor: 'pointer',
              fontSize: '24px',
              color: star <= value ? 'gold' : 'gray',
              marginRight: '5px',
            }}
            onClick={() => onRatingChange(star)}
          >
            &#9733;
          </span>
        ))}
      </div>
    );
  };

export default function FeedbackForm() {
    const location = useLocation();
    const user = location.state.name;
    const navigate = useNavigate();

    const menuItems = [
        { name: "Career Path", icon: faHouse, margin: 0, path: "/feedback" },
        { name: "Personal Development Plans", icon: faFileArrowDown, margin: 4, path: "/feedback" },
        { name: "Feedback Tools", icon: faFileArrowUp, margin: 7, path: "/feedback" },
        { name: "Settings", icon: faGear, margin: 0, path: "/feedback" }
    ];

    const [activeMenuItem, setActiveMenuItem] = useState("");

    const [data, setData] = useState({
        courseID: '',
        feedback: '',
        empID: '',
        rating: 0
    })

    const handleMenuItemClick = (path, e) => {
        e.preventDefault()
        navigate(path, { state: {name: user}}); 
    };

    const sumbitFeedback = async (e) => {
        e.preventDefault()
        const {courseID, feedback, empID, rating} = data
        try {
          const {data} = await axios.post('/submitFeedback', {
            courseID, feedback, empID, rating
          })
          if (data.error) {
            toast.error(data.error)
          } else {
            console.log(data)
            setData({})
            toast.success('Feedback submitted successfully')
          }
        } catch (error) {
          console.log(error)
        }
    
      }

    return (
        <div className='overlay'>
            <div className='wrapper'>
                <div className='sidebar'>
                    <div className="logo">
                        <div>
                            <div className="logo-icon-container">
                                <FontAwesomeIcon icon={faBuilding} size="4x" color='rgb(34,137,255)' />
                            </div>
                            <span>Employee</span>
                        </div>
                    </div>
                    <div className="menu">
                        {menuItems.map(item => (
                            <div key={item.name} className={activeMenuItem === item.name ? "active" : ""}>
                                <FontAwesomeIcon icon={item.icon} className={activeMenuItem === item.name ? "icon active" : "icon"} size="2x" color='rgb(196,196,202)' style={{ marginLeft: item.margin }} />
                                <a onClick={(e) => handleMenuItemClick(item.path, e)}>{item.name}</a>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='content'>
                    <div className='header'>
                        <a href="">About</a>
                        <span>|</span>
                        <FontAwesomeIcon icon={faUser} size='xl' color='rgb(196,196,202)' />
                        <a href="">{user}</a>
                    </div>

                    <div className='main-body'>
                        <h3>Feedback Form</h3>
                        <form className='feedback-form' onSubmit={sumbitFeedback}>
                            <label htmlFor='course-id'>Course ID</label>
                            <input type='text' id='course-id' name='course-id' placeholder='Enter Course ID' value={data.courseID} onChange={(e) => setData({...data, courseID: e.target.value})}/>

                            <label htmlFor='feedback'>Feedback</label>
                            <textarea id='feedback' name='feedback' rows={8} cols={70} placeholder="Please provide your feedback or answer the following questions:
1. What did you like about the course?
2. What could be improved?
3. Any additional comments or suggestions?"
            required value={data.feedback} onChange={(e) => setData({...data, feedback: e.target.value})}></textarea>


                        <div classname="give-rating">
                            <h2>Give Rating</h2>
<StarRatingInput value={data.rating} onRatingChange={(newRating) => setData({...data, rating: newRating})} />

                        </div>

                            <button type='submit'>Submit Feedback</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}