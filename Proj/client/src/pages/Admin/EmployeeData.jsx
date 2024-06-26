import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFileArrowDown, faFileArrowUp, faStreetView, faGear, faBuilding, faUser, faFileLines, faTriangleExclamation, faEye, faTrash, faSearch, faEdit, faChartLine, faChain } from '@fortawesome/free-solid-svg-icons';
import './EmployeeData.css';
import axios from 'axios';
import './fonts.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ViewProfile from '../../components/ViewProfile';
import { FaCross } from 'react-icons/fa';
import EditMetrics from '../../components/EditMetrics';
import toast from 'react-hot-toast';
import { useLogout } from '../../hooks/useLogout';
import { useUserContext } from '../../hooks/useUserContext';


export default function EmployeeData() {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useLogout()
    
    const user = JSON.parse(localStorage.getItem('user'));

    const { authenticatedUser, no, path, dispatch} = useUserContext()

        //same as in other files
    const menuItems = [
        { name: "Dashboard", icon: faHouse, margin: 5, path: "/dashboard" },
        { name: "Assess Feedback", icon: faFileArrowDown, margin: 12, path:'/admin_feedback' },
        { name: "Create Assessment", icon: faFileArrowUp, margin: 10, path: "/admin_feedback/create_assessment" },
        { name: "Employee Data", icon: faStreetView, margin: 3, path: "/employee_data" },
        { name: "Model Tuning", icon: faChartLine, margin: 5, path: "/model_tuning" },
        { name: "Settings", icon: faGear, margin: 5, path: "/admin_settings" },
    ];

    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditModel, setShowEditModal] = useState(false);
    const [userData, setUserData] = useState(null);
    const [positions, setPositions] = useState([]);

    const isActive = (path) => {
        return location.pathname === path; // Check if the current location matches the path
    };

    const handleMenuItemClick = (path, e) => {
        e.preventDefault()
        navigate(path, { state: { userInfo: user }}); 
    };
    //function to get age from date of birth
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
    
    //function to fetch the employees from backend
    const fetchEmployees = async () => {
        try {
            const resp = await axios.get('/dashboard-employees')
            setEmployees(resp.data)
        } catch (err) {
            console.log(err)
        }
    }
    //function to update the status of the employee
    const statusUpdate = async (e, val) => {
        try {
            const resp = await axios.post('/change_status', {
                empID: val.employeeID,
                flag: e.target.value === 'active' ? false : true
            })
            toast.success(val.employeeID + "'s status updated successfully")
        } catch (err) {
            console.log(err)
        }
    }
    //useEffect to fetch the employees
    useEffect(() => {
        fetchEmployees()
    },[employees])

    useEffect(() => {
        dispatch({type: 'LOGIN', payload: user, no: 2, path: location.pathname})
        localStorage.setItem('path' ,JSON.stringify(location.pathname))
        document.title = 'Employee Data'
        getPositionData()
    },[])

    //function to view the profile of the employee
    const handleViewProfile = (e, val) => {
        console.log('hello')
        e.preventDefault();
        setShowModal(true);
        setUserData(val);
        console.log(userData)
    };

    //function to edit the metrics of the employee
    const handleEditMetrics = (e, val) => {
        console.log('hello')
        e.preventDefault();
        setShowEditModal(true);
        // setShowModal(true);
        setUserData(val);
    }

    //function to get the position title from the position ID
    const getPositionTitle = (positionID) => {
        const position = positions.find(position => position.positionID === positionID);
        // console.log(position, positionID)
        // console.log('hello', positionID)
        return position ? position.title : "Unknown";
    };

    //function to get the position data from the backend
    const getPositionData = async () => {
        try {
            const resp = await axios.get('/getPositionsData')
            setPositions(resp.data)
        } catch (err) {
            console.log(err)
        }
    }

    //function to update the position of the employee
    const positionUpdate = async (e, employee) => {
        try {
            console.log(e.target.value)
            const resp = await axios.post('/updatePosition', {
                employeeID: employee.employeeID,
                new_position: e.target.value
            })
            if (resp.data.error) {
                toast.error(resp.data.error)
            } else {
                toast.success(employee.name + "'s successfully updated")
                let update = []
                employees.map((v) => {
                    if (v.employeeID === employee.employeeID) {
                        update.push({...v, positionID: e.target.value})
                    } else {
                        update.push(v)
                    }
                })
                setEmployees(update)
            }
        } catch (err) {
            console.log(err)
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
                    <div className="menu">{/* Menu items */}
                        {menuItems.map(item => (
                                <div key={item.name} className={isActive(item.path) ? "active" : ""}>
                                    <FontAwesomeIcon icon={item.icon} className={isActive(item.path) ? "icon active" : "icon"} size="2x" color='rgb(196,196,202)' style={{ marginLeft: item.margin }} />
                                    <a href="" onClick={(e) => handleMenuItemClick(item.path, e)}>{item.name}</a>
                                </div>
                        ))}
                    </div>
                </div>
                <div className='contentData'>{/* Content of the page */}
                    <div className='header'>
                        <a href="" onClick={(e) => handleMenuItemClick('/aboutAdmin', e)}>About</a>
                        <span>|</span>
                        <FontAwesomeIcon icon={faUser} size='xl' color='rgb(196,196,202)' />
                        <a href="" onClick={(e) => handleMenuItemClick('/AdminProfile', e)}>{user && user.name}</a>
                        <button
                            onClick={() => logout()}
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
                    <div className='employee-data'> {/* Employee data */}
                        <table>
                            <thead>
                                <tr>
                                    <th>Employee ID</th>
                                    <th>Name</th>
                                    <th>Position</th>
                                    <th>Age</th>
                                    <th>Contact</th>
                                    <th>Email</th>
                                    <th>Account Status</th>
                                    <th>View Profile</th>
                                    <th>Edit Metrics</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees && employees.filter(v => v.registered_status).map((val, ind) => {
                                    return (
                                        <tr key={ind}>
                                            <td>{val.employeeID}</td>
                                            <td>{val.name}</td>
                                            <td>
                                                <select name="status" className="status-dropdown" value={val.positionID} onChange={(e) => positionUpdate(e, val)}>
                                                    {positions && positions.map((v) => {
                                                        return (
                                                            <option value={v.positionID}>{v.title}</option>
                                                        )
                                                    })}
                                                </select>
                                            </td>
                                            <td>{getAge(val.date_of_birth)}</td>
                                            <td>{val.contactNumber}</td>
                                            <td>{val.email}</td>
                                            <td>{/*for status*/}
                                                <select name="status" className="status-dropdown" value={!val.is_blocked ? 'active' : 'inactive'} onChange={(e) => statusUpdate(e, val)}>
                                                    <option value="active">Active</option>
                                                    <option value="inactive">Blocked</option>
                                                </select>
                                            </td>
                                            {/* <td >{val.is_blocked ? 'Blocked' : val.registered_status ? 'Registered' : 'Unregistered'}</td> */}
                                            <td><a href="" onClick={(e) => handleViewProfile(e, val)}><FontAwesomeIcon icon={faEye} size='xl' /></a></td>
                                            <td><a href="" onClick={(e) => handleEditMetrics(e, val)}><FontAwesomeIcon icon={faEdit} size='xl' /></a></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content-data">
                        <ViewProfile user={userData} />
                        <span className="close-Modal" onClick={() => setShowModal(false)} >&times;</span>
                    </div>
                </div>
            )}
            {showEditModel && (
                <div className="edit-modal-overlay">
                    <div className="edit-modal-content-data">
                        <EditMetrics user={userData} setModal={setShowEditModal}/>
                        <span className="close-Modal" onClick={() => setShowEditModal(false)} >&times;</span>
                    </div>
                </div>
            )}
        </div>
    );
}