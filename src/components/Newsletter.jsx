import React from 'react'
import footerIllustration from '../images/sreeherbotradition .png'

export default function Newsletter() {
  return (
    <section className="newsletter-section">

      <div className="newsletter-main-content">
        <div className="newsletter-form-container">
          <h2 className="newsletter-title">Join our inner circle for exclusive deals & sacred wisdom.</h2>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" className="newsletter-input" />
            <button type="submit" className="newsletter-submit-btn">SUBSCRIBE</button>
          </form>
          <div className="newsletter-contact-tip">
            <span>Have questions? </span>
            <a href="mailto:hello@sreeherbolight.in">hello@sreeherbolight.in</a>
          </div>
        </div>
      </div>

      <div className="newsletter-illustration-full">
        <img src={footerIllustration} alt="Sree HerboLight Story" className="newsletter-full-img" />
      </div>

      <div className="newsletter-trust-bar">
        <div className="trust-item">
          <div className="trust-icon-wrap">
            <img src="/images/cc1.png" alt="Eco-Friendly Products" className="trust-badge-img" />
          </div>
          <div className="trust-content">
            <h4>Eco-Friendly Products</h4>
            <p>100% natural and traditional crafting processes.</p>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon-wrap">
            <img src="/images/cc2.png" alt="Conscious Choice" className="trust-badge-img" />
          </div>
          <div className="trust-content">
            <h4>Conscious Choice</h4>
            <p>Safe for your home, family, and the environment.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
