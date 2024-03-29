import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../../context/userContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFileArrowDown, faFileArrowUp, faStreetView, faGear, faBuilding, faUser, faFileLines, faTriangleExclamation, faEye, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';
import './fonts.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';


export default function Dashboard() {
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

    const [activeMenuItem, setActiveMenuItem] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [employees, setEmployees] = useState([
        // { id: 1, role: "Manager", age: 30, contact: "123-456-7890", hoursWorked: 40, status: "Active" }
    ]);

    // Fetching all employees from the database
    useEffect(() => {
        axios.get('/dashboard-employees')
            .then(res => {
                console.log(res.data);
                setEmployees(res.data);
            })
            .catch(err => {
                console.log(err);
                toast.error('Failed to fetch employees');
            });
    }, []);



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

    // function to get age from date of birth
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


    const [newEmployeeData, setNewEmployeeData] = useState({
        employeeID: "",
        name: "",
        positionID: "",
        registered_status: false,
        email: "",
    });
    const [showModal, setShowModal] = useState(false);

    const isActive = (path) => {
        return location.pathname === path; // Check if the current location matches the path
    };


    const handleMenuItemClick = (path, e) => {
        e.preventDefault()
        navigate(path, { state: {name: user}}); 
    };

    const viewPerformance = (path,e,employee) => {
        console.log("hi", employee)
        e.preventDefault()
        navigate(path, { state: {name: user, info:employee}}); 
    }

    const addEmployee = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setNewEmployeeData({
            role: "",
            age: "",
            contact: "",
            status: "",
            email: "",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // set the email to the employeeID + @lums.edu.pk
            newEmployeeData.email = newEmployeeData.employeeID + '@lums.edu.pk';
            // setNewEmployeeData({ ...newEmployeeData, email: newEmployeeData.employeeID + '@lums.edu.pk' });

            console.log(newEmployeeData);
            const response = await axios.post('/addEmployeeFromAdminDashboard', newEmployeeData);
            console.log('Employee added:', response.data);
            // setEmployees([...employees, response.data]);

            // Fetch all employees again to update the list
            axios.get('/dashboard-employees')
                .then(res => {
                    console.log(res.data);
                    setEmployees(res.data);
                })
                .catch(err => {
                    console.log(err);
                    toast.error('Failed to fetch employees');
                });



            closeModal();
        } catch (error) {
            console.error('Failed to add employee:', error);
            // Handle error
        }
    };

    // deleteEmployee(employee.id)}
    const deleteEmployee = async (id) => {
        try {
            console.log('Deleting employee:', id);
            const response = await axios.post(`/deleteEmployee/${id}`);
            console.log('Employee deleted:', response.data);
            // setEmployees(employees.filter(employee => employee.id !== id));

            // Fetch all employees again to update the list
            axios.get('/dashboard-employees')
                .then(res => {
                    console.log(res.data);
                    setEmployees(res.data);

                    toast.success('Employee deleted successfully');
                })
                .catch(err => {
                    console.log(err);
                    toast.error('Failed to fetch employees');
                });

        } catch (error) {
            console.error('Failed to delete employee:', error);
            // Handle error
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
                <div className='contentAdminDash'>
                    <div className='header'>
                        <a href="" onClick={(e) => handleMenuItemClick('/aboutAdmin', e)}>About</a>
                        <span>|</span>
                        <FontAwesomeIcon icon={faUser} size='xl' color='rgb(196,196,202)' />
                        <a href="">{user}</a>
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
                                <div className='funcCount'>{employees.length}</div>
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
                                    <FontAwesomeIcon icon={faTriangleExclamation} size='3x' color='rgb(255,157,71)' />
                                    <a href="">View</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='employeeSection'>
                        <div className='searchAndAdd'>
                            <div>
                                <input type="text" placeholder="Search by Employee ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                <FontAwesomeIcon icon={faSearch} />
                            </div>
                            <button onClick={addEmployee}>+ Add New Employee</button>
                        </div>
                        <div className='employeeData'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Employee ID</th>
                                        <th>Name</th>
                                        <th>Position ID</th>
                                        <th>Position Title</th>
                                        <th>Age</th>
                                        {/* <th>Contact</th>
                                        <th>Hours Worked</th> */}
                                        <th>Status</th>
                                        <th>Delete Employee</th>
                                        <th>View Performance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees
                                        .filter(employee => employee.employeeID.toString().includes(searchTerm))
                                        .map(employee => (
                                            <tr key={employee.employeeID}>
                                                <td>{employee.employeeID}</td>
                                                <td>{employee.name}</td>
                                                <td>{employee.positionID}</td>
                                                <td>{getPositionTitle(employee.positionID)}</td>
                                                <td>{getAge(employee.date_of_birth)}</td>
                                                {/* <td>{employee.contact}</td> */}
                                                {/* <td>{employee.hoursWorked}</td> */}
                                                <td>{employee.registered_status ? 'Registered' : 'Not registered'}</td>
                                                <td>
                                                    <button onClick={() => deleteEmployee(employee.employeeID)}>
                                                        <FontAwesomeIcon icon={faTrash} size='xl' />
                                                    </button>
                                                </td>
                                                <td>
                                                    <a href="" onClick={(e) => viewPerformance('/dashboard/performance', e, employee)}><FontAwesomeIcon icon={faEye} size='xl' /></a>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="modalOverlay">
                    <div className="modalContent">
                        <span className="closeModal" onClick={closeModal}>&times;</span>
                        <h2>Add Employee Form</h2>
                        <form className="addEmployeeForm" onSubmit={handleSubmit}>
                            <div className="formGroup">
                                <label htmlFor="employeeID">Employee ID:</label>
                                <input type="text" required id="employeeID" value={newEmployeeData.employeeID} onChange={(e) => setNewEmployeeData({ ...newEmployeeData, employeeID: e.target.value })} />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="name">Name:</label>
                                <input type="text" required id="name" value={newEmployeeData.name} onChange={(e) => setNewEmployeeData({ ...newEmployeeData, name: e.target.value })} />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="positionID">Position ID:</label>
                                <input type="text" required id="positionID" value={newEmployeeData.positionID} onChange={(e) => setNewEmployeeData({ ...newEmployeeData, positionID: e.target.value })} />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="registered_status">Registered Status:</label>
                                <select id="registered_status" value={newEmployeeData.registered_status} onChange={(e) => setNewEmployeeData({ ...newEmployeeData, registered_status: e.target.value })}>
                                    <option value="Unregistered">Unregistered</option>
                                </select>
                            </div>
                            <button type="submit" id='addEmployeeButton'>Add Employee</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}