import { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFileArrowDown, faFileArrowUp, faStreetView, faGear, faBuilding } from '@fortawesome/free-solid-svg-icons';
import './fonts.css';


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
                      <div><FontAwesomeIcon icon={faBuilding} size="4x" color='rgb(34,137,255)'/><span>Admin</span></div>
                  </div>
                  <div className="menu">
                      {menuItems.map(item => (
                          <div key={item.name} className={activeMenuItem === item.name ? "active" : ""}>
                              <FontAwesomeIcon icon={item.icon} className={activeMenuItem === item.name ? "icon active" : "icon"} size="2x" color='rgb(196,196,202)' style={{marginLeft: item.margin}} />
                              <a href="#" onClick={() => handleMenuItemClick(item.name)}>{item.name}</a>
                          </div>
                      ))}
                  </div>
              </div>
              <div className='content'>
                  <div className='header'></div>
                  <div className='employeeFunctions'></div>
                  <div className='employeeSection'>
                      <div className='searchAndAdd'></div>
                      <div className='employeeData'></div>
                  </div>
              </div>
          </div>
      </div>
  );
}