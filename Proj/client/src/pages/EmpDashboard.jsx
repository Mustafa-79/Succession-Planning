import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFileArrowDown, faFileArrowUp, faGear, faBuilding, faUser } from '@fortawesome/free-solid-svg-icons';
import './EmployeeDashboard.css';
import './fonts.css';

// Employee Dashboard component
export default function EmployeeDashboard() {
    // Fetching location and user data
    const location = useLocation(); // Hook to access the current location
    const user = location.state.name; // Extracting user name from location state
    const navigate = useNavigate(); // Hook to navigate programmatically

    // Define menu items with names, icons, margins, and paths
    const menuItems = [
        { name: "Career Path", icon: faHouse, margin: 0, path: "/employeeDashboard" }, // Career Path item
        { name: "Personal Development Plans", icon: faFileArrowDown, margin: 4, path: "/developmentPlans" }, // Development Plans item
        { name: "Feedback Tools", icon: faFileArrowUp, margin: 7, path: "/feedbackForm" }, // Feedback Tools item
        { name: "Settings", icon: faGear, margin: 0, path: "/employeeSettings" } // Settings item
    ];
    
    // State to manage active menu item
    const [activeMenuItem, setActiveMenuItem] = useState(""); // State variable to track active menu item

    // Function to handle menu item click
    const handleMenuItemClick = (path, e) => {
        e.preventDefault(); // Prevent default link behavior
        // Navigate to the clicked path with user state
        navigate(path, { state: { name: user } }); 
    };

    return (
        <div className='overlay'>
            <div className='wrapper'>
                {/* Sidebar section */}
                <div className='sidebar'>
                    {/* Logo section */}
                    <div className="logo">
                        <div>
                            <div className="logo-icon-container">
                                {/* Company logo */}
                                <FontAwesomeIcon icon={faBuilding} size="4x" color='rgb(34,137,255)' />
                            </div>
                            <span>Employee</span>
                        </div>
                    </div>
                    {/* Menu section */}
                    <div className="menu">
                        {/* Rendering menu items */}
                        {menuItems.map(item => (
                            <div key={item.name} className={activeMenuItem === item.name ? "active" : ""}>
                                {/* Menu item icon */}
                                <FontAwesomeIcon icon={item.icon} className={activeMenuItem === item.name ? "icon active" : "icon"} size="2x" color='rgb(196,196,202)' style={{ marginLeft: item.margin }} />
                                {/* Menu item with click handler */}
                                <a href="" onClick={(e) => handleMenuItemClick(item.path, e)}>{item.name}</a>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Main content section */}
                <div className='contentDashClient'>
                    {/* Header section */}
                    <div className='header'>
                        <a href="">About</a>
                        <span>|</span>
                        {/* User icon */}
                        <FontAwesomeIcon icon={faUser} size='xl' color='rgb(196,196,202)' />
                        {/* User name */}
                        <a href="">{user}</a>
                        {/* Logout button */}
                        <button
                            onClick={() => navigate('/login')}
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

                    {/* Promotional items section */}
                    <div className='promotionsWrapper'>
                        {/* Individual promotional items */}
                        <div className='promotionItem' id='position'>
                            <div >Promotional Positions Available.</div>
                        </div>
                        <div className='promotionItem' id='skills'>
                            <div>Promotion Skill Set Required.</div>
                        </div>
                        <div className='promotionItem' id='progress'>
                            <div>View Promotion Progress.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}