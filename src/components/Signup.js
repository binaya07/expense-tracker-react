import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/signup.css'; 
import { registerUser } from '../apis/Api';

const Signup = () => {
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
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!email || !password) { // Updated validation to include email
            alert('All fields are required!');
            return;
        }

        let userRegistered = await registerUser(email, password); 

        if (userRegistered) {
            alert('Successfully registered! You can now login.');
            navigate('/login');
        } else {
            alert('Registration failed. Please try again.');
        }
    }

    return (
        <div className="signup-container">
            <h1>Expense Tracker</h1>
            <form onSubmit={handleSubmit} className="signup-form">
                <h2>Signup</h2>
                <div className="input-group">  {/* New input group for email */}
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
                <button type="submit" className="signup-button">Signup</button>
            </form>
        </div>
    );
}

export default Signup;
