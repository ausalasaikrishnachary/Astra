import React, { useState } from 'react';
import './signup.css'; // Assuming you will create a separate CSS file for styling

const SignUp = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission here
    console.log({ phoneNumber, email, password, agreed });
  };

  return (
    <div className="signup-card">
      <h2 className="signup-title">Create a profile</h2>

      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-input-group">
          <label className="signup-label" htmlFor="phone">Phone number</label>
          {/* <div className="signup-phone-input"> */}
            <input
              className="signup-input"
              type="text"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="(555) 555-5555"
              required
            />
          {/* </div> */}
        </div>

        <div className="signup-input-group">
          <label className="signup-label" htmlFor="email">Email</label>
          <input
            className="signup-input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>

        <div className="signup-input-group">
          <label className="signup-label" htmlFor="password">Password</label>
          <input
            className="signup-input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 8 characters"
            required
            minLength="8"
          />
        </div>

        <div className="signup-terms">
          <input
            className="signup-checkbox"
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            required
          />
          <label className="signup-terms-label" htmlFor="agree">
            I agree to Astra’s Non-Disclosure Agreement, Terms of Service, and Privacy Policy, and acknowledge that I’ve read and understand our Form CRS and Regulation Best Interest Disclosure.
          </label>
        </div>

        <button className="signup-button" type="submit" disabled={!agreed}>Continue</button>
      </form>

      <p className="signup-info">Your information is protected. <a className="signup-link" href="/learn-more">Learn more</a></p>
    </div>
  );
};

export default SignUp;