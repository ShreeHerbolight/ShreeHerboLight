import { useCart } from '../context/CartContext'
import Icon from './Icon'
import { useNavigate } from 'react-router-dom'

export default function SideDrawer({ type, isOpen, onClose, onCheckout, orders = [] }) {
  const { cart, cartTotal, removeFromCart, wishlist, toggleWishlist, addToCart } = useCart()
  const navigate = useNavigate()

  if (!isOpen) return null

  let items = []
  let title = ''

  if (type === 'cart') {
    items = cart
    title = 'Shopping Bag'
  } else if (type === 'wishlist') {
    items = wishlist
    title = 'My Wishlist'
  } else if (type === 'orders') {
    items = orders
    title = 'My Orders'
  }

  const handleCheckoutClick = () => {
    onClose()
    onCheckout()
  }

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-content reveal-right" onClick={e => e.stopPropagation()}>
        <header className="drawer-header">
          <h3>{title} ({items.length})</h3>
          <button className="drawer-close" onClick={onClose}>
            <Icon name="X" size={20} />
          </button>
        </header>

        <div className="drawer-items">
          {items.length === 0 ? (
            <div className="drawer-empty">
              <Icon name={type === 'cart' ? 'ShoppingBag' : type === 'wishlist' ? 'Heart' : 'Package'} size={48} color="#ccc" />
              <p>Your {type === 'cart' ? 'bag' : type === 'wishlist' ? 'wishlist' : 'order list'} is empty</p>
              <button className="btn-continue-shop" onClick={() => { onClose(); navigate('/shop'); }}>Start Shopping</button>
            </div>
          ) : type === 'orders' ? (
            items.map(order => (
              <div key={order.id} className="order-drawer-card">
                <div className="order-header-pro">
                  <span className="order-id-label">{order.id}</span>
                  <span className="order-status-badge">{order.status}</span>
                </div>
                <div className="order-meta-pro">
                  <span>{order.date}</span>
                  <span>{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</span>
                </div>
                <div className="order-items-mini">
                  {order.items.slice(0, 2).map((it, idx) => (
                    <span key={idx}>{it.name}</span>
                  ))}
                  {order.items.length > 2 && <span>+ {order.items.length - 2} more</span>}
                </div>
                <div className="order-footer-pro">
                  <span>Total Amount</span>
                  <span className="order-total-price">₹{order.total.toLocaleString()}</span>
                </div>
              </div>
            ))
          ) : (
            items.map(item => (
              <div key={item._id || item.id} className="drawer-item">
                <div className="item-img" style={{ background: item.bg }}>
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p className="item-price">₹{item.price} {item.quantity > 1 && <span className="item-qty">x {item.quantity}</span>}</p>
                  <div className="item-actions">
                    {type === 'cart' ? (
                      <button className="item-remove-btn" onClick={() => removeFromCart(item._id || item.id)}>
                        <Icon name="Trash2" size={14} /> Remove
                      </button>
                    ) : (
                      <div className="wish-item-btns">
                        <button className="item-add-btn" onClick={() => { addToCart(item); toggleWishlist(item); }}>
                           Add to Cart
                        </button>
                        <button className="item-remove-btn" onClick={() => toggleWishlist(item)}>
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {type === 'cart' && cart.length > 0 && (
          <footer className="drawer-footer">
            <div className="drawer-total">
              <span>Subtotal</span>
              <span>₹{cartTotal.toLocaleString()}</span>
            </div>
            <p className="shipping-note">Taxes and shipping calculated at checkout</p>
            <button className="btn-checkout-drawer" onClick={handleCheckoutClick}>Check Out</button>
          </footer>
        )}
      </div>
    </div>
  )
}
