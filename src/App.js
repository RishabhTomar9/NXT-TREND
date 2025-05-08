import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  // Add product to cart or update quantity if it already exists
  addCartItem = product => {
    this.setState(prevState => {
      const {cartList} = prevState
      const productExists = cartList.find(item => item.id === product.id)

      if (productExists) {
        return {
          cartList: cartList.map(item =>
            item.id === product.id
              ? {...item, quantity: item.quantity + product.quantity}
              : item,
          ),
        }
      }

      return {cartList: [...cartList, product]}
    })
  }

  // Remove a single cart item
  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(item => item.id !== id),
    }))
  }

  // Remove all cart items
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  // Increase quantity of a cart item
  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      ),
    }))
  }

  // Decrease quantity of a cart item
  decrementCartItemQuantity = id => {
    this.setState(prevState => {
      const updatedCartList = prevState.cartList
        .map(item =>
          item.id === id ? {...item, quantity: item.quantity - 1} : item,
        )
        .filter(item => item.quantity > 0)

      return {cartList: updatedCartList}
    })
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
