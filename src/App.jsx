import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import './styles.css'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Category from './pages/Category'
import SuccessStory from './pages/SuccessStory'
import Icon from './components/Icon'
import { navLinks, footerLinks } from './data'
import axios from 'axios'

import { CartProvider, useCart } from './context/CartContext'

import SideDrawer from './components/SideDrawer'
import CheckoutModal from './components/CheckoutModal'
import AuthModal from './components/AuthModal'
import Newsletter from './components/Newsletter'

/* ── Global Header ─────────────────────────── */


// import { products } from './data' // Removed static import

function Header({ onOpenDrawer, onSearch, user, onOpenAuth, onLogout, products = [] }) {
  const [scrolled, setScrolled] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [hoveredMega, setHoveredMega] = useState(null)
  
  const location = useLocation()
  const { cartCount, cartTotal, wishlistCount } = useCart()
  
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const handleSearchChange = (val) => {
    setSearchValue(val)
    if (val.trim().length > 1) {
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(val.toLowerCase()) || 
        p.category.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 5)
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
    onSearch(val)
  }

  const [placeholder, setPlaceholder] = useState('Search for Agarbatti')
  const words = ['Agarbatti', 'Camphor', 'Rose Water', 'Vilaku', 'Sambrani']
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentWord = words[wordIdx]
      if (!isDeleting) {
        setPlaceholder('Search for ' + currentWord.substring(0, charIdx + 1))
        setCharIdx(prev => prev + 1)
        if (charIdx + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        setPlaceholder('Search for ' + currentWord.substring(0, charIdx - 1))
        setCharIdx(prev => prev - 1)
        if (charIdx === 0) {
          setIsDeleting(false)
          setWordIdx(prev => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? 50 : 150)
    return () => clearTimeout(timer)
  }, [charIdx, isDeleting, wordIdx])

  return (
    <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`}>
      {/* ... top bar ... */}
      <div className="top-promo-bar-pro">
        <div className="promo-inner-pro">
          <div className="promo-socials" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <a href="#" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" aria-label="Youtube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.42 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.42-5.58z"></path>
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon>
              </svg>
            </a>
            <a href="#" aria-label="X">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
              </svg>
            </a>
          </div>
          <div className="promo-text-pro">
            <Icon name="Truck" size={18} color="#fff" />
            <span style={{ color: '#fff' }}>Free Shipping On All Orders Above ₹399</span>
          </div>
          <div className="promo-empty" />
        </div>
      </div>

      {/* 2. Main Header */}
      <div className="header-main-row-pro">
        <div className="header-inner-pro">
          <Link to="/" className="site-logo-pro">
            <img src="/images/logo.webp" alt="Sree HerboLight" className="header-logo-img-pro" />
          </Link>

          <div className="header-search-pro">
            <div className="search-bar-pro">
              <input 
                type="text" 
                value={searchValue}
                placeholder={placeholder} 
                onChange={(e) => handleSearchChange(e.target.value)}
                onBlur={() => setTimeout(() => setSuggestions([]), 200)}
              />
              <button className="search-btn-pro">
                <Icon name="Search" size={18} color="#fff" strokeWidth={2.5} />
                <span>Search</span>
              </button>
            </div>
            
            {suggestions.length > 0 && (
              <div className="search-suggestions-pro">
                {suggestions.map(p => (
                  <Link key={p.id} to={`/product/${p.id}`} className="suggestion-item-pro" onClick={() => setSuggestions([])}>
                    <div className="suggestion-icon"><Icon name={p.icon || 'Sparkles'} size={16} color="#2d5a27" strokeWidth={1.5} /></div>
                    <div className="suggestion-info">
                      <span className="suggestion-name">{p.name}</span>
                      <span className="suggestion-cat">{p.category}</span>
                    </div>
                    <span className="suggestion-price">₹{p.price}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="header-actions-pro">
            <button className="hdr-btn-pro" onClick={user ? undefined : onOpenAuth} style={{ borderColor: 'var(--primary)', cursor: user ? 'default' : 'pointer' }}>
              <Icon name="User" size={20} color="var(--primary)" strokeWidth={1.5} />
              <span style={{ color: 'var(--primary)' }}>{user ? user.name.split(' ')[0] : 'Account'}</span>
            </button>
            {user && (
              <button className="hdr-btn-pro" onClick={onLogout} style={{ borderColor: '#ff4d4d', color: '#ff4d4d', background: 'rgba(255, 77, 77, 0.05)' }}>
                <Icon name="LogOut" size={18} color="#ff4d4d" strokeWidth={1.5} />
                <span>Logout</span>
              </button>
            )}
            {user && (
              <button className="hdr-btn-pro" onClick={() => onOpenDrawer('orders')} style={{ borderColor: 'var(--accent)', background: 'rgba(255, 154, 0, 0.05)' }}>
                <Icon name="Package" size={20} color="var(--accent)" strokeWidth={1.5} />
                <span style={{ color: 'var(--accent)' }}>My Orders</span>
              </button>
            )}
            <button className="hdr-btn-pro cart-btn-pro" onClick={() => onOpenDrawer('cart')} style={{ background: 'var(--primary)', color: '#fff' }}>
              <Icon name="ShoppingCart" size={20} color="#fff" strokeWidth={1.5} />
              <span>Rs. {cartTotal.toLocaleString()}.00 ({cartCount})</span>
            </button>
            <button className="hdr-btn-wish-icon-only" onClick={() => onOpenDrawer('wishlist')}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Icon name="Heart" size={24} color="#2d5a27" strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span style={{ 
                    position: 'absolute', 
                    top: '-6px', 
                    right: '-8px', 
                    background: '#2d5a27', 
                    color: '#fff', 
                    fontSize: '10px', 
                    fontWeight: '800', 
                    padding: '2px 5px', 
                    borderRadius: '10px',
                    minWidth: '14px',
                    textAlign: 'center'
                  }}>
                    {wishlistCount}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Navigation Bar */}
      <nav className="header-nav-pro">
        <div className="nav-inner-pro">
          {navLinks.map(l => (
            <div 
              key={l.label} 
              className="nav-item-pro"
              onMouseEnter={() => setHoveredMega(l.mega ? l.label : null)}
              onMouseLeave={() => setHoveredMega(null)}
            >
              <Link to={l.href} className="nav-link-pro">
                {l.label}
              </Link>

              {l.mega && hoveredMega === l.label && (
                <div className="mega-menu-pro">
                  <div className="mega-inner-pro">
                    <div className="mega-columns-pro">
                      {l.mega.columns.map(col => (
                        <div key={col.title} className="mega-col-pro">
                          <h4 className="mega-title-pro">{col.title}</h4>
                          <ul className="mega-list-pro">
                            {col.links.map(link => (
                              <li key={link.label}>
                                <Link to={link.href} onClick={() => setHoveredMega(null)}>
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mega-promo-pro">
                      <img src={l.mega.image} alt={l.label} />
                      <div className="mega-promo-overlay-pro">
                        <span>Explore {l.label}</span>
                        <Icon name="ArrowRight" size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </header>
  )
}




/* ── Global Footer ─────────────────────────── */
function Footer({ onOpenDrawer }) {
  const handleLinkClick = (e, link) => {
    if (link === 'My Orders') {
      e.preventDefault()
      onOpenDrawer('orders')
    }
  }

  return (
    <footer className="site-footer">
      <div className="footer-body">
        <div className="footer-inner">
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo">
              <img src="/images/logo.webp" alt="Sree HerboLight" className="footer-logo-img" />
            </Link>
            <p className="footer-brand-desc">
              Sacred aromatics crafted from nature's finest — for your home, pooja room, and the people you love.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-icon-btn" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="social-icon-btn" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="social-icon-btn" aria-label="Youtube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.42 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.42-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg>
              </a>
              <a href="#" className="social-icon-btn" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className="footer-links-col">
              <h4 className="footer-col-title">{group}</h4>
              <ul className="footer-link-list">
                {links.map(link => <li key={link}><a href="#" className="footer-link" onClick={(e) => handleLinkClick(e, link)}>{link}</a></li>)}
              </ul>
            </div>
          ))}

          <div className="footer-contact-col">
            <h4 className="footer-col-title">Contact</h4>
            <div className="footer-address">
              <p><Icon name="Phone" size={16} color="#ff9a00" /> +91 98765 43210</p>
              <p><Icon name="Mail" size={16} color="#ff9a00" /> hello@sreeherbolight.in</p>
              <p><Icon name="MapPin" size={16} color="#ff9a00" /> No. 12, Temple Street, Chennai – 600 001</p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 SreeHerboLight · All rights reserved · Made with ❤️ in India</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Sitemap</a>
        </div>
      </div>
    </footer>
  )
}

function Main() {
  const [drawerType, setDrawerType] = useState(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [checkoutData, setCheckoutData] = useState(null)
  const [user, setUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api')
        const res = await axios.get(`${baseUrl}/products`)
        setProducts(res.data)
      } catch (err) {
        console.error('Failed to fetch products:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleOpenCheckout = (data = null) => {
    if (!user) {
      setCheckoutData(data) // Save where they wanted to go
      setAuthOpen(true)
      return
    }
    setCheckoutData(data)
    setCheckoutOpen(true)
  }

  const handleLogin = (userData) => {
    setUser(userData)
    // If they were trying to checkout, continue
    if (checkoutData !== undefined) {
      setCheckoutOpen(true)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setDrawerType(null)
  }

  const handleOrderSuccess = (order) => {
    setOrders(prev => [order, ...prev])
  }

  return (
    <div className="page">
      <Header 
        onOpenDrawer={setDrawerType} 
        onSearch={setSearchTerm} 
        user={user} 
        onOpenAuth={() => setAuthOpen(true)} 
        onLogout={handleLogout}
        products={products}
      />
      {loading ? (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
          <div className="loader"></div>
          <style>{`
            .loader {
              border: 3px solid #f3f3f3;
              border-top: 3px solid var(--primary);
              border-radius: 50%;
              width: 30px;
              height: 30px;
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Home products={products} searchTerm={searchTerm} onCheckout={handleOpenCheckout} />} />
          <Route path="/shop" element={<Category products={products} all={true} searchTerm={searchTerm} onCheckout={handleOpenCheckout} />} />
          <Route path="/category/:id" element={<Category products={products} searchTerm={searchTerm} onCheckout={handleOpenCheckout} />} />
          <Route path="/product/:id" element={<ProductDetail products={products} onCheckout={handleOpenCheckout} />} />
          <Route path="/success-story" element={<SuccessStory />} />
        </Routes>
      )}
      <Newsletter />
      <Footer onOpenDrawer={setDrawerType} />

      <SideDrawer 
        type={drawerType} 
        isOpen={!!drawerType} 
        onClose={() => setDrawerType(null)} 
        onCheckout={() => handleOpenCheckout(null)}
        orders={orders}
      />

      <CheckoutModal 
        isOpen={checkoutOpen} 
        onClose={() => { setCheckoutOpen(false); setCheckoutData(null); }} 
        product={checkoutData?.product}
        quantity={checkoutData?.quantity}
        onOrderSuccess={handleOrderSuccess}
        onViewOrders={() => setDrawerType('orders')}
      />

      <AuthModal 
        isOpen={authOpen} 
        onClose={() => setAuthOpen(false)} 
        onLogin={handleLogin} 
      />
    </div>
  )
}
export default function App() {
  return (
    <Router>
      <CartProvider>
        <Main />
      </CartProvider>
    </Router>
  )
}
