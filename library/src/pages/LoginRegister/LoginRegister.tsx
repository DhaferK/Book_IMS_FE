import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isPasswordLengthValid, containsNumber, containsSymbol, passwordsMatch } from '../../utils/heplers';
import { loginUser, registerUser, getUserProfile } from '../../services/api';
import './LoginRegister.css';

interface LoginRegisterProps {
  setToken: (token: string) => void;
}

const LoginRegister: React.FC<LoginRegisterProps> = ({ setToken }) => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState({
    lengthValid: false,
    numberValid: false,
    symbolValid: false,
    matchValid: false,
  });
  const navigate = useNavigate();

  const validatePassword = (pwd: string, confirmPwd: string) => {
    const lengthValid = isPasswordLengthValid(pwd);
    const numberValid = containsNumber(pwd);
    const symbolValid = containsSymbol(pwd);
    const matchValid = passwordsMatch(pwd, confirmPwd);

    setPasswordValid({
      lengthValid,
      numberValid,
      symbolValid,
      matchValid,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setPassword(pwd);
    validatePassword(pwd, confirmPassword);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPwd = e.target.value;
    setConfirmPassword(confirmPwd);
    validatePassword(password, confirmPwd);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginUser(loginEmail, loginPassword);
      setToken(data.access_token);
      localStorage.setItem('token', data.access_token);
      navigate('/gallery'); 
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed. Please try again.');
    }
  };
  

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordValid.lengthValid || !passwordValid.numberValid || !passwordValid.symbolValid || !passwordValid.matchValid) {
      alert('Please enter a valid password that meets all the requirements.');
      return;
    }
  
    try {
      await registerUser({ fname, lname, email, password });
      alert('Registration successful. Please log in.');
    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="login-register-container">
      <div className="form-container">
        <div className="login-section">
          <h1>Log In</h1>
          <form onSubmit={handleLoginSubmit}>
            <label htmlFor="login-email">Email</label>
            <input
              type="email"
              id="login-email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="example@pwc.com"
              required
            />
            <label htmlFor="login-password">Password</label>
            <input
              type="password"
              id="login-password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="Placeholder/Input text"
              required
            />
            <button type="submit">Log In</button>
          </form>
        </div>
        <hr className="section-divider" />
        <div className="register-section">
          <h1>Sign Up</h1>
          <form onSubmit={handleRegisterSubmit}>
            <label htmlFor="register-fname">First Name</label>
            <input
              type="text"
              id="register-fname"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              placeholder="First Name"
              required
            />
            <label htmlFor="register-lname">Last Name</label>
            <input
              type="text"
              id="register-lname"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              placeholder="Last Name"
              required
            />
            <label htmlFor="register-email">Email</label>
            <input
              type="email"
              id="register-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@pwc.com"
              required
            />
            <label htmlFor="register-password">Password</label>
            <input
              type="password"
              id="register-password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Placeholder/Input text"
              required
            />
            <label htmlFor="register-confirm-password">Confirm Password</label>
            <input
              type="password"
              id="register-confirm-password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Placeholder/Input text"
              required
            />
            <div className="password-instructions">
              <p style={{ color: passwordValid.lengthValid ? 'green' : 'darkred' }}>
                8 characters or more
              </p>
              <p style={{ color: passwordValid.numberValid ? 'green' : 'darkred' }}>
                At least one number
              </p>
              <p style={{ color: passwordValid.symbolValid ? 'green' : 'darkred' }}>
                At least one symbol
              </p>
              <p style={{ color: passwordValid.matchValid ? 'green' : 'darkred' }}>
                Passwords match
              </p>
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
