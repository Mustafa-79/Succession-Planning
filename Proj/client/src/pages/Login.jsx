import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Login.css";
import img1 from "./img/s_img1.png";
import img2 from "./img/s_img2.png";
import img3 from "./img/s_img3.png";
import img4 from "./img/s_img4.png";
import img5 from "./img/s_img5.png";
import img6 from "./img/s_img6.png";
import img7 from "./img/s_img7.png";
import img8 from "./img/s_img8.png";
import img9 from "./img/s_img9.png";
import img10 from "./img/s_img10.png";
import { useUserContext } from "../hooks/useUserContext";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

//the login page
export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
        s_img: 0,
    });
    const [showPassword, setShowPassword] = useState(false)
    
    // Randomize the security images
    const imgSources = [
        [img1, 1],
        [img2, 2],
        [img3, 3],
        [img4, 4],
        [img5, 5],
        [img6, 6],
        [img7, 7],
        [img8, 8],
        [img9, 9],
        [img10, 10],
    ];
    const [randomizedImages, setRandomizedImages] = useState(imgSources);
    const { authenticatedUser, no, dispatch } = useUserContext();

    // a function to shuffle the images for the security image selection
    const sequenceImg = (list) => {
        let array = [...list];
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    // for the initial rendering of the page
    useEffect(() => {
        // Add the fade-in class to the login container after a short delay
        const timer = setTimeout(() => {
            const loginContainer = document.querySelector(".login-container");
            if (loginContainer) {
                loginContainer.classList.add("fade-in");
            }
        }, 500); // Adjust the delay as needed

        return () => clearTimeout(timer); // Cleanup function
    }, []);

    useEffect(() => {
        document.title = 'Succession Planning Portal'
        if (location.pathname != '' || location.pathname != '/login')
            navigate('/')
        setRandomizedImages(sequenceImg([...imgSources]));
        console.log(randomizedImages);
    }, []);

    // a function to handle the login of the user
    const loginUser = async (e) => {
        e.preventDefault()
        const { email, password, s_img } = data
        try {
            const { data } = await axios.post('/login', {
                email,
                password,
                s_img
            })
            if (data.error) {
                toast.error(data.error)
                setTimeout(() => setRandomizedImages(sequenceImg([...imgSources])), 0)// Reset the images after an error
            } else if (data.no == 1) {
                console.log(data)
                localStorage.setItem('user', JSON.stringify(data.user))
                dispatch({type: 'LOGIN', payload: data.user, no: data.no, path: '/employeeDashboard'})// Dispatch the user data to the context
                setData({})
                setShowPassword(false)
                navigate('/employeeDashboard', { state: { name: data.user.name, userInfo: data.user } })
            } else if (data.no == 2) {
                console.log(data)
                setData({})
                setShowPassword(false)
                localStorage.setItem('user', JSON.stringify(data.user))
                dispatch({type: 'LOGIN', payload: data.user, no: data.no, path: '/dashboard'})
                navigate('/dashboard', { state: { userInfo: data.user} })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 style={{marginBottom:15}}>Login</h1>
                <form onSubmit={loginUser}>
                    <div className="input-group-login">
                        <input
                            type="email"
                            placeholder="Email"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                        />
                    </div>

                    <div className="input-group-login">{/*this is the input group for the password*/}
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                        />
                        <span>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="show-password-icon-login" onClick={() => {setShowPassword(!showPassword)}}/>
                        </span>
                    </div>

                    <div className="security-image-selection" style={{marginBottom:10}}>{/*this is the security image selection div*/}
                        <p>Select security image </p>
                        <div className="security-images" >
                            <img
                                src={randomizedImages[0][0]}
                                alt="Security Icon 1"
                                className={`security-image ${data.s_img === randomizedImages[0][1] ? "selected" : ""
                                    }`}
                                onClick={(e) =>
                                    setData({ ...data, s_img: randomizedImages[0][1] })
                                }
                            />
                            <img
                                src={randomizedImages[1][0]}
                                alt="Security Icon 2"
                                className={`security-image ${data.s_img === randomizedImages[1][1] ? "selected" : ""
                                    }`}
                                onClick={(e) =>
                                    setData({ ...data, s_img: randomizedImages[1][1] })
                                }
                            />
                            <img
                                src={randomizedImages[2][0]}
                                alt="Security Icon 3"
                                className={`security-image ${data.s_img === randomizedImages[2][1] ? "selected" : ""
                                    }`}
                                onClick={(e) =>
                                    setData({ ...data, s_img: randomizedImages[2][1] })
                                }
                            />
                            <img
                                src={randomizedImages[3][0]}
                                alt="Security Icon 4"
                                className={`security-image ${data.s_img === randomizedImages[3][1] ? "selected" : ""
                                    }`}
                                onClick={(e) =>
                                    setData({ ...data, s_img: randomizedImages[3][1] })
                                }
                            />
                            <img
                                src={randomizedImages[4][0]}
                                alt="Security Icon 5"
                                className={`security-image ${data.s_img === randomizedImages[4][1] ? "selected" : ""
                                    }`}
                                onClick={(e) =>
                                    setData({ ...data, s_img: randomizedImages[4][1] })
                                }
                            />
                        </div>
                        <div className="security-images">
                            <img
                                src={randomizedImages[5][0]}
                                alt="Security Icon 1"
                                className={`security-image ${data.s_img === randomizedImages[5][1] ? "selected" : ""
                                    }`}
                                onClick={(e) =>
                                    setData({ ...data, s_img: randomizedImages[5][1] })
                                }
                            />
                            <img
                                src={randomizedImages[6][0]}
                                alt="Security Icon 2"
                                className={`security-image ${data.s_img === randomizedImages[6][1] ? "selected" : ""
                                    }`}
                                onClick={(e) =>
                                    setData({ ...data, s_img: randomizedImages[6][1] })
                                }
                            />
                            <img
                                src={randomizedImages[7][0]}
                                alt="Security Icon 3"
                                className={`security-image ${data.s_img === randomizedImages[7][1] ? "selected" : ""
                                    }`}
                                onClick={(e) =>
                                    setData({ ...data, s_img: randomizedImages[7][1] })
                                }
                            />
                            <img
                                src={randomizedImages[8][0]}
                                alt="Security Icon 4"
                                className={`security-image ${data.s_img === randomizedImages[8][1] ? "selected" : ""
                                    }`}
                                onClick={(e) =>
                                    setData({ ...data, s_img: randomizedImages[8][1] })
                                }
                            />
                            <img
                                src={randomizedImages[9][0]}
                                alt="Security Icon 5"
                                className={`security-image ${data.s_img === randomizedImages[9][1] ? "selected" : ""
                                    }`}
                                onClick={(e) =>
                                    setData({ ...data, s_img: randomizedImages[9][1] })
                                }
                            />
                        </div>
                    </div>

                    <div className="input-group" >
                        <button type="submit" className="login-btn" >
                            Login
                        </button>
                    </div>

                    <div class="signup-link">
                        <button onClick={() => navigate("/signup")}>Register</button>
                    </div>

                    <div className="forgot-password">
                        <a href="/resetPassword">Forgot Password?</a>
                    </div>
                    <div className="forgot-security-img">
                        <a href="/resetSecurityImage">Forgot Security Image?</a>
                    </div>
                </form>
            </div>
        </div>
    );
}