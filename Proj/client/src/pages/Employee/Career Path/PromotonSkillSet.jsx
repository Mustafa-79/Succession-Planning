import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFileArrowDown, faFileArrowUp, faStreetView, faGear, faBuilding, faUser, faFileLines, faTriangleExclamation, faEye, faTrash, faSearch, faL } from '@fortawesome/free-solid-svg-icons';
import './PromotionSkillSet.css';
import '../fonts.css';
import axios from 'axios'
import toast from 'react-hot-toast';
import ViewPosition from '../../../components/ViewPosition';


export default function AvailablePositions() {
    const location = useLocation();
    const user = location.state.name;
    const allUserInfo = location.state.userInfo;

    const navigate = useNavigate();

    const menuItems = [
        { name: "Career Path", icon: faHouse, margin: 0, path: "/employeeDashboard" },
        { name: "Personal Development Plans", icon: faFileArrowDown, margin: 4, path: "/developmentPlans" },
        { name: "Feedback Tools", icon: faFileArrowUp, margin: 7, path: "/feedback" },
        { name: "Settings", icon: faGear, margin: 0, path: "/employeeSettings" }
    ];

    const [activeMenuItem, setActiveMenuItem] = useState("");

    const [positions, setPositions] = useState([])
    const [courses, setCourses] = useState([])
    const [workshops, setWorkshops] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [modalPosition, setModalPosition] = useState(null)
    

    const getPositionTitle = (positionID) => {
        const position = positions.find(position => position.positionID === positionID);
        return position ? position.title : "Unknown";
    };

    const getPositionData = async () => {
        try {
            const resp = await axios.get('/getPositionsData')
            setPositions(resp.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getCoursesData = async () => {
        try {
            const resp = await axios.get('/getCoursesData')
            setCourses(resp.data)
        } catch (err) {
            console.log(err)
        }
    }
    
    const getWorkshopsData = async () => {
        try {
            const resp = await axios.get('/getWorkshopsData')
            setWorkshops(resp.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleClick = (position) => {
        setModalPosition(position)
        setShowModal(true)
    }

    useEffect(() => {
        getPositionData()
        getCoursesData()
        getWorkshopsData()
    }, [])


    const availablePositionsSet =()=> {
                let currEmployee = getCurrentEmployee(user)
                console.log("here: ", currEmployee)

                let currHierarchy = getPositionHierarchy(currEmployee.positionID)
                let new_positions = positions.filter(position => position.hierarchy_level === (currHierarchy -1))
     
                if(new_positions.length==0)
                {
                    setNoPosition(true)
                }
                setAvailablePositions(new_positions)
                setTitle(getPositionTitle(currEmployee.positionID))

    }

    const handleMenuItemClick = (path, e) => {
        navigate(path, { state: { name: user,userInfo:allUserInfo } });
    };

    const isActive = (path) => {
        return location.pathname === path; // Check if the current location matches the path
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
                            <span>Employee</span>
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
                <div className='contentDashClient'>
                    <div className='header'>
                        <a href="" onClick={(e) => handleMenuItemClick('/about', e)}>About</a>
                        <span>|</span>
                        <FontAwesomeIcon icon={faUser} size='xl' color='rgb(196,196,202)' />
                        <a href="" onClick={(e) => handleMenuItemClick('/UserProfile', e)}>{user}</a>
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
                    <div className='positionsDashboard'>

                        <div className="form-heading">
                            <FontAwesomeIcon
                                icon={faUser}
                                size="2x"
                                color="rgb(34, 137, 255)"
                            />
                            <h1>Review Required Skill Sets</h1>
                        </div>


                        <div className='positionStatus'>
                            <div className='status'>
                                <span id='posHolderAll'>Select a position to view skillset required</span>
                            </div>
                        </div>


                        <div className='positionCardsAll'>
                            {positions.map((val, idx) => {
                            return (
                                <div key={idx} className='positionItem' onClick={(e) => handleClick(val)}>
                                    <div className='positionContent'>
                                        <div className="personImage"> </div>
                                        <div className="personName">{getPositionTitle(val.positionID)}</div>
                                    </div>
                                </div>)})}
                        </div>
                        {showModal &&
                            <div className="position-modal">
                                <ViewPosition position={modalPosition} title={getPositionTitle(modalPosition.positionID)} courses={courses} workshops={workshops}/>
                                <span className="close-position-modal" onClick={(e) => {setShowModal(false)}} >&times;</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}