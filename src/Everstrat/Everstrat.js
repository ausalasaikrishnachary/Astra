import React, { useState } from 'react';
import './Everstrat.css';

const Everstrat = () => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailOTP, setEmailOTP] = useState('');
  const [phoneOTP, setPhoneOTP] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2); // Move to email OTP step
  };

  const handleEmailVerify = () => {
    // Simulate success
    setStep(3);
  };

  const handlePhoneVerify = () => {
    alert('Signup complete!');
  };

  const fullName = `${firstName} ${lastName}`.trim();

  return (
    <div className="form-container">
      {step === 1 && (
        <>
          <h2 className="form-title">Tell us about yourself</h2>

          <button className="google-signin-btn">
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google logo"
              className="google-icon"
            />
            Sign up with Google
          </button>

          <div className="separator">
            <hr />
            <span>OR</span>
            <hr />
          </div>

          <form className="form-grid" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <div className="phone-input">
                <select>
                  <option value="+91">🇮🇳 +91</option>
                </select>
                <input type="tel" />
              </div>
            </div>
            <div className="form-group">
              <label>Email ID</label>
              <input type="email" placeholder="Email ID" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" />
            </div>
            <div className="form-group full-width">
              <label>Referral Code</label>
              <input type="text" />
            </div>
            <div className="form-group full-width checkbox-group">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
                By continuing, you're agreeing to our <span>Terms of Service</span> and <span>Privacy Policy</span>.
              </label>
            </div>
            <div className="form-group full-width">
              <button type="submit" className="submit-btn">Save</button>
            </div>
          </form>

          <p className="login-text">
            Already have an access? <a href="#">Login</a>
          </p>
        </>
      )}

      {step === 2 && (
        <>
          <h2>Welcome to Everstrat, {fullName || 'User'}!</h2>
          <p>Just a few more details to complete your signup process</p>
          <label>Enter OTP sent to your Email *</label>
          <input
            type="text"
            value={emailOTP}
            onChange={(e) => setEmailOTP(e.target.value)}
            placeholder="Email OTP"
          />
          <button className="submit-btn" onClick={handleEmailVerify}>Verify</button>
          <p className="resend-text">Resend OTP (14)</p>
        </>
      )}

      {step === 3 && (
        <>
          <h2>Welcome to Everstrat, {fullName || 'User'}!</h2>
          <p>Just a few more details to complete your signup process</p>
          <div className="verified-badge">✔ Email Verified</div>
          <label>Enter OTP sent to your Phone No. *</label>
          <input
            type="text"
            value={phoneOTP}
            onChange={(e) => setPhoneOTP(e.target.value)}
            placeholder="Phone OTP"
          />
          <button className="submit-btn" onClick={handlePhoneVerify} >Verify</button>
          <p className="resend-text">Resend via SMS (20)</p>
        </>
      )}
    </div>
  );
};

export default Everstrat;
