import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFileArrowDown, faFileArrowUp, faStreetView, faGear, faBuilding, faUser,faFileLines,faTriangleExclamation,faEye } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css'; // Assuming you have a CSS file for additional styling
import './fonts.css'; // Import the CSS file where you imported the font

export default function Dashboard() {
    const { user } = useContext(UserContext);

    const menuItems = [
        { name: "Employee Development", icon: faHouse, margin: 0 },
        { name: "Assess Feedback", icon: faFileArrowDown, margin: 12 },
        { name: "Create Assessment", icon: faFileArrowUp, margin: 10 },
        { name: "Employee Data", icon: faStreetView, margin: 3 },
        { name: "Settings", icon: faGear, margin: 5 }
    ];

    const [activeMenuItem, setActiveMenuItem] = useState("");

    const handleMenuItemClick = (itemName) => {
        setActiveMenuItem(itemName);
    };

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
                            <div key={item.name} className={activeMenuItem === item.name ? "active" : ""}>
                                <FontAwesomeIcon icon={item.icon} className={activeMenuItem === item.name ? "icon active" : "icon"} size="2x" color='rgb(196,196,202)' style={{ marginLeft: item.margin }} />
                                <a href="#" onClick={() => handleMenuItemClick(item.name)}>{item.name}</a>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='content'>
                    <div className='header'>
                        <a href="">About</a>
                        <span>|</span>
                        <FontAwesomeIcon icon={faUser} size='xl' color='rgb(196,196,202)' />
                        <a href="">{user.name}</a>
                    </div>
                    <div className='employeeFunctions'>
                      <div className='employeeFunction'>
                        <div className='func'>High Potential Employees</div>
                        <div className='countAndView'>
                          <div className='funcCount'>06</div>
                          <div className='iconAndView'>
                            <FontAwesomeIcon icon={faFileLines} size='3x' color='rgb(255,157,71)' />
                            <a href="">View</a>
                          </div>
                        </div>
                      </div>
                      <div className='employeeFunction'>
                        <div className='func'>Total Employees</div>
                        <div className='countAndView'>
                          <div className='funcCount'>107</div>
                          <div className='iconAndView'>
                            <FontAwesomeIcon icon={faEye} size='3x' color='rgb(255,157,71)' />
                            <a href="">View</a>
                          </div>
                        </div>
                      </div>
                      <div className='employeeFunction'>
                        <div className='func'>Employees at Risk</div>
                        <div className='countAndView'>
                          <div className='funcCount'>12</div>
                          <div className='iconAndView'>
                          <FontAwesomeIcon icon={faTriangleExclamation} size='3x' color='rgb(255,157,71)'/>
                          <a href="">View</a>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div className='employeeSection'>
                        <div className='searchAndAdd'></div>
                        <div className='employeeData'></div>
                    </div>
                </div>
            </div>
        </div>
    );
}