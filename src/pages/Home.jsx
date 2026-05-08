import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { products, features, testimonials } from '../data'
import Icon from '../components/Icon'
import { useCart } from '../context/CartContext'
import isoIcon from '../images/iso_icon.png'
import organicIcon from '../images/organic_icon.png'
import safeIcon from '../images/safe_icon.png'
import natureIcon from '../images/nature_icon.png'
import safeHomeIcon from '../images/safe_home_icon.png'
import traditionIcon from '../images/tradition_icon.png'
import ingredientsIcon from '../images/ingredients_icon.png'
import combosCategoryImg from '../images/combos_category.png'
import herbalAgarbathiImg from '../images/herbal_agarbathi_category_1777263501880.png'
import panchakavyaImg from '../images/panchakavya_products_category_1777263520616.png'
import roseWaterImg from '../images/rose_water_category_1777263539013.png'
import camphorImg from '../images/camphor_category_1777263590488.png'
import bodyWashImg from '../images/body_wash_category_1777263606152.png'

/* ── Product Card ──────────────────────────── */
function ProductCard({ product, onCheckout }) {
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
            {product.badge && <span className="phool-badge-green">{product.badge}</span>}
          </div>
        </Link>
        <button className="phool-shop-now" onClick={() => onCheckout({ product, quantity: 1 })}>
          <span>BUY NOW</span>
          <Icon name="ArrowRight" size={12} />
        </button>
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
          <Stars count={Math.round(product.rating)} />
          <span className="phool-rating-text">({product.rating})</span>
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

/* ── Reusable Product Carousel ───────────────────────── */
function ProductCarousel({ title, subtitle, products, onCheckout, showViewAll = true }) {
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 10)
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    const current = scrollRef.current
    if (current) {
      current.addEventListener('scroll', checkScroll)
      window.addEventListener('resize', checkScroll)
    }
    return () => {
      if (current) current.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [products])

  const scroll = (dir) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollAmount = clientWidth
      scrollRef.current.scrollTo({
        left: dir === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="bs-section reveal">
      <div className="bs-container">
        <div className="bs-header">
          <div className="bs-header-left">
            <h2 className="bs-section-title">{title}</h2>
            <p className="bs-section-sub">{subtitle}</p>
          </div>
          {showViewAll && <Link to="/shop" className="bs-view-all">VIEW ALL</Link>}
        </div>
        
        <div className="bs-carousel-outer">
          {canScrollLeft && (
            <button className="bs-nav-btn bs-prev" onClick={() => scroll('left')}>
              <Icon name="ChevronLeft" size={24} />
            </button>
          )}
          <div className="bs-track" ref={scrollRef}>
            {products.map(p => <ProductCard key={p.id} product={p} onCheckout={onCheckout} />)}
          </div>
          {canScrollRight && (
            <button className="bs-nav-btn bs-next" onClick={() => scroll('right')}>
              <Icon name="ChevronRight" size={24} />
            </button>
          )}
        </div>
      </div>
    </section>
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

/* ── Hero Carousel Component ────────────────── */
function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const slides = [
    { image: '/images/1.png' },
    { image: '/images/2.png' },
    { image: '/images/3.png' },
    { image: '/images/4.png' }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <div className="hero-carousel-pro">
      <div className="carousel-inner-pro" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((s, i) => (
          <div key={i} className="carousel-slide-pro">
            <img src={s.image} alt={`Slide ${i + 1}`} />
          </div>
        ))}
      </div>
      <div className="carousel-controls-pro">
        <button className="carousel-control-btn prev" onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}>
          <Icon name="ChevronLeft" size={20} />
        </button>
        <div className="carousel-dots-pro">
          {slides.map((_, i) => (
            <button 
              key={i} 
              className={`dot-pro ${current === i ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
        <button className="carousel-control-btn next" onClick={() => setCurrent((current + 1) % slides.length)}>
          <Icon name="ChevronRight" size={20} />
        </button>
      </div>
    </div>
  )
}

export default function Home({ products = [], searchTerm = '', onCheckout }) {
  const scrollRef = useRef(null)

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 375 // width of card + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const [selectedTypes, setSelectedTypes] = useState([])
  const [selectedTimes, setSelectedTimes] = useState([])
  const [selectedLengths, setSelectedLengths] = useState([])
  const [selectedBathis, setSelectedBathis] = useState([])
  const [sortBy, setSortBy] = useState('best-selling')
  
  useEffect(() => {
    window.scrollTo(0, 0)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.15 })

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const shuffle = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled
  }

  const categories = [
    { name: "Combo's", image: combosCategoryImg, link: '/category/gift-packs' },
    { name: 'Herbal Agarbathi', image: herbalAgarbathiImg, link: '/category/agarbatti' },
    { name: 'Panchakavya Products', image: panchakavyaImg, link: '/category/pooja-essentials' },
    { name: 'Rose Water', image: roseWaterImg, link: '/category/rose-water' },
    { name: 'Camphor', image: camphorImg, link: '/category/camphor' },
    { name: 'Body Wash', image: bodyWashImg, link: '/category/body-wash' },
  ]

  const featuredProds = shuffle(products.filter(p => p.featured))
  const topRatedProds = shuffle(products.filter(p => p.rating >= 4.8).slice(0, 15))
  const saleProds = shuffle(products.filter(p => p.originalPrice - p.price > 20).slice(0, 15))
  const spiritualProds = shuffle(products.filter(p => p.catId === 'pooja-essentials').slice(0, 15))

  return (
    <>
      {/* 1. Hero Carousel — Full Width */}
      <HeroCarousel />
      
      {/* 2. Category Circles Section - Moved out for more width */}
      <section className="category-circles-section reveal">
        <h2 className="circles-title">Fragrances For Divine Experiences</h2>
        <div className="circles-grid">
          {categories.map(cat => (
            <Link key={cat.name} to={cat.link} className="circle-item" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="circle-img-wrap">
                <img src={cat.image} alt={cat.name} className="circle-img" />
              </div>
              <span className="circle-label">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 2.5 Best Sellers Section */}
      <ProductCarousel 
        title="Best Sellers" 
        subtitle="Explore our most-loved natural and traditional wellness products crafted for your well-being." 
        products={featuredProds} 
        onCheckout={onCheckout}
        showViewAll={false}
      />

      {/* 2.6 Top Products Section */}
      <ProductCarousel 
        title="Top Products" 
        subtitle="Handpicked selection of our top-rated essentials for spiritual and personal care." 
        products={topRatedProds} 
        onCheckout={onCheckout}
      />

      {/* 2.7 Lightning Sale Section */}
      <ProductCarousel 
        title="Lightning Sale" 
        subtitle="Hurry! Grab these spiritual essentials at exclusive limited-time prices." 
        products={saleProds} 
        onCheckout={onCheckout}
      />

      {/* 2.8 Spiritual Essentials Section */}
      <ProductCarousel 
        title="Spiritual Essentials" 
        subtitle="Illuminate your sacred space and elevate your rituals with our traditional pooja items." 
        products={spiritualProds} 
        onCheckout={onCheckout}
      />



      {/* 5. Customer Experiences (Review Carousel) — Full Width */}
      <ReviewCarousel />
    </>
  )
}



/* -- Review Carousel Component (Mamaearth Style) -- */
function ReviewCarousel() {
  const [currentPage, setCurrentPage] = useState(0)
  const cardsPerView = 3
  const reviews = [
    { 
      text: "The fragrance of the jasmine agarbatti is just like fresh flowers from the Madurai market. Absolutely divine! I use it every morning during pooja and the scent lingers for hours.",
      name: "Senthil Kumar",
      stars: 5
    },
    { 
      text: "Sree HerboLight camphor is the purest I have found. No black smoke and the aroma is very peaceful. I've tried many brands but this one is by far the best quality camphor.",
      name: "Meenakshi Ramasamy",
      stars: 5
    },
    { 
      text: "I love that these products are eco-friendly. The temple flower recycling initiative is a great service to nature. Supporting brands like this makes me feel good about my purchases.",
      name: "Karthik Raja",
      stars: 5
    },
    { 
      text: "The rose water is so refreshing and smells completely natural. It has become a part of my daily morning routine. I use it as a toner and it keeps my skin glowing all day.",
      name: "Priyadharshini S.",
      stars: 5
    },
    { 
      text: "Best quality dhoop sticks. They stay lit for a long time and fill the entire house with a calming scent. My family absolutely loves the sandalwood variant.",
      name: "Velmurugan P.",
      stars: 5
    },
    { 
      text: "Traditional sambrani smell that reminds me of my grandmother's home. Very nostalgic and high quality. I order these every month without fail now.",
      name: "Lakshmi Narayanan",
      stars: 5
    },
    { 
      text: "The herbal body wash is gentle on the skin and the fragrance is very subtle and pleasant. Even my children love using it. Truly a natural product with no harsh chemicals.",
      name: "Anandhi J.",
      stars: 4
    },
    { 
      text: "Very impressed with the combo pack. It's a great way to try all their amazing products at once. I gifted it to my relatives and they all loved it!",
      name: "Saravanan M.",
      stars: 5
    },
    { 
      text: "The agarbattis don't cause any irritation to the eyes or throat. Clearly made from natural ingredients. As someone with allergies, this is a game changer for me.",
      name: "Sivakumar V.",
      stars: 5
    },
  ]

  const totalPages = Math.ceil(reviews.length / cardsPerView)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage(prev => (prev + 1) % totalPages)
    }, 5000)
    return () => clearInterval(timer)
  }, [totalPages])

  const next = () => setCurrentPage(prev => (prev + 1) % totalPages)
  const prev = () => setCurrentPage(prev => (prev - 1 + totalPages) % totalPages)

  return (
    <section className="rv-section reveal">
      <div className="rv-bg-organic"></div>
      <h2 className="rv-title">What Our Customers Say</h2>
      
      <div className="rv-carousel-wrap">
        <button className="rv-arrow rv-arrow-left" onClick={prev}>
          <Icon name="ChevronLeft" size={24} color="#2d5a27" />
        </button>

        <div className="rv-track-container">
          <div 
            className="rv-track" 
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {Array.from({ length: totalPages }).map((_, pageIdx) => (
              <div className="rv-page" key={pageIdx}>
                {reviews.slice(pageIdx * cardsPerView, pageIdx * cardsPerView + cardsPerView).map((review, idx) => (
                  <div className="rv-card" key={idx}>
                    <p className="rv-text">{review.text}</p>
                    <div className="rv-author-row">
                      <div className="rv-avatar-wrap">
                        <img 
                          src={`https://i.pravatar.cc/150?u=${encodeURIComponent(review.name)}`} 
                          alt={review.name} 
                          className="rv-avatar"
                        />
                      </div>
                      <div className="rv-author-info">
                        <span className="rv-name">{review.name}</span>
                        <span className="rv-rating-badge">
                          {review.stars}.0 <Icon name="Star" size={10} fill="#fff" color="#fff" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <button className="rv-arrow rv-arrow-right" onClick={next}>
          <Icon name="ChevronRight" size={24} color="#2d5a27" />
        </button>
      </div>

      <div className="rv-dots">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button 
            key={i} 
            className={`rv-dot ${currentPage === i ? 'active' : ''}`}
            onClick={() => setCurrentPage(i)}
          />
        ))}
      </div>
    </section>
  )
}


