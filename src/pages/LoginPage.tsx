import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [email, setEmail] = useState('alex@college.edu');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const result = login(email, password);
    if (!result.success) {
      setError(result.error || 'Login failed');
      return;
    }
    navigate('/dashboard');
  };

  return (
    <div className="container page-section auth-layout">
      <div className="card auth-card">
        <h1>Welcome back</h1>
        <p className="text-muted">Sign in to manage items, requests, and messages.</p>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="label">College email</label>
            <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="label">Password</label>
            <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button className="btn btn-primary full-width" type="submit">Login</button>
        </form>
        <p className="text-muted mt-2">Need an account? <a href="/signup">Create one</a></p>
      </div>
    </div>
  );
}
