import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
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

    const sequenceImg = (list) => {
        let array = [...list];
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    useEffect(() => {
        setRandomizedImages(sequenceImg([...imgSources]));
        console.log(randomizedImages);
    }, []);

    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password, s_img } = data;
        try {
            const { data } = await axios.post("/login", {
                email,
                password,
                s_img,
            });
            if (data.error) {
                toast.error(data.error);
                setTimeout(() => setRandomizedImages(sequenceImg([...imgSources])), 0);
            } else {
                console.log(data);
                setData({});
                navigate("/dashboard", { state: { name: data.name } });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div class="login-container">
            <div class="login-box">
                <h1>Login</h1>
                <form onSubmit={loginUser}>
                    <div class="input-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                        />
                    </div>

                    <div class="input-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                        />
                    </div>

                    <div className="security-image-selection">
                        <p>Select security image </p>
                        <div className="security-images">
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

                    <div class="input-group">
                        <button type="submit" class="login-btn">
                            Login
                        </button>
                    </div>

                    <div class="signup-link">
                        <button onClick={() => navigate("/signup")}>Sign Up</button>
                    </div>

                    <div class="forgot-password">
                        <a href="/resetPassword">Forgot Password?</a>
                    </div>
                    <div class="forgot-security-img">
                        <a href="/resetSecurityImage">Forgot Security Image?</a>
                    </div>
                </form>
            </div>
        </div>
    );
}
