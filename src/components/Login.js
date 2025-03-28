import React, { useState } from "react";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://reqres.in/api/login", { 
        email, 
        password 
      });
      onLogin(response.data.token);
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginCard}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Please enter your credentials</p>
        
        {error && <div style={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="eve.holt@reqres.in"
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="cityslicka"
            />
          </div>
          
          <button type="submit" style={styles.loginButton}>
            Sign In
          </button>
        </form>

        <div style={styles.demoCredentials}>
          <p style={styles.demoText}>Demo credentials:</p>
          <p style={styles.demoText}>Email: eve.holt@reqres.in</p>
          <p style={styles.demoText}>Password: cityslicka</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  loginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    padding: '20px',
    fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif"
  },
  loginCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: 'clamp(20px, 5vw, 40px)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    margin: '0 20px'
  },
  title: {
    color: '#2d3748',
    fontSize: 'clamp(24px, 5vw, 28px)',
    marginBottom: '8px',
    fontWeight: '600'
  },
  subtitle: {
    color: '#718096',
    fontSize: 'clamp(12px, 3vw, 14px)',
    marginBottom: 'clamp(20px, 5vw, 30px)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(15px, 3vw, 20px)'
  },
  inputGroup: {
    textAlign: 'left'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#4a5568',
    fontSize: 'clamp(13px, 3vw, 14px)',
    fontWeight: '500'
  },
  input: {
    width: '100%',
    padding: 'clamp(10px, 3vw, 12px) clamp(12px, 3vw, 16px)',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    fontSize: 'clamp(14px, 3vw, 16px)',
    transition: 'border 0.3s',
    boxSizing: 'border-box',
    backgroundColor: '#f8fafc',
    outline: 'none'
  },
  loginButton: {
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: 'clamp(12px, 3vw, 14px)',
    fontSize: 'clamp(14px, 3vw, 16px)',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: 'clamp(5px, 2vw, 10px)'
  },
  errorMessage: {
    backgroundColor: '#fff5f5',
    color: '#e53e3e',
    padding: 'clamp(10px, 3vw, 12px)',
    borderRadius: '8px',
    marginBottom: 'clamp(15px, 3vw, 20px)',
    fontSize: 'clamp(12px, 3vw, 14px)'
  },
  demoCredentials: {
    marginTop: 'clamp(20px, 5vw, 30px)',
    padding: 'clamp(12px, 3vw, 15px)',
    backgroundColor: '#ebf8ff',
    borderRadius: '8px',
    fontSize: 'clamp(12px, 2.5vw, 13px)'
  },
  demoText: {
    color: '#2b6cb0',
    margin: 'clamp(3px, 1vw, 5px) 0'
  }
};

export default Login;