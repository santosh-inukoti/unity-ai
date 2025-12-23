import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState('Sales');
  const { login } = useAuth();
  const navigate = useNavigate();

  const teams = [
    { name: 'Sales', icon: '📈' },
    { name: 'Marketing', icon: '📢' },
    { name: 'Customer Success', icon: '❤️' },
    { name: 'Product & Engineering', icon: '💻' },
    { name: 'HR', icon: '👥' },
    { name: 'Finance', icon: '💵' },
    { name: 'Operations', icon: '🔧' },
    { name: 'Executive', icon: '👑' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // SSO only requires email, team is passed during login
      await login(email, 'sso-auth', selectedTeam);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <div className="logo-icon">E</div>
          <h1>Unity AI</h1>
          <p>Enverus Internal AI Platform</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Enverus Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.name@enverus.com"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Select Your Team</label>
            <div className="team-selector-grid">
              {teams.map((team) => (
                <button
                  key={team.name}
                  type="button"
                  className={`team-selector-btn ${selectedTeam === team.name ? 'active' : ''}`}
                  onClick={() => setSelectedTeam(team.name)}
                  disabled={loading}
                >
                  <span className="team-icon">{team.icon}</span>
                  <span className="team-label">{team.name}</span>
                </button>
              ))}
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in with SSO'}
          </button>
        </form>

        <div className="login-info">
          <p>Use your Enverus SSO credentials to sign in</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
