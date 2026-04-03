import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { AlertCircle, Lock } from 'lucide-react';

export function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (login(username, password)) {
      navigate('/admin');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-brand-600 p-3 rounded-full">
              <Lock className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
          <p className="text-gray-600 mt-2">Diksha Consulting and Projects</p>
        </div>

        {!showResetForm ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-start gap-2">
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                autoComplete="username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                autoComplete="current-password"
              />
            </div>

            <Button type="submit" className="w-full">
              Sign In
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowResetForm(true)}
                className="text-sm text-brand-600 hover:text-brand-800"
              >
                Forgot password?
              </button>
            </div>
          </form>
        ) : (
          <PasswordResetForm onBack={() => setShowResetForm(false)} />
        )}

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Default credentials: admin / admin123
            <br />
            Please change your password after first login
          </p>
        </div>
      </div>
    </div>
  );
}

function PasswordResetForm({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [username, setUsername] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { generateResetToken, resetPassword } = useAuth();

  const handleRequestReset = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const token = generateResetToken(username);
    if (token) {
      setResetToken(token);
      setStep('reset');
      setMessage('Reset token generated. Please use the token below to reset your password.');
    } else {
      setError('Username not found');
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (resetPassword(resetToken, newPassword)) {
      setMessage('Password reset successful! You can now login with your new password.');
      setTimeout(() => {
        onBack();
      }, 2000);
    } else {
      setError('Invalid or expired reset token');
    }
  };

  return (
    <div className="space-y-6">
      {step === 'request' ? (
        <form onSubmit={handleRequestReset} className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Reset Password</h3>
            <p className="text-sm text-gray-600 mb-4">
              Enter your username to generate a reset token
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="reset-username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              id="reset-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onBack} className="flex-1">
              Back to Login
            </Button>
            <Button type="submit" className="flex-1">
              Generate Token
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Set New Password</h3>
          </div>

          {message && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded text-sm">
              {message}
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reset Token
            </label>
            <div className="bg-gray-50 p-3 rounded border border-gray-300">
              <code className="text-xs break-all">{resetToken}</code>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Save this token - it expires in 1 hour
            </p>
          </div>

          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              minLength={6}
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              minLength={6}
            />
          </div>

          <Button type="submit" className="w-full">
            Reset Password
          </Button>
        </form>
      )}
    </div>
  );
}