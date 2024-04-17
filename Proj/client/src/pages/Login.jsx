import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
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

export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
        s_img: 0,
    });

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

    const sequenceImg = (list) => {
        let array = [...list];
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    useEffect(() => {
        if (location.pathname != '' || location.pathname != '/login')
            navigate('/')
        setRandomizedImages(sequenceImg([...imgSources]));
        console.log(randomizedImages);
    }, []);

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
                setTimeout(() => setRandomizedImages(sequenceImg([...imgSources])), 0)
            } else if (data.no == 1) {
                console.log(data)
                localStorage.setItem('user', JSON.stringify(data.user))
                dispatch({type: 'LOGIN', payload: data.user, no: data.no, path: '/employeeDashboard'})
                setData({})
                navigate('/employeeDashboard', { state: { name: data.user.name, userInfo: data.user } })
            } else if (data.no == 2) {
                console.log(data)
                // login(data.user)
                setData({})
                localStorage.setItem('user', JSON.stringify(data.user))
                dispatch({type: 'LOGIN', payload: data.user, no: data.no, path: '/dashboard'})
                navigate('/dashboard', { state: { userInfo: data.user} })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
                <form onSubmit={loginUser}>
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <p className="mb-2">Select security image</p>
                        <div className="flex flex-wrap -mx-2">
                            {randomizedImages.map(([src, index]) => (
                                <img
                                    key={index}
                                    src={src}
                                    alt={`Security Icon ${index}`}
                                    className={`w-16 h-16 mx-2 my-1 cursor-pointer rounded-md ${
                                        data.s_img === index ? "border-2 border-blue-500" : ""
                                    }`}
                                    onClick={(e) => setData({ ...data, s_img: index })}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none">
                            Login
                        </button>
                    </div>

                    <div className="text-center">
                        <button className="text-blue-500 hover:underline" onClick={() => navigate("/signup")}>Register</button>
                    </div>

                    <div className="text-center mt-2">
                        <a href="/resetPassword" className="text-blue-500 hover:underline">Forgot Password?</a>
                    </div>
                    <div className="text-center mt-2">
                        <a href="/resetSecurityImage" className="text-blue-500 hover:underline">Forgot Security Image?</a>
                    </div>
                </form>
            </div>
        </div>
    );
}
