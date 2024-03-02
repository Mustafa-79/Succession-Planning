import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFileArrowDown, faFileArrowUp, faStreetView, faGear, faBuilding, faUser, faFileLines, faTriangleExclamation, faEye, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';
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

    const handleMenuItemClick = (itemName) => {
        setActiveMenuItem(itemName);
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
                                        <th>Role Qualification</th>
                                        <th>Age</th>
                                        <th>Contact</th>
                                        <th>Hours Worked</th>
                                        <th>Status</th>
                                        <th>Delete Employee</th>
                                        <th>View Performance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                  {employees
                                      .filter(employee => employee.id.toString().includes(searchTerm))
                                      .map(employee => (
                                          <tr key={employee.id}>
                                              <td>{employee.id}</td>
                                              <td>{employee.role}</td>
                                              <td>{employee.age}</td>
                                              <td>{employee.contact}</td>
                                              <td>{employee.hoursWorked}</td>
                                              <td>{employee.status}</td>
                                              <td>
                                                  <button onClick={() => deleteEmployee(employee.id)}>
                                                      <FontAwesomeIcon icon={faTrash} size='xl' />
                                                  </button>
                                              </td>
                                              <td>
                                                  <a href=""><FontAwesomeIcon icon={faEye} size='xl'/></a>
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