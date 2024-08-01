"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm: React.FC = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [userNameError, setUserNameError] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUserName(value);
        setUserNameError(value.length >= 5 ? "" : "Username must be at least 5 characters");
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (userNameError || userName.length < 5) {
            setMessage("Username must be at least 5 characters");
            return;
        } else {
            const result = await signIn("credentials", {
                redirect: false,
                username: userName,
                password: password,
                callbackUrl: "/calculator",
            });

            if (result?.error) {
                setMessage("Login failed");
            } else {
                router.push("/calculator");
            }
        }
    };

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-10 col-lg-4">
                <div className="card form-card">
                    <div className="card-body">
                        <h5 className="card-title">Login</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username:</label>
                                <input
                                    id="username"
                                    type="text"
                                    className="form-control"
                                    value={userName}
                                    onChange={handleUserNameChange}
                                    required
                                />
                                {userNameError && <small className="text-danger">{userNameError}</small>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password:</label>
                                <div className="input-group">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Login</button>
                            {message && <div role="alert" >{message}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
