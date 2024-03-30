import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFileArrowDown, faFileArrowUp, faStreetView, faGear, faBuilding, faUser, faFileLines, faTriangleExclamation, faEye, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import './AdminProfile.css';
import './fonts.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import defaultImg from '../img/profile-default.svg'


export default function AdminProfile() {
    const location = useLocation();
    const user = location.state.name;
    const navigate = useNavigate();


    const menuItems = [
        { name: "Employee Development", icon: faHouse, margin: 0, path: "/dashboard" },
        { name: "Assess Feedback", icon: faFileArrowDown, margin: 12, path: "/assess_feedback" },
        { name: "Create Assessment", icon: faFileArrowUp, margin: 10, path: "/create_assessment" },
        { name: "Employee Data", icon: faStreetView, margin: 3, path: "/employee_data" },
        { name: "Settings", icon: faGear, margin: 5, path: "/admin_settings" }
    ];

    const [data, setData] = useState({
        name: '',
        email: '',
        contactNumber: '',
        gender: '',
        adminID: '',
        profileImg: ''
    });


    const isActive = (path) => {
        return location.pathname === path; // Check if the current location matches the path
    };


    const handleMenuItemClick = (path, e) => {
        e.preventDefault()
        navigate(path, { state: {name: user}}); 
    };

    useEffect(() => {
        fetchData(); // Call the fetch function on component mount
    }, []); // Empty array means it will only run once when component mounts

    const fetchData = async (e) => {
        try {
            const resp = await axios.post('/getAdminProfile', {
                name: user
            })
            if (resp.data.error) {
                setData({})
            } else {
                setData({name: resp.data.name, email: resp.data.email, contactNumber: resp.data.contactNumber, gender: resp.data.gender, adminID: resp.data.employeeID, profileImg: resp.data.profile_picture, adminID: resp.data.adminID })
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
                            <span>Admin</span>
                        </div>
                    </div>
                    <div className="menu">
                        {menuItems.map(item => (
                                <div key={item.name} className={isActive(item.path) ? "active" : ""}>
                                    <FontAwesomeIcon icon={item.icon} className={isActive(item.path) ? "icon active" : "icon"} size="2x" color='rgb(196,196,202)' style={{ marginLeft: item.margin }} />
                                    <a href="" onClick={(e) => handleMenuItemClick(item.path, e)}>{item.name}</a>
                                </div>
                        ))}
                    </div>
                </div>
                <div className='content'>
                    <div className='header'>
                        <a href="" onClick={(e) => handleMenuItemClick('/aboutAdmin', e)}>About</a>
                        <span>|</span>
                        <FontAwesomeIcon icon={faUser} size='xl' color='rgb(196,196,202)' />
                        <a href="" onClick={(e) => handleMenuItemClick('/AdminProfile', e)}>{user}</a>
                        <button
                            onClick={(e) => handleMenuItemClick('/login', e)}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#f44336',
                                color: 'white',
                                border: 'none',
                                borderRadius: '15px',
                                cursor: 'pointer'
                            }}
                        >
                            Logout
                        </button>
                    </div>
                    <div className="profile-header">
                    <label htmlFor='profile-image' className='profile-image-label'>
                        <img src={data.profileImg || defaultImg} alt="Profile" className='profile-image-pic'/>
                        </label>
                    </div>
                    <div class="profile-settings">
                        <h1>{data.name}</h1>
                        <form>
                            <label for="empID">Admin ID</label>
                            <input 
                                type="text"
                                value={data.adminID}
                                disabled={true}
                            />
                            
                            <label for="email">Email</label>
                            <input 
                                type="email"
                                value={data.email}
                                disabled={true}
                            />

                            <label for="contact">Contact No.</label>
                            <input 
                                type="text"
                                value={data.contactNumber}
                                disabled={true}
                            />

                            <label for="gender">Gender</label>
                            <input 
                                type="text"
                                value={data.gender}
                                disabled={true}
                            />
                        </form>
                    </div>


                </div>
            </div>
        </div>
    );
}