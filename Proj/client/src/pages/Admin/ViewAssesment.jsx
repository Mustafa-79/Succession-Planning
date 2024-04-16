import React, { useEffect, useState } from 'react';
import { UserContext } from '../../../context/userContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFileArrowDown, faFileArrowUp, faStreetView, faGear, faBuilding, faUser, faFileLines, faTriangleExclamation, faEye, faTrash, faSearch, faChartLine } from '@fortawesome/free-solid-svg-icons';
import './ViewAssesment.css';
import './fonts.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'
import { FaSearch } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import { useUserContext } from '../../hooks/useUserContext';
import { useLogout } from '../../hooks/useLogout';

export default function ViewAssessment() {
	const location = useLocation();
	const { logout } = useLogout()

	const user = JSON.parse(localStorage.getItem('user'));
	const { authenticatedUser, no, path, dispatch } = useUserContext()
	const navigate = useNavigate();
	const [questions, setQuestions] = useState([]);
	const [data, setData] = useState({
		empID: '',
		positionTitle: '',
		questions: '',
		answers: '',
	})

	const menuItems = [
        { name: "Employee Development", icon: faHouse, margin: 0, path: "/dashboard" },
        { name: "Assess Feedback", icon: faFileArrowDown, margin: 12, path: '/admin_feedback' },
        { name: "Create Assessment", icon: faFileArrowUp, margin: 10, path: "/admin_feedback/create_assessment" },
        { name: "Employee Data", icon: faStreetView, margin: 3, path: "/employee_data" },
        { name: "Model Tuning", icon: faChartLine, margin: 5, path: "/model_tuning" },
        { name: "Settings", icon: faGear, margin: 5, path: "/admin_settings" },
	];

	const isActive = (path) => {
		return '/admin_feedback' === path; // Check if the current location matches the path
	};


	const handleMenuItemClick = (path, e) => {
		e.preventDefault()
		navigate(path, { state: { userInfo: user } });
	};

	const assignAssessment = async (e) => {
		e.preventDefault();
		console.log("Submitting assessment with data:", data);
		const { empID,
			positionTitle,
			questions,
			answers } = data;
		try {
			const response = await axios.post("/assignAssessment", {
				empID,
				positionTitle,
				questions,
				answers
			});
			//   console.log("assignment response")
			//   console.log(response.message);
			if (response.status !== 200) {
				toast.error(response.error);
				// setData({});
			} else {
				// console.log("assignment submitted successfully")
				console.log(response.data.message);
				console.log(response.data.feedback)
				// setData({});
				setData({
					empID: '',
					positionTitle: '',
					questions: '',
					answers: ''
				});
				setQuestions('');
				toast.success("Assignment assigned successfully");
			}
		} catch (error) {
			console.log(error.response.data.error)
			toast.error(error.response.data.error);
			// setData({});    
		}
	};

	useEffect(() => {
		dispatch({ type: 'LOGIN', payload: user, no: 2, path: location.pathname })
		localStorage.setItem('path', JSON.stringify(location.pathname))
	}, [])

	return (
		<div className='overlay'>
			<div className='wrapperForm'>
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
				<div className='contentForm'>
					<div className='header'>
						<a href="" onClick={(e) => handleMenuItemClick('/aboutAdmin', e)}>About</a>
						<span>|</span>
						<FontAwesomeIcon icon={faUser} size='xl' color='rgb(196,196,202)' />
						<a href="" onClick={(e) => handleMenuItemClick('/AdminProfile', e)}>{user.name}</a>
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
					<div className="main-body">
                            Mauj masti
					</div>
				</div>
			</div>
		</div>
	);
}