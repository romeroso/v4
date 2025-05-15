import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({});
    
    // Simple validation
    let hasErrors = false;
    const newErrors: {email?: string; password?: string} = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
      hasErrors = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      hasErrors = true;
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
      hasErrors = true;
    }
    
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }
    
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      setErrors({
        email: 'Invalid email or password'
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0.8, rotate: 0 }}
              animate={{ scale: 1, rotate: [0, -10, 10, -5, 5, 0] }}
              transition={{ 
                duration: 1.5, 
                ease: "easeInOut",
                times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                delay: 0.2
              }}
              className="inline-block text-accent-heart"
            >
              <Heart size={40} fill="#FF2D55" />
            </motion.div>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
            Sign in to HealthSync
          </h2>
          <p className="mt-2 text-neutral-400">
            Track your health journey in real-time
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              label="Email address"
              placeholder="your@email.com"
              icon={<Mail size={18} />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              fullWidth
            />

            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              label="Password"
              placeholder="••••••••"
              icon={<Lock size={18} />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              fullWidth
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-neutral-800 bg-neutral-950 text-primary focus:ring-primary"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-400">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-primary-light">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                fullWidth
              >
                Sign in
              </Button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-800" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background-light px-2 text-neutral-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="outline" fullWidth>
                Google
              </Button>
              <Button variant="outline" fullWidth>
                Apple
              </Button>
            </div>
          </div>
        </motion.div>
        
        <p className="mt-4 text-center text-sm text-neutral-500">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-primary hover:text-primary-light">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;