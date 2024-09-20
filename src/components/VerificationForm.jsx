

import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './VerificationForm.css'; // For styling

const VerificationForm = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      setValidationErrors((prev) => ({ ...prev, [index]: false }));

      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('Text').trim();
    if (/^\d{6}$/.test(pasteData)) {
      const pasteArray = pasteData.split('');
      setCode(pasteArray);
      pasteArray.forEach((digit, idx) => {
        inputsRef.current[idx].value = digit;
      });
      inputsRef.current[5].focus();
    }
  };

  const validate = () => {
    let isValid = true;
    const errors = {};

    code.forEach((digit, idx) => {
      if (!digit || !/^\d$/.test(digit)) {
        errors[idx] = true;
        isValid = false;
      }
    });

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validate()) {
      return;
    }

    const verificationCode = code.join('');

    try {
      const response = await axios.post('http://localhost:5000/api/verify', { code: verificationCode });
      if (response.status === 200) {
        navigate('/success');
      }
    } catch (err) {
      setError('Verification Error');
    }
  };

  return (
    <div className="verification-container">
      <h2>Enter Verification Code</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputs" onPaste={handlePaste}>
          {code.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              ref={(el) => (inputsRef.current[idx] = el)}
              className={validationErrors[idx] ? 'input-error' : ''}
            />
          ))}
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default VerificationForm;
