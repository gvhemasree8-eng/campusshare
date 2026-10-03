import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuthContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [error, setError] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const result = signup(name, email, college);
    if (!result.success) {
      setError(result.error || 'Signup failed');
      return;
    }
    navigate('/dashboard');
  };

  return (
    <div className="container page-section auth-layout">
      <div className="card auth-card">
        <h1>Create your account</h1>
        <p className="text-muted">Join your campus community and start sharing.</p>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label className="label">Full name</label>
            <input className="input" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="label">College email</label>
            <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="label">College</label>
            <input className="input" value={college} onChange={e => setCollege(e.target.value)} />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button className="btn btn-primary full-width" type="submit">Create account</button>
        </form>
      </div>
    </div>
  );
}
