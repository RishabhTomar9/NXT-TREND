import {useContext} from 'react'
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => {
  const {cartList} = useContext(CartContext)

  const total = cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  )
  const count = cartList.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div className="cart-summary">
      <h1>
        Order Total: <span>₹ {total}/-</span>
      </h1>
      <p>{count} items in cart</p>
      <button type="button" className="checkout-btn">
        Checkout
      </button>
    </div>
  )
}

export default CartSummary
