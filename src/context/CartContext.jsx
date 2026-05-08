import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const pId = product._id || product.id
      const existing = prev.find(item => (item._id === pId || item.id === pId))
      if (existing) {
        return prev.map(item => 
          (item._id === pId || item.id === pId) ? { ...item, quantity: item.quantity + quantity } : item
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => (item._id !== productId && item.id !== productId)))
  }

  const clearCart = () => {
    setCart([])
  }

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const pId = product._id || product.id
      const isFav = prev.find(item => (item._id === pId || item.id === pId))
      if (isFav) return prev.filter(item => (item._id !== pId && item.id !== pId))
      return [...prev, product]
    })
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  const wishlistCount = wishlist.length

  return (
    <CartContext.Provider value={{ 
      cart, wishlist, addToCart, removeFromCart, clearCart, toggleWishlist,
      cartCount, cartTotal, wishlistCount 
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
