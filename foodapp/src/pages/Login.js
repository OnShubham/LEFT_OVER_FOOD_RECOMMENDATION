import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext'; // Import UserContext


function LoginRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { setLoggedIn } = useContext(UserContext); // Access setLoggedIn from UserContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      // Login logic
      try {
        const response = await axios.post('http://localhost:3005/login', {
          email,
          password,
        });
        // Handle successful login
        console.log(response.data.message);
        setLoggedIn(true); // Set loggedIn state to true
        navigate('/');
      } catch (error) {
        // Handle login error
        if (error.response.status === 404) {
          alert('User not found');
          console.log('User not found');
        } else if (error.response.status === 401) {
          alert('Email or password is incorrect');
          console.log('Invalid email or password');
        } else {
          alert('Something went wrong');
          console.error(error);
        }
      }
    } else {
      // Register logic
      try {
        const response = await axios.post('http://localhost:3005/register', {
          firstName,
          lastName,
          email,
          password,
        });
        // Handle successful registration
        alert("Successfully Registered")
        console.log(response.data.message);
        navigate('/login');
      } catch (error) {

        // Handle registration error
        if (error.response.status === 409) {
          alert('User already exists');
          console.log('User already exists');
        } else {
          alert('Something went wrong');
          console.error(error);
        }
      }
    }
  };


  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div class="login-register">
      <div class="form-container">
        <h2 class="form-title">
          {isLogin ? "Login" : "Register"}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                className="form-input"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                className="form-input"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </>
          )}
          <input
            type="email"
            className="form-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="form-button">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <div class="toggle-link">
          <p>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <span onClick={toggleForm}>{isLogin ? 'Register' : 'Login'}</span>
          </p>
        </div>
      </div>
    </div>

  );
}

export default LoginRegister;
