import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../apis/Api';
import '../css/login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let isAuthenticated = await authenticateUser(email, password);
        if (isAuthenticated) {
            navigate('/dashboard');
        } else {
            alert('Invalid credentials');
        }
    };

    const goToSignup = () => {
        navigate('/signup');
    };

    return (

        <div className="login-container">
            <h1>Expense Tracker</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleChange}
                        value={email}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleChange}
                        value={password}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
            <p>
                Don't have an account?
                <span onClick={goToSignup} className="signup-link">Click here to signup</span>
            </p>
        </div>
    );
}

export default Login;
