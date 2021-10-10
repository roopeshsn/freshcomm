import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CategoryScreen from './screens/CategoryScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import ResetPasswordScreen from './screens/ResetPasswordScreen'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/cart/:id?' component={CartScreen}></Route>
          <Route path='/login' component={LoginScreen}></Route>
          <Route path='/profile' component={ProfileScreen}></Route>
          <Route path='/register' component={RegisterScreen}></Route>
          <Route path='/forgotpassword/:email?' component={ForgotPasswordScreen}></Route>
          <Route path='/resetpassword/:token' component={ResetPasswordScreen}></Route>
          <Route path='/shipping' component={ShippingScreen}></Route>
          <Route path='/categories/:category' component={CategoryScreen} />
          <Route path='/product/:id' component={ProductScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
