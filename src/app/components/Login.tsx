import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { GraduationCap, AlertCircle, ChevronDown } from 'lucide-react';

const DEMO_USERS = [
  { email: 'coordinator@utm.my', password: 'utm123', label: 'Coordinator' },
  { email: 'lecturer@utm.my', password: 'utm123', label: 'Lecturer' },
  // Note: the separate "Lecturer (On Leave)" demo login was removed per project
  // constraints. On-leave is represented as a staff status instead of a role.
];

export function Login() {
  const [selectedUser, setSelectedUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleUserSelect = (userEmail: string) => {
    setSelectedUser(userEmail);
    const selectedUserData = DEMO_USERS.find(u => u.email === userEmail);
    if (selectedUserData) {
      setEmail(selectedUserData.email);
      setPassword(selectedUserData.password);
    } else {
      setEmail('');
      setPassword('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please select a user');
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError('Invalid credentials. Please check your UTM email and password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#900021] to-[#5C001F] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
            <GraduationCap className="w-8 h-8 text-[#900021]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            SE Academic Management
          </h1>
          <p className="text-white/80">
            Universiti Teknologi Malaysia
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Authentication Gateway
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="user">Select User</Label>
              <div className="relative mt-1">
                <select
                  id="user"
                  value={selectedUser}
                  onChange={(e) => handleUserSelect(e.target.value)}
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    height: '40px',
                    padding: '0 12px',
                    fontSize: '14px',
                    color: selectedUser ? '#111827' : '#6B7280',
                    border: '1px solid #E5E7EB',
                    borderRadius: '6px',
                    appearance: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    backgroundColor: 'white',
                  }}
                  className="focus:ring-2 focus:ring-[#900021] focus:border-transparent"
                >
                  <option value="">Select a user...</option>
                  {DEMO_USERS.map(user => (
                    <option key={user.email} value={user.email}>
                      {user.label}
                    </option>
                  ))}
                </select>
                <ChevronDown style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '16px',
                  height: '16px',
                  color: '#6B7280',
                  pointerEvents: 'none',
                }} />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (auto-filled)"
                className="mt-1 bg-gray-50"
                disabled={isLoading}
                readOnly
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-[#900021] hover:bg-[#5C001F]"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </Button>

            <div className="text-center">
              <button
                type="button"
                className="text-sm text-[#900021] hover:underline"
                onClick={() => alert('Password reset functionality would be implemented here')}
              >
                Forgot Password?
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Select a user from the dropdown above. Password is auto-filled.
            </p>
          </div>
        </div>

        <p className="text-center text-white/80 text-sm mt-6">
          © 2026 UTM. All rights reserved.
        </p>
      </div>
    </div>
  );
}
