import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaLock, FaArrowLeft, FaUser } from 'react-icons/fa';

const ADMIN_USERNAME = 'ravindra';
const ADMIN_PASSWORD = 'admin123';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', 'true');
      navigate('/admin');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-bg-primary">
      <div className="w-full max-w-md glass-panel rounded-2xl p-8 border border-borderColor-base">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-xl bg-accent-glow flex items-center justify-center mx-auto mb-4 text-accent-primary text-2xl">
            <FaLock />
          </div>
          <h1 className="font-heading text-2xl font-bold text-textColor-primary">Admin Login</h1>
          <p className="text-textColor-secondary text-sm mt-2">Sign in to manage portfolio content</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-textColor-secondary mb-1.5">
              <FaUser className="inline mr-1.5 text-xs" />
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-borderColor-base text-textColor-primary focus:outline-none focus:border-accent-primary transition-colors"
              placeholder="Enter username"
              required
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-textColor-secondary mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-borderColor-base text-textColor-primary focus:outline-none focus:border-accent-primary transition-colors"
              placeholder="Enter password"
              required
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-accent-primary text-white font-heading font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <Link
          to="/"
          className="mt-6 flex items-center justify-center gap-2 text-sm text-textColor-secondary hover:text-accent-primary transition-colors"
        >
          <FaArrowLeft className="text-xs" />
          Back to portfolio
        </Link>
      </div>
    </div>
  );
};
