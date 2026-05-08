import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Icon from '../components/Icon'
import CheckoutModal from '../components/CheckoutModal'
import { useCart } from '../context/CartContext'
import { ProductCard } from './Category'
import isoIcon from '../images/iso_icon.png'
import organicIcon from '../images/organic_icon.png'
import safeIcon from '../images/safe_icon.png'

export default function ProductDetail({ products = [], onCheckout }) {
  const { id } = useParams()
  // Check both _id (MongoDB) and id (legacy)
  const product = products.find(p => p._id === id || p.id === id)
  const { cart, addToCart, wishlist, toggleWishlist } = useCart()
  const [quantity, setQuantity] = useState(1)

  const inCart = cart.some(item => (item._id === product?._id || item.id === product?.id))
  const isWish = wishlist.some(item => (item._id === product?._id || item.id === product?.id))


  useEffect(() => {
    window.scrollTo(0, 0)
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [id])


  if (!product) {
    return (
      <div className="error-page" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <Link to="/" className="btn-gold" style={{ marginTop: '20px', display: 'inline-block' }}>Back to Shop</Link>
      </div>
    )
  }

  const disc = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  return (
    <main className="product-detail-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to={`/category/${product.catId}`}>{product.category}</Link> / <span>{product.name}</span>
      </div>

      <section className="product-main-view">
        <div className="product-image-section reveal">
          <div className="detail-img-wrap" style={{ background: product.bg }}>
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name} 
                className="detail-real-img" 
              />
            ) : (
              <Icon name={product.icon} size={150} color="var(--primary)" />
            )}
            {product.badge && <span className="detail-badge">{product.badge}</span>}
          </div>

        </div>



        <div className="product-info-section reveal reveal-delay-1">
          <span className="info-cat">{product.category}</span>
          <h1 className="info-title">{product.name}</h1>
          <p className="info-tagline">{product.tagline}</p>
          
          <div className="info-price-row">
            <span className="info-price">₹{product.price}</span>
            {product.originalPrice && <span className="info-price-orig">₹{product.originalPrice}</span>}
            {disc && <span className="info-discount">{disc}% OFF</span>}
          </div>

          <div className="info-desc">
            <h3>Description</h3>
            <p>{product.desc}</p>
          </div>

          <div className="info-actions">
            <div className="qty-picker">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
            <button 
              className={`add-to-cart-btn ${inCart ? 'added' : ''}`}
              onClick={() => addToCart(product, quantity)}
              style={{ flex: 1 }}
            >
              {inCart ? <><Icon name="Check" size={18} /> Added to Cart</> : 'Add to Cart'}
            </button>
            <button 
              className={`wishlist-btn-detail ${isWish ? 'active' : ''}`}
              onClick={() => toggleWishlist(product)}
            >
              <Icon name="Heart" size={24} fill={isWish ? "var(--primary)" : "none"} />
            </button>
          </div>

          <button className="buy-now-btn-main" onClick={() => onCheckout({ product, quantity })}>
            Buy It Now
          </button>




          <div className="product-highlights">
            <div className="highlight-item">
              <img src={organicIcon} alt="Organic" className="phool-trust-icon" />
              <span>100% Organic</span>
            </div>
            <div className="highlight-item">
              <img src={isoIcon} alt="ISO 9001" className="phool-trust-icon" />
              <span>ISO Certified</span>
            </div>
            <div className="highlight-item">
              <img src={safeIcon} alt="Safe" className="phool-trust-icon" />
              <span>Lab Tested</span>
            </div>
          </div>
        </div>
      </section>

      {/* Global Checkout Modal is handled in App.jsx */}

      <section className="related-products reveal">
        <div className="section-header">
          <h2 className="section-title">You May Also Like</h2>
        </div>
        <div className="related-products-slider">
          {products
            .filter(p => p.catId === product.catId && (p._id || p.id) !== (product._id || product.id))
            .slice(0, 4)
            .map(p => (
              <ProductCard key={p._id || p.id} product={p} onCheckout={onCheckout} />
            ))}
        </div>
      </section>
    </main>
  )
}
