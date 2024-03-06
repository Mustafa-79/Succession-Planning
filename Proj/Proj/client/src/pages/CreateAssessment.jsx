import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFileArrowDown, faFileArrowUp, faStreetView, faGear, faBuilding, faUser, faFileLines, faTriangleExclamation, faEye, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import './CreateAssessment.css';
import './fonts.css';
import { Link, useNavigate } from 'react-router-dom';


export default function CreateAssessment() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate(); // Initialize useNavigate


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


    const handleMenuItemClick = (path) => {
        navigate(path); // Use navigate instead of history.push
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
                                    <a href="#" onClick={() => handleMenuItemClick(item.path)}>{item.name}</a>
                                </div>
                        ))}
                    </div>
                </div>
                <div className='content'>
                    <div className='header'>
                        <a href="">About</a>
                        <span>|</span>
                        <FontAwesomeIcon icon={faUser} size='xl' color='rgb(196,196,202)' />
                        <a href="">Arbaaz Butt</a>
                    </div>
                    <div className='employeeFunctions'>
                            <h1>To be Implemented. Mauj Masti ruk gayi sari 2</h1>
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="modalOverlay">
                    <div className="modalContent">
                        <span className="closeModal" onClick={closeModal}>&times;</span>
                        <h2>Add New Employee</h2>
                        <form className="addEmployeeForm" onSubmit={handleSubmit}>
                            <div className="formGroup">
                                <label htmlFor="role">Role Qualification:</label>
                                <input type="text" id="role" value={newEmployeeData.role} onChange={(e) => setNewEmployeeData({ ...newEmployeeData, role: e.target.value })} />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="age">Age:</label>
                                <input type="number" id="age" value={newEmployeeData.age} onChange={(e) => setNewEmployeeData({ ...newEmployeeData, age: e.target.value })} />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="contact">Contact:</label>
                                <input type="text" id="contact" value={newEmployeeData.contact} onChange={(e) => setNewEmployeeData({ ...newEmployeeData, contact: e.target.value })} />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="hoursWorked">Hours Worked:</label>
                                <input type="number" id="hoursWorked" value={newEmployeeData.hoursWorked} onChange={(e) => setNewEmployeeData({ ...newEmployeeData, hoursWorked: e.target.value })} />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="status">Status:</label>
                                <select id="status" value={newEmployeeData.status} onChange={(e) => setNewEmployeeData({ ...newEmployeeData, status: e.target.value })}>
                                    <option value="">Select Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            <button type="submit">Add Employee</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}