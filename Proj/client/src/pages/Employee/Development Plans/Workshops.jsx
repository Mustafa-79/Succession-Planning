import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFileArrowDown, faFileArrowUp, faStreetView, faGear, faBuilding, faUser, faFileLines, faTriangleExclamation, faEye, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import './Workshops.css';
import '../fonts.css';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useLogout } from '../../../hooks/useLogout';
import { useUserContext } from '../../../hooks/useUserContext';

export default function Courses() {
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate();
    const employeeInfo = user;
    const { logout } = useLogout()
    const { authenticatedUser, no, dispatch } = useUserContext();

    // Menu items for the sidebar for navigation
    const menuItems = [
        { name: "Career Path", icon: faHouse, margin: 0, path: "/employeeDashboard" },
        { name: "Personal Development Plans", icon: faFileArrowDown, margin: 4, path: "/developmentPlans" },
        { name: "Feedback Tools", icon: faFileArrowUp, margin: 7, path: "/feedback" },
        { name: "Settings", icon: faGear, margin: 0, path: "/employeeSettings" }
    ];

    // State variables
    const [activeMenuItem, setActiveMenuItem] = useState("");
    const [positionTitles, setPositionTitles] = useState([]);
    const [courses, setCourses] = useState([])
    const [workshops, setWorkshops] = useState([])

    // Function to handle the click event on the menu items to navigate to the respective page
    const handleMenuItemClick = (path, e) => {
        e.preventDefault()
        navigate(path, { state: { userInfo: user } });
    };

    const isActive = (path) => {
        return '/developmentPlans' === path; // Check if the current location matches the path
    };

    useEffect(() => {
        document.title = 'Development Plans - Workshops'
        dispatch({ type: 'LOGIN', payload: user, no: 1, path: location.pathname })
        localStorage.setItem('path', JSON.stringify(location.pathname))

        // Fetch the position titles 
        axios.get('/dashboard-position-titles')
            .then(res => {
                setPositionTitles(res.data);
            })
            .catch(err => {
                console.error(err);
                toast.error('Failed to fetch position titles');
            });

        // Fetch the courses data
        axios.get('/dashboard-course-data')
            .then(res => {
                console.log(res.data)
                setCourses(res.data)
            })
            .catch(err => {
                console.log(err)
                toast.error('Failed to fetch courses')
            });

        // Fetch the workshops data for all the workshops
        axios.get('/dashboard-workshop-data')
            .then(res => {
                console.log(res.data)
                setWorkshops(res.data)
            })
            .catch(err => {
                console.log(err)
                toast.error('Failed to fetch workshops')
            });
    }, []);


    // Get courses given the positionID
    const getPositionalCourses = (positionID) => {
        const position = positionTitles.find(position => position.positionID === positionID);
        return position ? position.courses : []
    }

    // function to get the workshops for a position
    const getPositionalWorkshops = (positionID) => {
        const position = positionTitles.find(position => position.positionID === positionID);
        return position ? position.workshops : []
    }

    // Get the course title given the course ID
    const getCourseTitle = (courseID) => {
        const course = courses.find(course => course.courseID === courseID)
        return course ? course.title : []
    }

    // Get the workshop title given the workshop ID
    const getWorkshopTitle = (workshopID) => {
        const workshop = workshops.find(workshop => workshop.workshopID === workshopID)
        return workshop ? workshop.title : []
    }

    // Get the workshop ID given the workshop title
    const getWorkshopId = (workshopTitle) => {
        const workshop = workshops.find(workshop => workshop.title === workshopTitle);
        return workshop ? workshop.workshopID : null;
    }

    // Get the workshop details given the workshop ID
    const getWorkshopDetails = (workshopID) => {
        const workshop = workshops.find(workshop => workshop.workshopID === workshopID)
        return workshop ? workshop.description : "No details available";
    }


    
    // #courses
    const coursesTaken = employeeInfo.courses_taken;//courses taken by the employee
    const positionalCourses = getPositionalCourses(employeeInfo.positionID);//courses required for the employee's position
    const positionalCourses_names = getPositionalCourses(employeeInfo.positionID).map(courseID => getCourseTitle(courseID));

    const completedCourses_for_position = positionalCourses_names.filter(courseID => coursesTaken.includes(courseID));
    const rem_Courses_for_position = positionalCourses_names.filter(courseID => !coursesTaken.includes(courseID));

    const totalCourses_for_curr_position = positionalCourses.length;
    const all_courses_offered = courses.map(course => course.title);

    // #workshops
    const workshopsTaken = employeeInfo.workshops_taken;//workshops taken by the employee
    const positionalWorkshops = getPositionalWorkshops(employeeInfo.positionID);//workshops required for the employee's position
    const positionalWorkshops_names = getPositionalWorkshops(employeeInfo.positionID).map(workshopID => getWorkshopTitle(workshopID));

    const completedWorkshops_for_position = positionalWorkshops_names.filter(workshopID => workshopsTaken.includes(workshopID));
    const rem_Workshops_for_position = positionalWorkshops_names.filter(workshopID => !workshopsTaken.includes(workshopID));

    const totalWorkshops_for_curr_position = positionalWorkshops.length;
    const all_workshops_offered = workshops.map(workshop => workshop.title);
    const rem_all_workshops_offered = all_workshops_offered.filter(course => !workshopsTaken.includes(course));


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
                        <a href="" onClick={(e) => handleMenuItemClick('/UserProfile', e)}>{user.name}</a>
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
                    <div className='coursesWrapper'>
                        {/* <h1>Courses</h1> */}
                        <div className="coursesColumns">
                            <h2>Recommended Workshops 📝</h2>
                            <ul className="recommendedCourses">

                                {rem_Workshops_for_position.length > 0 ? (
                                    rem_Workshops_for_position.map((course, index) => (
                                        <li key={index}>
                                            <h4>Workshop Name: {course}</h4>
                                            <div>Workshop ID: {getWorkshopId(course)}</div>
                                            <div>Workshop details: {getWorkshopDetails(getWorkshopId(course))}</div>

                                        </li>
                                    ))) : (
                                    <li>
                                        <div>You have completed all the workshops for your position.</div>
                                    </li>
                                )}

                            </ul>
                            <h2>Completed Workshops ✅</h2>
                            <ul className="completedCourses">
                                {completedWorkshops_for_position.length > 0 ? (
                                    completedWorkshops_for_position.map((course, index) => (
                                        <li key={index}>
                                            <h4>Workshop Name: {course}</h4>
                                            <div>Workshop ID: {getWorkshopId(course)}</div>
                                            <div>Workshop details: {getWorkshopDetails(getWorkshopId(course))}</div>

                                        </li>
                                    ))) : (
                                    <li>
                                        <div>You have not completed any workshops.</div>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}