import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../../context/userContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFileArrowDown, faFileArrowUp, faStreetView, faGear, faBuilding, faUser, faFileLines, faTriangleExclamation, faEye, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import './EmployeePerformance.css';
import './fonts.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';



export default function EmployeePerformance() {
    const location = useLocation();
    const user = location.state.name;
    const employeeInfo = location.state.info
    const navigate = useNavigate();


    const menuItems = [
        { name: "Employee Development", icon: faHouse, margin: 0, path: "/dashboard" },
        { name: "Assess Feedback", icon: faFileArrowDown, margin: 12, path: "/assess_feedback" },
        { name: "Create Assessment", icon: faFileArrowUp, margin: 10, path: "/create_assessment" },
        { name: "Employee Data", icon: faStreetView, margin: 3, path: "/employee_data" },
        { name: "Settings", icon: faGear, margin: 5, path: "/admin_settings" }
    ];

    const [activeMenuItem, setActiveMenuItem] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [employees, setEmployees] = useState([
        { id: 1, role: "Manager", age: 30, contact: "123-456-7890", hoursWorked: 40, status: "Active" }
    ]);
    const [newEmployeeData, setNewEmployeeData] = useState({
        role: "",
        age: "",
        contact: "",
        hoursWorked: "",
        status: ""
    });
    const [showModal, setShowModal] = useState(false);

    const isActive = (path) => {
        return location.pathname === path; // Check if the current location matches the path
    };


    const handleMenuItemClick = (path, e) => {
        e.preventDefault()
        navigate(path, { state: { name: user } });
    };

    const addEmployee = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setNewEmployeeData({
            role: "",
            age: "",
            contact: "",
            hoursWorked: "",
            status: ""
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newEmployeeData);
        const newEmployee = {
            id: employees.length + 1,
            ...newEmployeeData
        };
        setEmployees([...employees, newEmployee]);
        closeModal();
    };

    const deleteEmployee = (id) => {
        setEmployees(employees.filter(employee => employee.id !== id));
    };

    const performanceIndicators = [
        {name: 'Punctuality', score:90},
        {name: 'Efficiency', score:80},
        {name: 'Task Completion', score:60},
        {name: 'Workshop Completion', score:30},
        {name: 'Professional Development', score:30},
        {name: 'Leadership skills', score:30},
        {name: 'Collaboration skills', score:38}

    ]

    const ProgressBar = (props) => {
        const { bgcolor, completed } = props;
      
        const containerStyles = {
          height: 20,
          width: '25vw',
          backgroundColor: "#e0e0de",
          borderRadius: 20,
          margin: 50
        }
      
        const fillerStyles = {
          height: '100%',
          width: `${completed}%`,
          backgroundColor: bgcolor,
          borderRadius: 'inherit',
          textAlign: 'right'
        }
      
        const labelStyles = {
          color: 'white',
          fontWeight: 'bold'
        }
      
        return (
          <div style={containerStyles}>
            <div style={fillerStyles}>
              <span style={labelStyles}>{`${completed}%`}</span>
            </div>
          </div>
        );
      };

      const [positionTitles, setPositionTitles] = useState([]);
      useEffect(() => {
          axios.get('/dashboard-position-titles')
              .then(res => {
                  setPositionTitles(res.data);
                  console.log(res.data);
              })
              .catch(err => {
                  console.error(err);
                  toast.error('Failed to fetch position titles');
              });
      }, []);
  
      // function to convert positionID to position title
      const getPositionTitle = (positionID) => {
          const position = positionTitles.find(position => position.positionID === positionID);
          return position ? position.title : "Unknown";
      };

      const getAge = (dateOfBirth) => {
        if (!dateOfBirth) return "Unknown";
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
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
                            <div key={item.name} className={isActive(item.path) ? "active" : ""}>
                                <FontAwesomeIcon icon={item.icon} className={isActive(item.path) ? "icon active" : "icon"} size="2x" color='rgb(196,196,202)' style={{ marginLeft: item.margin }} />
                                <a href="" onClick={(e) => handleMenuItemClick(item.path, e)}>{item.name}</a>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='contentPerf'>
                    <div className='header'>
                        <a href="" onClick={(e) => handleMenuItemClick('/aboutAdmin', e)}>About</a>
                        <span>|</span>
                        <FontAwesomeIcon icon={faUser} size='xl' color='rgb(196,196,202)' />
                        <a href="">{user}</a>
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
                        <div className='employeeInfo'>
                            <div  className='employeeHeading' style={{marginBottom: "20px"}} >Employee Information</div>
                            <div>
                                <div>
                                    <div className='infoType'>Employee ID</div>
                                    <div className='infoContainer'   >{employeeInfo.employeeID}</div>
                                </div>
                                <div>
                                    <div className='infoType'>Age</div>
                                    <div className='infoContainer' style={{marginLeft: "45px"}} >{getAge(employeeInfo.date_of_birth)}</div>
                                </div>
                                <div>
                                    <div className='infoType'>Qualification</div>
                                    <div className='infoContainer'>{employeeInfo.education[0]}</div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div className='infoType'>Name</div>
                                    <div className='infoContainer' style={{marginLeft: "75px"}}>{employeeInfo.name}</div>
                                </div>
                                <div>
                                    <div className='infoType'>Contact</div>
                                    <div className='infoContainer'>{employeeInfo.contactNumber}</div>
                                </div>
                                <div>
                                    <div className='infoType'>Role</div> 
                                    <div className='infoContainer'  style={{marginLeft: "70px"}}>{getPositionTitle(employeeInfo.positionID)}</div>
                                </div>
                            </div>
                        </div>
                        <div className='employeePerformance'>
                            <div className='employeeHeading' style={{marginTop: "0px"}}>Employee Performance</div>
                            <div className='kpiContainer'>
                                {performanceIndicators.map((kpi)=>(
                                    <div className='kpiNameBar'>
                                        <div>{kpi.name}</div>
                                        <div className='progressBar'>
                                            <ProgressBar bgcolor='#30E257' completed = {kpi.score}/>
                                        </div>
                                    </div>

                                ))}
                            </div>

                        </div>
                </div>
            </div>
        </div>
    );
}