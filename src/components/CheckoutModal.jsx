import { useState } from 'react'
import Icon from './Icon'
import { useCart } from '../context/CartContext'

export default function CheckoutModal({ isOpen, onClose, product, quantity, onOrderSuccess, onViewOrders }) {
  const { cart, cartTotal, removeFromCart, clearCart } = useCart()
  const [step, setStep] = useState(1) // 1: Contact, 2: Address, 3: Payment, 4: Success
  const [isProcessing, setIsProcessing] = useState(false)
  
  if (!isOpen) return null

  // If a single product is passed (Buy It Now), use it. Otherwise, use the cart.
  const checkoutItems = product ? [{ ...product, quantity }] : cart
  const totalAmount = product ? product.price * quantity : cartTotal

  const handleClose = () => {
    setStep(1)
    setIsProcessing(false)
    onClose()
  }

  const handlePayment = () => {
    setIsProcessing(true)
    // Instant simulation for maximum speed
    setIsProcessing(false)
    
    // Create order record
    const newOrder = {
      id: `SHL-${Math.floor(Math.random() * 90000) + 10000}`,
      date: new Date().toLocaleDateString(),
      items: checkoutItems,
      total: totalAmount,
      status: 'Processing'
    }
    
    setStep(4)
    clearCart()
    if (onOrderSuccess) onOrderSuccess(newOrder)
  }

  if (checkoutItems.length === 0 && !product && step !== 4) {
    return (
      <div className="modal-overlay">
        <div className="checkout-modal empty-checkout">
          <button className="modal-close-btn" onClick={handleClose}><Icon name="X" size={20} /></button>
          <Icon name="ShoppingBag" size={64} color="#ccc" />
          <h2>Your bag is empty</h2>
          <p>Add some items to your bag before checking out.</p>
          <button className="checkout-continue-btn" onClick={handleClose}>Return to Shop</button>
        </div>
      </div>
    )
  }

  return (
    <div className="modal-overlay">
      <div className="checkout-modal">
        {/* Left Sidebar: Order Summary */}
        <div className="checkout-sidebar">
          <div className="sidebar-header">
            <Icon name="Leaf" size={24} color="#fff" />
            <h3>SreeHerboLight</h3>
          </div>
          
          <div className="order-summary-card">
            <div className="summary-items-list">
              {checkoutItems.map((item, idx) => (
                <div key={item._id || item.id || idx} className="summary-item">
                  <div className="summary-img" style={{ background: item.bg || '#f9f9f9' }}>
                    {item.image ? (
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    ) : (
                      <Icon name={item.icon || 'Package'} size={24} color="var(--primary)" />
                    )}
                    <span className="summary-qty-badge">{item.quantity}</span>
                  </div>

                  <div className="summary-info">
                    <h4>{item.name}</h4>
                    <p>{item.category}</p>
                  </div>
                  <div className="summary-price">₹{(item.price * item.quantity).toLocaleString()}</div>
                </div>
              ))}
            </div>
            
            <div className="summary-divider" />
            
            <div className="summary-rows">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className="free-text">FREE</span>
              </div>
            </div>

            <div className="summary-divider" />
            
            <div className="summary-total-row">
              <span>Total Amount</span>
              <span>₹{totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <div className="secure-badge">
            <Icon name="ShieldCheck" size={16} />
            <span>Secured by SreePay Checkout</span>
          </div>
        </div>

        {/* Right Section: Form Steps */}
        <div className="checkout-main">
          {step !== 4 && <button className="modal-close-btn" onClick={handleClose}><Icon name="X" size={20} /></button>}
          
          {step !== 4 && (
            <nav className="checkout-steps">
              <div className={`step-pill ${step >= 1 ? 'active' : ''}`}>
                <span className="step-num">{step > 1 ? <Icon name="Check" size={12} /> : '1'}</span>
                Contact
              </div>
              <div className="step-line" />
              <div className={`step-pill ${step >= 2 ? 'active' : ''}`}>
                <span className="step-num">{step > 2 ? <Icon name="Check" size={12} /> : '2'}</span>
                Address
              </div>
              <div className="step-line" />
              <div className={`step-pill ${step >= 3 ? 'active' : ''}`}>
                <span className="step-num">3</span>
                Payment
              </div>
            </nav>
          )}

          <div className="checkout-form-content">
            {isProcessing && (
              <div className="processing-overlay">
                <div className="loader-pro" />
                <h3>Processing Payment...</h3>
                <p>Please do not refresh or close this window.</p>
              </div>
            )}
            
            {!isProcessing && step === 1 && (
              <div className="form-step">
                <div className="form-header">
                  <h2>Contact Information</h2>
                  <p>Where should we send your order updates?</p>
                </div>

                <div className="input-group-pro">
                  <div className="pro-input-wrap">
                    <label>Email Address</label>
                    <input type="email" placeholder="e.g. name@example.com" className="pro-input" />
                  </div>
                  <div className="pro-input-wrap">
                    <label>Mobile Number</label>
                    <div className="phone-input-wrap">
                      <span className="country-code">🇮🇳 +91</span>
                      <input type="tel" placeholder="98765 43210" className="pro-input" />
                    </div>
                  </div>
                </div>

                <label className="checkbox-label-pro">
                  <input type="checkbox" defaultChecked />
                  <span>Keep me updated on latest offers & products</span>
                </label>

                <button className="checkout-continue-btn" onClick={() => setStep(2)}>
                  Continue to Shipping
                </button>
              </div>
            )}

            {!isProcessing && step === 2 && (
              <div className="form-step">
                <div className="form-header">
                  <h2>Shipping Address</h2>
                  <p>Enter the address for delivery</p>
                </div>
                <div className="input-group-pro">
                  <div className="pro-input-wrap">
                    <label>Full Name</label>
                    <input type="text" placeholder="Your full name" className="pro-input" />
                  </div>
                  <div className="input-row-pro">
                    <div className="pro-input-wrap">
                      <label>Pincode</label>
                      <input type="text" placeholder="600001" className="pro-input" />
                    </div>
                    <div className="pro-input-wrap">
                      <label>City</label>
                      <input type="text" placeholder="Chennai" className="pro-input" />
                    </div>
                  </div>
                  <div className="pro-input-wrap">
                    <label>Address</label>
                    <textarea placeholder="House No, Building Name, Street..." className="pro-input pro-area"></textarea>
                  </div>
                </div>
                <div className="step-actions-pro">
                  <button className="btn-back-pro" onClick={() => setStep(1)}>Back</button>
                  <button className="checkout-continue-btn" onClick={() => setStep(3)}>
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}
            
            {!isProcessing && step === 3 && (
              <div className="form-step">
                <div className="form-header">
                  <h2>Payment Method</h2>
                  <p>All transactions are secure and encrypted.</p>
                </div>
                <div className="payment-grid-pro">
                  <button className="pay-method-btn" onClick={handlePayment}>
                    <div className="pay-method-info">
                      <Icon name="Smartphone" size={20} />
                      <span>UPI (PhonePe, Google Pay, etc.)</span>
                    </div>
                    <div className="radio-circle-pro" />
                  </button>
                  <button className="pay-method-btn" onClick={handlePayment}>
                    <div className="pay-method-info">
                      <Icon name="CreditCard" size={20} />
                      <span>Debit / Credit Cards</span>
                    </div>
                    <div className="radio-circle-pro" />
                  </button>
                  <button className="pay-method-btn" onClick={handlePayment}>
                    <div className="pay-method-info">
                      <Icon name="Truck" size={20} />
                      <span>Cash on Delivery</span>
                    </div>
                    <div className="radio-circle-pro" />
                  </button>
                </div>
                
                <p className="payment-footer-note">
                  Select a payment method to complete your order.
                </p>
              </div>
            )}

            {step === 4 && (
              <div className="form-step success-step">
                <div className="success-icon-wrap">
                  <Icon name="CheckCircle" size={80} color="#4caf50" />
                </div>
                <h2>Payment Successful!</h2>
                <p>Thank you for your purchase. Your order has been placed successfully.</p>
                <div className="order-details-mini">
                  <div className="order-id">Order ID: #SHL-{Math.floor(Math.random() * 90000) + 10000}</div>
                  <div className="order-date">Date: {new Date().toLocaleDateString()}</div>
                </div>
                <div className="success-actions-pro">
                  <button className="checkout-continue-btn" onClick={handleClose}>
                    Continue Shopping
                  </button>
                  <button 
                    className="view-orders-btn-pro" 
                    onClick={() => { onClose(); if (onViewOrders) onViewOrders(); }}
                    style={{ 
                      marginTop: '10px', 
                      background: 'transparent', 
                      border: '1.5px solid var(--primary)', 
                      color: 'var(--primary)',
                      width: '100%',
                      padding: '12px',
                      borderRadius: '4px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    View My Orders
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

