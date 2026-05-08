import { useState } from 'react'
import Icon from './Icon'
import axios from 'axios'

const API_URL = (import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api')) + '/auth'

export default function AuthModal({ isOpen, onClose, onLogin }) {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const endpoint = isLogin ? '/login' : '/register'
      const payload = isLogin ? { email, password } : { name, email, password }
      
      const res = await axios.post(`${API_URL}${endpoint}`, payload)
      
      // Store token if needed (local storage)
      localStorage.setItem('token', res.data.token)
      
      onLogin(res.data.user)
      onClose()
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay auth-overlay">
      <div className="auth-modal">
        <button className="modal-close-btn" onClick={onClose}><Icon name="X" size={20} /></button>
        
        <div className="auth-header">
          <div className="auth-logo">
            <img src="/images/logo.webp" alt="Logo" />
          </div>
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{isLogin ? 'Sign in to continue to Sree HerboLight' : 'Join us for a pure spiritual journey'}</p>
        </div>

        {error && <div style={{ color: '#ff4d4d', fontSize: '0.85rem', marginBottom: '15px', fontWeight: '600' }}>{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="pro-input-wrap">
              <label>Full Name</label>
              <input 
                type="text" 
                placeholder="Your Name" 
                className="pro-input" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>
          )}
          <div className="pro-input-wrap">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              className="pro-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="pro-input-wrap">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="pro-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength="6"
              required 
            />
          </div>

          {isLogin && <button type="button" className="forgot-pass">Forgot Password?</button>}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <p className="auth-switch">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => { setIsLogin(!isLogin); setError(''); }}>
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  )
}
