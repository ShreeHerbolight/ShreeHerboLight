import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { useCart } from '../context/CartContext'
import isoIcon from '../images/iso_icon.png'
import organicIcon from '../images/organic_icon.png'
import safeIcon from '../images/safe_icon.png'


export function ProductCard({ product }) {
  const { cart, addToCart, wishlist, toggleWishlist } = useCart()
  const pId = product._id || product.id
  const inCart = cart.some(item => (item._id === pId || item.id === pId))
  const isWish = wishlist.some(item => (item._id === pId || item.id === pId))
  
  return (
    <article className="phool-card-pro">
      <div className="phool-card-top">
        <Link to={`/product/${pId}`}>
          <div className="phool-img-wrap">
            <img src={product.image} alt={product.name} className="phool-real-img" />
            {product.badge && <span className="phool-badge-red">{product.badge}</span>}
            <div className="phool-shop-now">
              <span>SHOP NOW</span>
              <Icon name="ArrowRight" size={12} />
            </div>
          </div>
        </Link>
        <button 
          className={`phool-wishlist-btn ${isWish ? 'active' : ''}`}
          onClick={() => toggleWishlist(product)}
        >
          <Icon name="Heart" size={18} fill={isWish ? "var(--primary)" : "none"} color={isWish ? "var(--primary)" : "#666"} />
        </button>
      </div>

      <div className="phool-body">
        <Link to={`/product/${pId}`}><h3 className="phool-title">{product.name}</h3></Link>
        
        <div className="phool-rating-row">
          <Icon name="Star" size={14} fill="#ff9a00" color="#ff9a00" />
          <span className="phool-rating-text">{product.rating}/5 Rating</span>
        </div>

        <div className="phool-badges-row">
          <img src={isoIcon} alt="ISO 9001" className="phool-trust-icon" title="ISO 9001 Certified" />
          <img src={organicIcon} alt="Organic" className="phool-trust-icon" title="100% Organic" />
          <img src={safeIcon} alt="Safe" className="phool-trust-icon" title="Safe & Lab Tested" />
        </div>
        
        <button
          className={`phool-add-btn ${inCart ? 'added' : ''}`}
          onClick={() => addToCart(product)}
        >
          <div className="phool-btn-label">{inCart ? 'ADDED' : 'ADD TO CART'}</div>
          <div className="phool-btn-price">
            {product.originalPrice && <span className="phool-old-price">₹ {product.originalPrice}</span>}
            <span>₹ {product.price}.00</span>
          </div>
        </button>
      </div>
    </article>
  )
}

function Stars({ count }) {
  return (
    <div className="stars">
      {[1,2,3,4,5].map(i => (
        <Icon key={i} name="Star" size={14} fill={i <= count ? "#e8a830" : "none"} color={i <= count ? "#e8a830" : "#ccc"} />
      ))}
    </div>
  )
}


export default function Category({ products = [], all = false, searchTerm = '' }) {
  const { id } = useParams()
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const [selectedTypes, setSelectedTypes] = useState([])
  const [selectedTimes, setSelectedTimes] = useState([])
  const [sortBy, setSortBy] = useState('best-selling')
  
  const categoryName = all 
    ? 'All Products' 
    : id?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  
  const baseProducts = all 
    ? products 
    : products.filter(p => {
        const pCat = (p.catId || '').toLowerCase()
        const pSub = (p.subCatId || '').toLowerCase()
        const target = (id || '').toLowerCase()
        
        // Handle "agarpathi" vs "agarbatti" and "gifting" vs "gift-packs"
        if (target === 'agarbatti' || target === 'agarpathi') return pCat === 'agarbatti'
        if (target === 'gifting' || target === 'gift-packs') return pCat === 'gift-packs'
        
        return pCat === target || pSub === target
      })

  const filteredProducts = baseProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (!matchesSearch) return false
    if (p.price < priceRange.min || p.price > priceRange.max) return false
    if (selectedTypes.length > 0 && !selectedTypes.includes(p.category)) return false
    // Burning time filtering would need data field, assuming it for now
    return true
  })

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    if (sortBy === 'alphabetical-az') return a.name.localeCompare(b.name)
    return 0
  })

  const clearAll = () => {
    setPriceRange({ min: 0, max: 500 })
    setSelectedTypes([])
    setSelectedTimes([])
  }

  const toggleType = (type) => {
    setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type])
  }

  return (
    <main className="category-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <span>{categoryName}</span>
      </div>

      <div className="shop-filter-system">
        <div className="filter-row-main">
          {all && (
            <div className="filter-group-pro">
              <span className="filter-main-label">Filter:</span>
              
              {/* Price Filter */}
              <div className="shop-dropdown-pro">
                <button className="shop-filter-btn">Price <Icon name="ChevronDown" size={14} /></button>
                <div className="shop-dropdown-panel price-panel">
                  <div className="panel-header">
                    <span>The highest price is Rs. 486.00</span>
                    <button className="panel-reset" onClick={() => setPriceRange({ min: 0, max: 486 })}>Reset</button>
                  </div>
                  <div className="price-inputs-row">
                    <div className="price-field">
                      <span>₹</span>
                      <input type="number" value={priceRange.min} onChange={e => setPriceRange({...priceRange, min: Number(e.target.value)})} />
                    </div>
                    <span className="price-to">to</span>
                    <div className="price-field">
                      <span>₹</span>
                      <input type="number" value={priceRange.max} onChange={e => setPriceRange({...priceRange, max: Number(e.target.value)})} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Type Filter */}
              <div className="shop-dropdown-pro">
                <button className="shop-filter-btn">Product type <Icon name="ChevronDown" size={14} /></button>
                <div className="shop-dropdown-panel list-panel">
                  <div className="panel-header">
                    <span>{selectedTypes.length} selected</span>
                    <button className="panel-reset" onClick={() => setSelectedTypes([])}>Reset</button>
                  </div>
                  <div className="panel-list">
                    {['Agarbatti', 'Pooja Essentials', 'Personal Care', 'Gifting'].map(type => (
                      <label key={type} className="panel-list-item">
                        <input type="checkbox" checked={selectedTypes.includes(type)} onChange={() => toggleType(type)} />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Burning Time Filter */}
              <div className="shop-dropdown-pro">
                <button className="shop-filter-btn">Burning Time <Icon name="ChevronDown" size={14} /></button>
                <div className="shop-dropdown-panel list-panel">
                  <div className="panel-header">
                    <span>0 selected</span>
                    <button className="panel-reset">Reset</button>
                  </div>
                  <div className="panel-list">
                    <label className="panel-list-item">
                      <input type="checkbox" />
                      <span>30 Minutes (7)</span>
                    </label>
                    <label className="panel-list-item">
                      <input type="checkbox" />
                      <span>40 Minutes (1)</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Length of Stick Filter */}
              <div className="shop-dropdown-pro">
                <button className="shop-filter-btn">Length of Stick <Icon name="ChevronDown" size={14} /></button>
                <div className="shop-dropdown-panel list-panel">
                  <div className="panel-header">
                    <span>0 selected</span>
                    <button className="panel-reset">Reset</button>
                  </div>
                  <div className="panel-list">
                    <label className="panel-list-item">
                      <input type="checkbox" />
                      <span>9 Inches (5)</span>
                    </label>
                    <label className="panel-list-item">
                      <input type="checkbox" />
                      <span>12 Inches (2)</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Type of bathi Filter */}
              <div className="shop-dropdown-pro">
                <button className="shop-filter-btn">Type of bathi <Icon name="ChevronDown" size={14} /></button>
                <div className="shop-dropdown-panel list-panel">
                  <div className="panel-header">
                    <span>0 selected</span>
                    <button className="panel-reset">Reset</button>
                  </div>
                  <div className="panel-list">
                    <label className="panel-list-item">
                      <input type="checkbox" />
                      <span>Masala Bathi</span>
                    </label>
                    <label className="panel-list-item">
                      <input type="checkbox" />
                      <span>Flora Bathi</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="filter-sort-pro">
            <span className="filter-main-label">Sort by:</span>
            <div className="shop-dropdown-pro">
              <button className="shop-filter-btn sort-select-btn">
                {sortBy.replace('-', ' ')} <Icon name="ChevronDown" size={14} />
              </button>
              <div className="shop-dropdown-panel sort-panel">
                {['best-selling', 'price-low', 'price-high', 'alphabetical-az'].map(val => (
                  <span 
                    key={val}
                    className={sortBy === val ? 'active-sort' : ''}
                    style={{ fontWeight: sortBy === val ? 'bold' : 'normal', color: sortBy === val ? 'var(--primary)' : 'inherit' }}
                    onClick={(e) => {
                      setSortBy(val)
                      if (document.activeElement) document.activeElement.blur()
                      // On mobile, tap might keep hover state, we can force blur
                      e.currentTarget.parentElement.style.display = 'none';
                      setTimeout(() => { e.currentTarget.parentElement.style.display = ''; }, 100);
                    }}
                  >
                    {val === 'best-selling' ? 'Best selling' : 
                     val === 'price-low' ? 'Price, low to high' : 
                     val === 'price-high' ? 'Price, high to low' : 'Alphabetically, A-Z'}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Active Filter Pills */}
        {(selectedTypes.length > 0 || priceRange.min > 0 || priceRange.max < 500) && (
          <div className="active-filters-row-pro">
            {priceRange.min > 0 || priceRange.max < 500 ? (
              <div className="active-pill-pro">
                Rs. {priceRange.min}.00-Rs. {priceRange.max}.00
                <button onClick={() => setPriceRange({ min: 0, max: 500 })}><Icon name="X" size={12} /></button>
              </div>
            ) : null}
            {selectedTypes.map(t => (
              <div key={t} className="active-pill-pro">
                {t}
                <button onClick={() => toggleType(t)}><Icon name="X" size={12} /></button>
              </div>
            ))}
            <button className="clear-all-btn-pro" onClick={clearAll}>Clear all</button>
          </div>
        )}

        <div className="results-count-pro">
          {sortedProducts.length} of {baseProducts.length} products
        </div>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="product-grid">
          {sortedProducts.map(p => <ProductCard key={p._id || p.id} product={p} />)}
        </div>
      ) : (
        <div className="empty-state">
          <Icon name="Search" size={48} color="var(--text-light)" />
          <h2>No products found</h2>
          <Link to="/" className="btn-gold">Back to Home</Link>
        </div>
      )}
    </main>
  )
}
