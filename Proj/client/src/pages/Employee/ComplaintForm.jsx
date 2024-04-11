import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../../../context/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faFileArrowDown,
    faFileArrowUp,
    faStreetView,
    faGear,
    faBuilding,
    faUser,
    faFileLines,
    faTriangleExclamation,
    faEye,
    faTrash,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "./ComplaintForm.css";
import "./fonts.css";

const StarRatingInput = ({ value, onRatingChange }) => {
    const stars = Array.from({ length: 5 }, (_, index) => index + 1);

    return (
        <div>
            {stars.map((star) => (
                <span
                    key={star}
                    style={{
                        cursor: "pointer",
                        fontSize: "24px",
                        color: star <= value ? "gold" : "gray",
                        marginRight: "5px",
                    }}
                    onClick={() => onRatingChange(star)}
                >
                    &#9733;
                </span>
            ))}
        </div>
    );
};

export default function ComplaintForm() {
    const location = useLocation();
    const user = location.state.name;
    const navigate = useNavigate();
    const allUserInfo = location.state.userInfo;


    const menuItems = [
        {
            name: "Career Path",
            icon: faHouse,
            margin: 0,
            path: "/employeeDashboard",
        },
        {
            name: "Personal Development Plans",
            icon: faFileArrowDown,
            margin: 4,
            path: "/developmentPlans",
        },
        {
            name: "Feedback Tools",
            icon: faFileArrowUp,
            margin: 7,
            path: "/feedback",
        },
        { name: "Settings", icon: faGear, margin: 0, path: "/employeeSettings" },
    ];

    const [activeMenuItem, setActiveMenuItem] = useState("");

    const [data, setData] = useState({
        courseID: '',
        feedback: '',
        empID: '',
        rating: 0
    });

    const isActive = (path) => {
        return location.pathname === path; // Check if the current location matches the path
    };

    const handleMenuItemClick = (path, e) => {
        e.preventDefault();
        navigate(path, { state: { name: user,userInfo:allUserInfo } });
    };

    const sumbitFeedback = async (e) => {
        e.preventDefault();
        const { courseID, feedback, empID, rating } = data;
        try {
            const response = await axios.post("/submitFeedback", {
                courseID,
                feedback,
                empID,
                rating,
            });
            console.log("Feedback response")
            console.log(response);
            if (response.status !== 200) {
                toast.error(response.error);
                // setData({});
            } else {
                console.log("Feedback submitted successfully")
                console.log(response);
                setData({});
                toast.success("Feedback submitted successfully");
            }
        } catch (error) {
            console.log(error.response.data.error)
            toast.error(error.response.data.error);
            // setData({});    
        }
    };

    return (
        <div className='overlay'>
            <div className='wrapperForm'>
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
                <div className='contentForm'>
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
                    <div className="main-body">
                        Mauj masti baad mei
                    </div>
                </div>
            </div>
        </div>
    );
}